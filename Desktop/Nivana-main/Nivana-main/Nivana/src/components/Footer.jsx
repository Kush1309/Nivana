// import React from "react";
import "./LandingPage2.css";

export default function Footer() {
  return (
    <footer id="contact" className="footer-section">

      <div className="footer-content">
        {/* LEFT */}
        <div>
          <div className="flex items-center gap-3">
            <img src="/Logo.jpg" className="footer-logo"></img>
            <div>
              <div className="font-display font-bold text-xl text-foreground">
                Nivana
              </div>
              <div className="text-sm text-muted-foreground">
                Bloom · Breathe · Believe
              </div>
            </div>
          </div>

          <p className="footer-desc">
            A gentle, private space for self-awareness and everyday practices to
            support your mental well-being. 🌻
          </p>
        </div>

        {/* CENTER */}
        <div>
          <div className="footer-title">Quick Links</div>
          <ul className="footer-links">
            {["Home", "About", "Services", "Journey", "Community"].map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`}>
                  <span>🌱</span> {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT */}
        <div>
          <div className="footer-title">
            Need urgent help? <span>💚</span>
          </div>

          <p className="footer-desc">
            If you are in crisis, please contact local emergency services or a
            helpline immediately.
          </p>

          <div className="footer-help green">
            <span>📞</span>
            <span>India Helpline: 9152987821</span>
          </div>

          <div className="footer-help red">
            <span>🚨</span>
            <span>Emergency: 112</span>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Mindnest — Not a medical service. This site
        provides supportive resources and self-assessment tools only. 🌸
      </div>
    </footer>
  );
}
