import React from "react";
import { motion } from "framer-motion";
import "./LandingPage2.css";

export default function ButterFlyLayer() {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-9999">
      {/* 🌿 Soft Nature Blobs */}
      <div className="nature-blob -top-32 -right-32 w-96 h-96 bg-joy-mint" />
      <div className="nature-blob top-1/4 -left-20 w-80 h-80 bg-joy-lavender animate-float-delayed" />
      <div className="nature-blob bottom-1/3 right-1/4 w-72 h-72 bg-joy-sunshine/40 animate-pulse-soft" />
      <div className="nature-blob top-1/2 left-1/3 w-48 h-48 bg-joy-rose/30" />
      <div className="nature-blob bottom-1/4 left-1/4 w-64 h-64 bg-joy-sky/40 animate-float" />

      {/* 🦋 Butterflies */}
      <div className="fixed top-40 right-20 text-4xl opacity-40 animate-float butterfly-path diamond-butterfly">
        🦋
      </div>

      <div className="fixed top-60 left-32 text-3xl opacity-30 animate-float-delayed butterfly-path">
        🦋
      </div>

      {/* 🌸 Flower */}
      <div className="fixed bottom-40 right-40 text-2xl opacity-35 animate-sway">
        🌸
      </div>
      </div>
    </>
  );
}
