import React from "react";
import { motion } from "framer-motion";
import "./LandingPage2.css";
import { useNavigate } from 'react-router-dom'; 

export default function CTA() {
  const navigate = useNavigate();

const goToLogin = () => navigate("/login");
const goToSignup = () => navigate("/signup");
  return (
    <section id="cta" className="bg-gradient-meadow py-10 px-6 relative ">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="cta-card"
        >
          {/* Decorative icons */}
          <div className="cta-flower"> 🌻</div>
          <br></br>
          <div className="cta-butterfly">🦋</div>
          <div className="cta-flower-small">🌸</div>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Text */}
            <div className="max-w-xl">
              <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                Ready to start feeling a little <br /> brighter — today?
              </h3>

              <p className="mt-6 text-lg text-muted-foreground">
                Take your first step with a gentle self-check and receive friendly
                guidance tailored just for you.
              </p>
            </div>

            {/* Button */}
            <button onClick={goToSignup} className="cta-button">
              Start Now <span>🌈</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
