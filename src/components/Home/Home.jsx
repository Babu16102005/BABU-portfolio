import React from 'react';
import './Home.css';
import { FaDownload } from 'react-icons/fa';
import HyperKineticHero from '../animations/HyperKineticHero';
import FluidRevealImage from '../animations/FluidRevealImage';
import TextFillOnScroll from '../animations/TextFillOnScroll';
import ParallaxStarsBackground from '../animations/ParallaxStarsBackground';

const Home = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
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
          <a
            href="https://drive.google.com/uc?export=download&id=1pxL9Ys0toRbp15KSnoi1P8tZ33smfQRE"
            download="Babu_B_resume.pdf"
            className="brutal-button-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>DOWNLOAD RESUME</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
