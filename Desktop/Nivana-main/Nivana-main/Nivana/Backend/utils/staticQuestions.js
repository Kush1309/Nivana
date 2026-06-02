// utils/staticQuestions.js
function makePhq9() {
  const items = [
    'Little interest or pleasure in doing things',
    'Feeling down, depressed, or hopeless',
    'Trouble falling or staying asleep, or sleeping too much',
    'Feeling tired or having little energy',
    'Poor appetite or overeating',
    'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
    'Trouble concentrating on things, such as reading the newspaper or watching television',
    'Moving or speaking so slowly that other people could have noticed; or the opposite — being fidgety/restless',
    'Thoughts that you would be better off dead or of hurting yourself in some way'
  ];
  return items.map((t,i) => ({
    id: `phq${i+1}`,
    type: 'scale4',
    title: t,
    hint: '0 = Not at all; 1 = Several days; 2 = More than half the days; 3 = Nearly every day',
    scale: { min: 0, max: 3 }
  }));
}

function makeGad7() {
  const items = [
    'Feeling nervous, anxious, or on edge',
    'Not being able to stop or control worrying',
    'Worrying too much about different things',
    'Trouble relaxing',
    'Being so restless that it is hard to sit still',
    'Becoming easily annoyed or irritable',
    'Feeling afraid as if something awful might happen'
  ];
  return items.map((t,i) => ({
    id: `gad${i+1}`,
    type: 'scale4',
    title: t,
    hint: '0 = Not at all; 1 = Several days; 2 = More than half the days; 3 = Nearly every day',
    scale: { min: 0, max: 3 }
  }));
}

function extraScreeners(maxExtra = 20) {
  const list = [
    { id: 'sleep1', type: 'scale', title: 'How well did you sleep last night?', hint: '1 = very poor, 5 = excellent', scale: { min: 1, max: 5 } },
    { id: 'sleep2', type: 'scale', title: 'How many hours did you sleep?', hint: 'Approx hours', scale: { min: 0, max: 12 } },
    { id: 'function1', type: 'scale', title: 'Have your symptoms affected work/study?', hint: '1 = not at all, 5 = extremely', scale: { min: 1, max: 5 } },
    { id: 'stress1', type: 'scale', title: 'How stressed do you feel today?', hint: '1 = not at all, 5 = extremely', scale: { min: 1, max: 5 } },
    { id: 'substance1', type: 'scale', title: 'In the past month, how often did you use alcohol to cope?', hint: '1 = never, 5 = daily', scale: { min: 1, max: 5 } },
    { id: 'coping1', type: 'text', title: 'What helps you cope when stressed?' },
    { id: 'suicidal1', type: 'scale', title: 'Have you had thoughts that you might be better off dead or of hurting yourself?', hint: '1 = No, 2 = Sometimes, 3 = Often', scale: { min: 1, max: 3 } },
    { id: 'open1', type: 'text', title: 'Anything else you want to share about how you are feeling?' },
  ];
  return list.slice(0, Math.max(0, maxExtra));
}

function defaultQuestions(age, maxQuestions=35) {
  const phq = makePhq9();
  const gad = makeGad7();
  const baseline = [...phq, ...gad];
  const remaining = Math.max(0, maxQuestions - baseline.length);
  const extras = extraScreeners(remaining);
  return [...baseline, ...extras].slice(0, maxQuestions);
}

module.exports = { defaultQuestions };
