import React from "react";
import { motion } from "framer-motion";
import "./LandingPage2.css";

export default function FeatureServices() {
  const featuredServices = [
    {
      icon: "🧠",
      title: "Quick Self-Check",
      description:
        "20 short questions to help you identify stress, anxiety, and mood.",
      iconGradient: "linear-gradient(135deg, var(--joy-lavender), var(--joy-rose))",
    },
    {
      icon: "🎧",
      title: "Guided Meditations",
      description:
        "Short 2–10 minute audio practices for grounding and sleep.",
      iconGradient: "linear-gradient(135deg, var(--joy-sky), var(--joy-mint))",
    },
    {
      icon: "📝",
      title: "Private Journaling",
      description:
        "Daily prompts to reflect and build small habits.",
      iconGradient: "linear-gradient(135deg, var(--joy-peach), var(--joy-sunshine))",
    },
    {
      icon: "🌲",
      title: "Ambient Soundscape",
      description:
        "Choose nature-based themes and soft ambient audio to support your practice.",
      iconGradient: "linear-gradient(135deg, var(--joy-spring), var(--joy-meadow))",
    },
    {
      icon: "🍃",
      title: "Laughter Therapy",
      description:
        "Light, clean humor pieces designed for mood-lifting — optional and limited.",
      iconGradient: "linear-gradient(135deg, var(--joy-coral), var(--joy-peach))",
    },
    {
      icon: "📈",
      title: "Mood Tracking",
      description:
        "Visualize mood patterns across days and weeks.",
      iconGradient:
        "linear-gradient(135deg, var(--joy-butterfly), var(--joy-lavender))",
    },
  ];

  return (
    <section
      id="services"
      className="pt-2 pb-10 px-6 relative "
      style={{
        /* 🌈 HORIZONTAL LAVENDER → BLUE → GREEN */
        background: `
          linear-gradient(
            90deg,
            #f2ecff 0%,     /* lavender */
            #e9f3ff 35%,    /* soft blue */
            #eaf8f1 70%,    /* mint green */
            #f7fffb 100%
          )
        `,
      }}
    >
     {/* ☀️ BIGGER YELLOW SUN – DARK CORE → LIGHT EDGES */}
{/* ☀️ FIXED SUN – NO CURSOR / NO SCROLL MOVEMENT */}
<div
  style={{
    position: "fixed",          // 🔒 lock to viewport
    top: "50%",
    left: "60%",                // 2nd & 3rd column ke beech
    transform: "translate(-50%, -50%)",
    width: "520px",
    height: "520px",
    background: `
      radial-gradient(
        circle,
        rgba(255, 179, 40, 0.65) 0%,
        rgba(255, 204, 92, 0.45) 28%,
        rgba(255, 224, 140, 0.28) 52%,
        rgba(255, 240, 190, 0.15) 68%,
        transparent 80%
      )
    `,
    filter: "blur(75px)",
    pointerEvents: "none",
    zIndex: 0,
  }}
/>



      {/* 🌿 SUBTLE FOREST MIST (RIGHT EDGE) */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "-30%",
          width: "520px",
          height: "520px",
          background:
            "radial-gradient(circle, rgba(160,228,203,0.25), transparent 70%)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      {/* 💜 SOFT LAVENDER HAZE (LEFT EDGE) */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "-30%",
          width: "520px",
          height: "520px",
          background:
            "radial-gradient(circle, rgba(199,184,234,0.25), transparent 70%)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* HEADING */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-5xl mb-6 block animate-sway">🌿</span>

            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">
              Tools for Your{" "}
              <span className="joy-gradient-text">Wellness Garden</span>
            </h2>

            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Each feature is a seed — plant one and watch yourself grow
            </p>
          </motion.div>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {featuredServices.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="group"
            >
              <div className="service-card">
                <div
                  className="service-icon"
                  style={{ background: service.iconGradient }}
                >
                  {service.icon}
                </div>

                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>

                {/* <a href="#" className="service-explore">
                  Explore <span>→</span>
                </a> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
