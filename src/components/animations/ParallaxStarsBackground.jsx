import React from 'react';
import './ParallaxStarsBackground.css';

const ParallaxStarsBackground = () => {
  return (
    <div className="stars-background" aria-hidden="true">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div className="background-overlay"></div>
    </div>
  );
};

export default ParallaxStarsBackground;
