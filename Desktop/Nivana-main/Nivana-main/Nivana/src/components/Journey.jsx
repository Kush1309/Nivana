import React from "react";
import { motion } from "framer-motion";
import "./LandingPage2.css";
import { useNavigate } from 'react-router-dom';

export default function Journey() {
    const navigate = useNavigate();

    const goToLogin = () => navigate("/login");
    const goToSignup = () => navigate("/signup");
    const journeySteps = [
        {
            step: "01",
            title: "Identify",
            description:
                "Take a quick self-check to understand your current emotional state",
            icon: "🌱",
            color: "bg-joy-mint",
        },
        {
            step: "02",
            title: "Understand",
            description:
                "Get insights into patterns and triggers that affect your wellbeing",
            icon: "🌿",
            color: "bg-joy-spring/20",
        },
        {
            step: "03",
            title: "Breathe",
            description:
                "Choose a guided meditation or ambient soundscape to calm your mind",
            icon: "🦋",
            color: "bg-joy-lavender",
        },
        {
            step: "04",
            title: "Flourish",
            description:
                "Journal your thoughts and track your mood to build lasting awareness",
            icon: "🌻",
            color: "bg-joy-sunshine/30",
        },
    ];
    return (
        <section id="journey" className="bg-gradient-meadow pt-5 pb-10 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-sky opacity-30" />
            <div className="max-w-6xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-5xl mb-6 block animate-float">🌈</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">
                        Your Path to{" "}
                        <span className="joy-gradient-text">Blooming</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Four gentle steps to help you grow into your brightest self
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {journeySteps.map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.5, delay: idx * 0.15 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -15 }}
                            className="group relative"
                        >
                            <div className={`absolute inset-0 ${card.color} rounded-[2rem] opacity-50 blur-xl group-hover:opacity-70 transition-opacity`} />

                            <div className="relative p-8 joy-card rounded-[2rem] hover:shadow-float transition-all duration-500 h-full flex flex-col">
                                <div className="text-4xl font-display font-black joy-gradient-text mb-2">
                                    {card.step}
                                </div>
                                <div className="text-5xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                                    {card.icon}
                                </div>
                                <h3 className="text-xl font-display font-bold text-foreground mb-3">
                                    {card.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                                    {card.description}
                                </p>
                            </div>

                            {idx < 3 && (
                                <div className="hidden lg:block absolute -right-4 top-1/2 text-2xl text-joy-spring">
                                    →
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <p className="text-muted-foreground mb-8 text-lg">
                        Ready to plant your first seed? 🌱
                    </p>
                    <button
                        onClick={goToSignup}
                        className="joy-button-warm inline-flex items-center gap-3"
                    >
                        <span>Begin Your Journey</span>
                        <span className="text-xl animate-bounce-gentle">✨</span>
                    </button>
                </motion.div>
            </div>
        </section>
    )
}