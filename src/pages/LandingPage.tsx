import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CTA from "../components/Cta";
import Footer from "../components/Footer";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
