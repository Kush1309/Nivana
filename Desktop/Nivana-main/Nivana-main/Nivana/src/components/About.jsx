import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./LandingPage2.css";


export default function About() {
  const cards = [
    {
      icon: "🌸",
      title: "Expert-Backed Guidance",
      text:
        "Questions and guidance are created with input from mental health professionals.",
    },
    {
      icon: "🦋",
      title: "Safe Anonymous Space",
      text:
        "You can explore your feelings without judgment or pressure. All entries are private to you. You control sharing and export options.",
    },
    {
      icon: "🌻",
      title: "Personalized Self-Care Tools",
      text:
        "From journaling to mood tracking, everything adapts to your needs.",
    },
  ];

  const [index, setIndex] = useState(0);

  // auto change
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % cards.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="about"
      className="py-20 px-6 relative overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-meadow" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <span className="text-5xl mb-6 block">🌳</span>

        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
          Why <span className="joy-gradient-text">Nivana</span> Exists
        </h2>

        <p className="text-muted-foreground max-w-2xl mx-auto mb-20 text-lg">
          We believe everyone deserves a gentle space to grow, heal, and bloom at
          their own pace.
        </p>

        {/* CARD */}
        <div className="relative h-[340px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -25, scale: 0.97 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="about-auto-card"
            >
              <div className="text-5xl mb-6">{cards[index].icon}</div>

              <h3 className="text-2xl font-display font-bold mb-4">
                {cards[index].title}
              </h3>

              <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
                {cards[index].text}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* INDICATORS (STATUS ONLY) */}
          <div className="about-indicators mt-10">
            {cards.map((_, i) => (
              <span
                key={i}
                className={`indicator ${i === index ? "active" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
