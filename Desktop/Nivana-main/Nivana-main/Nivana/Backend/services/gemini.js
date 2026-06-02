const axios = require("axios");

const MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash";
const MAX_DEFAULT = 60;

function clampMax(n) {
  const v = Number(n) || MAX_DEFAULT;
  return Math.max(10, Math.min(100, v));
}

function extractJSON(text) {
  if (!text) return null;
  const marker = text.match(/<<JSON>>([\s\S]*?)<<JSON_END>>/);
  if (marker) return marker[1].trim();
  const fallback = text.match(/\{[\s\S]*\}/);
  return fallback ? fallback[0] : null;
}

async function generateQuestionsWithGemini({
  age,
  maxQuestions = MAX_DEFAULT,
  includeValidated = true,
} = {}) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("❌ GEMINI_API_KEY missing");
    return { questions: fallbackValidated().slice(0, maxQuestions) };
  }

  const maxQ = clampMax(maxQuestions);

  const validatedBlock = includeValidated
    ? `Include PHQ-9 (phq1..phq9) and GAD-7 (gad1..gad7) FIRST.`
    : `Do not force PHQ-9 or GAD-7.`;

  const prompt = `
OUTPUT ONLY JSON BETWEEN <<JSON>> AND <<JSON_END>>

Return:
{ "questions": [ ... ] }

${validatedBlock}

After PHQ-9 & GAD-7, include:
- Sleep & Energy (5 questions)
- Daily Functioning (5 questions)
- Stress & Coping (5 questions)
- Emotional Regulation (5 questions)
- Social Connection & Loneliness (5 questions)
- Self-esteem & Self-worth (4 questions)
- Substance Use (3 questions)
- Trauma / Safety screening (2 questions, safe wording)
- One open-ended text question

Rules:
- scale4 = 0..3
- scale = 1..5
- Total questions ≤ ${maxQ}
- Use clear, simple and slightly descriptive language so users fully understand each question.

Schema:
{
  "id": "string",
  "type": "scale|scale4|text",
  "title": "string",
  "hint": "string (optional)",
  "scale": { "min": number, "max": number }
}

User age: ${age}

<<JSON>>
`;

  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0,
          maxOutputTokens: 2200,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        timeout: 45000,
      }
    );

    let raw = "";
    for (const c of res.data?.candidates || []) {
      for (const p of c?.content?.parts || []) {
        if (typeof p.text === "string") raw += p.text;
      }
    }

    const jsonText = extractJSON(raw);
    if (!jsonText) return { questions: fallbackValidated().slice(0, maxQ) };

    let parsed;
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      return { questions: fallbackValidated().slice(0, maxQ) };
    }

    if (!Array.isArray(parsed.questions)) {
      return { questions: fallbackValidated().slice(0, maxQ) };
    }

    const safe = parsed.questions.slice(0, maxQ).map((q, i) => ({
      id: (q.id || `q_${i}`).toLowerCase(),
      type: q.type || "text",
      title: q.title || "",
      hint: q.hint,
      scale:
        q.type === "scale4"
          ? { min: 0, max: 3 }
          : q.type === "scale"
          ? { min: 1, max: 5 }
          : undefined,
    }));

    return { questions: safe };
  } catch (err) {
    console.error("❌ Gemini error:", err?.response?.data || err.message);
    return { questions: fallbackValidated().slice(0, maxQ) };
  }
}

async function analyzeAssessmentWithGemini({
  age,
  answers = [],
  phq9Score,
  gad7Score,
  context = "",
} = {}) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return {
      severity: null,
      risks: [],
      guidanceText: null,
      recommendClinicianReview: true,
    };
  }

  const prompt = `
OUTPUT ONLY JSON BETWEEN <<JSON>> AND <<JSON_END>>

{
  "severity": "none|mild|moderate|moderately_severe|severe",
  "risks": [],
  "guidanceText": "string",
  "recommendClinicianReview": true|false
}

Age: ${age}
PHQ9: ${phq9Score}
GAD7: ${gad7Score}
Answers: ${JSON.stringify(answers).slice(0, 3000)}
Context: ${context}

<<JSON>>
`;

  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0,
          maxOutputTokens: 900,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
      }
    );

    let raw = "";
    for (const c of res.data?.candidates || []) {
      for (const p of c?.content?.parts || []) {
        if (typeof p.text === "string") raw += p.text;
      }
    }

    const jsonText = extractJSON(raw);
    if (!jsonText) throw new Error("No JSON");

    const parsed = JSON.parse(jsonText);

    return {
      severity: parsed.severity || null,
      risks: Array.isArray(parsed.risks) ? parsed.risks : [],
      guidanceText: parsed.guidanceText || null,
      recommendClinicianReview: !!parsed.recommendClinicianReview,
    };
  } catch {
    return {
      severity: null,
      risks: [],
      guidanceText: null,
      recommendClinicianReview: true,
    };
  }
}

