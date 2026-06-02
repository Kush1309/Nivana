import React, { useState } from "react";
import { motion } from "framer-motion";

import "./LandingPage2.css";

import NavBar from "./NavBar";
import HeroSection from "./HeroSection";
import About from "./About";
import FeatureServices from "./FeatureServices";
import Journey from "./Journey";
import TweetCardStack from "./TweetCardStack";
import CTA from "./CTA";
import Footer from "./Footer";
import ButterFlyLayer from "./ButterFlyLayer";

export default function LandingPage() {
  const [aboutIndex, setAboutIndex] = useState(0);

  return (
    <div className="min-h-screen w-full bg-background text-foreground overflow-x-hidden">
      {/* Background */}
      <ButterFlyLayer />

      {/* NAVBAR */}
      <NavBar />

      {/* HERO */}
      <HeroSection />

      {/* ABOUT */}
      <About />

      {/* FEATURED SERVICES */}
      <FeatureServices />

      {/* JOURNEY */}
      <Journey />

      {/* COMMUNITY */}
      <TweetCardStack />

      {/* CTA */}
      <CTA />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
