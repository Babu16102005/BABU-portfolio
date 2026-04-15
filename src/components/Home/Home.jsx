import React from 'react';
import './Home.css';
import HyperKineticHero from '../animations/HyperKineticHero';
import TextFillOnScroll from '../animations/TextFillOnScroll';
import { LiquidMetalButton } from '../ui/liquid-metal-button';

const Home = () => {
  const handleDownload = () => {
    window.open("https://drive.google.com/uc?export=download&id=1pxL9Ys0toRbp15KSnoi1P8tZ33smfQRE", "_blank");
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
            MY WORK BLENDS BRUTALIST AESTHETICS WITH FLUID ANIMATIONS TO CREATE DIGITAL EXPERIENCES THAT ARE BOTH MEMORABLE AND FUNCTIONAL.
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
