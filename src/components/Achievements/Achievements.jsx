import React from 'react';
import './Achievements.css';
import HyperScrollScene from '../animations/HyperScrollScene';

const Achievements = () => {
  return (
    <section id="achievements" className="achievements-container">
      <div className="hyper-scroll-wrapper">
        <HyperScrollScene />
      </div>

      <div className="achievements-sticky-layer">
        <div className="achievements-intro-overlay">

          <h2 className="brutal-heading">MY<br/>CREDENTIALS</h2>

        </div>
        
        <div className="achievements-footer-copy">
          <p>SCROLL TO NAVIGATE THROUGH THE ACHIEVEMENTS TUNNEL.</p>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