function fallbackValidated() {
  const phq = [
    "Over the past two weeks, how often have you had little interest or pleasure in doing things you usually enjoy?",
    "Over the past two weeks, how often have you felt down, depressed, or hopeless about your situation?",
    "How often have you had trouble falling asleep, staying asleep, or sleeping too much?",
    "How often have you felt tired, drained, or lacking energy throughout the day?",
    "How often have you noticed changes in your appetite, such as eating too little or too much?",
    "How often have you felt bad about yourself, felt like a failure, or felt that you have let yourself or your family down?",
    "How often have you had difficulty concentrating on tasks like reading, working, or watching something?",
    "How often have others noticed that you move or speak very slowly, or that you feel unusually restless?",
    "How often have you had thoughts that you might be better off dead or that you might harm yourself?",
  ].map((t, i) => ({
    id: `phq${i + 1}`,
    type: "scale4",
    title: t,
    hint: "0 = Not at all · 1 = Several days · 2 = More than half the days · 3 = Nearly every day",
    scale: { min: 0, max: 3 },
  }));

  const gad = [
    "Over the past two weeks, how often have you felt nervous, anxious, or on edge?",
    "How often have you found it difficult to stop or control your worrying once it starts?",
    "How often have you worried too much about different things in your daily life?",
    "How often have you had trouble relaxing, even when there was time to rest?",
    "How often have you felt so restless that it was hard to sit still?",
    "How often have you become easily annoyed, irritated, or frustrated?",
    "How often have you felt afraid, as if something bad or unpleasant might happen?",
  ].map((t, i) => ({
    id: `gad${i + 1}`,
    type: "scale4",
    title: t,
    hint: "0 = Not at all · 1 = Several days · 2 = More than half the days · 3 = Nearly every day",
    scale: { min: 0, max: 3 },
  }));

  const extras = [
    {
      id: "sleep_quality",
      type: "scale",
      title: "Overall, how would you rate the quality of your sleep on most nights?",
      scale: { min: 1, max: 5 },
    },
    {
      id: "energy",
      type: "scale",
      title: "How would you describe your energy levels during a typical day?",
      scale: { min: 1, max: 5 },
    },
    {
      id: "stress",
      type: "scale",
      title: "How stressed or overwhelmed do you generally feel in your day-to-day life?",
      scale: { min: 1, max: 5 },
    },
    {
      id: "coping",
      type: "text",
      title: "When you feel stressed, anxious, or low, what usually helps you cope or feel better?",
    },
    {
      id: "lonely",
      type: "scale",
      title: "How often do you feel lonely or disconnected from people around you?",
      scale: { min: 1, max: 5 },
    },
    {
      id: "support",
      type: "scale",
      title: "Do you feel that you have people you can rely on for emotional support when needed?",
      scale: { min: 1, max: 5 },
    },
    {
      id: "self_worth",
      type: "scale",
      title: "How would you describe your overall sense of self-worth or confidence in yourself?",
      scale: { min: 1, max: 5 },
    },
    {
      id: "emotion_control",
      type: "scale",
      title: "How well are you able to manage or control strong emotions like anger, sadness, or fear?",
      scale: { min: 1, max: 5 },
    },
    {
      id: "open_context",
      type: "text",
      title: "Is there anything else about your thoughts, feelings, or mental health that you would like to share?",
    },
  ];

  return [...phq, ...gad, ...extras];
}

module.exports = {
  generateQuestionsWithGemini,
  analyzeAssessmentWithGemini,
};
