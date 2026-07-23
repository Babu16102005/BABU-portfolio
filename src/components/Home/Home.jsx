import React from 'react';
import './Home.css';
import HyperKineticHero from '../animations/HyperKineticHero';
import TextFillOnScroll from '../animations/TextFillOnScroll';
import { LiquidMetalButton } from '../ui/liquid-metal-button';

const Home = () => {
  const handleDownload = () => {
    window.open("https://drive.google.com/file/d/1qu2HEYOC6TGPfiMTZdnowMKxOI5ltmvh/view?usp=drive_link", "_blank");
  };

  return (
    <section id="home" className="home-container">
      {/* The Hero component handles the Nav and the main splash */}
      <HyperKineticHero />

      <div className="home-main-content">
        <div className="home-text-sections">
          <TextFillOnScroll>
            I AM A FULL-STACK DEVELOPER DRIVEN BY THE PURSUIT OF PIXEL-PERFECT INTERACTION AND ROBUST SCALABLE ARCHITECTURE.
          </TextFillOnScroll>

          <TextFillOnScroll>
            MY WORK BLENDS BRUTALIST AESTHETICS WITH FLUID ANIMATIONS, SPECIALIZING IN AI-POWERED SOLUTIONS USING RAG AND FASTAPI.
          </TextFillOnScroll>
        </div>

        <div className="home-final-cta">
          <LiquidMetalButton
            label="Download Resume"
            onClick={handleDownload}
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
