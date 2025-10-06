import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <section id="home" className="home-section">
      <div className="home-content">
        
        {/* Left side - Image */}
        <div className="about-image">
          <div className="image-wrapper">
            <div className="image-placeholder"></div>
          </div>
        </div>

        {/* Right side - Text */}
        <div className="text-content">
          <h1 className="greeting">Hi, my name is</h1>
          <h2 className="name">BABU B</h2>
          <h3 className="subtitle">I build things for the web.</h3>
          <p className="intro-text">
            I’m a software engineer specializing in building (and occasionally designing)
            exceptional digital experiences. Currently, I’m focused on building accessible,
            human-centered products.
          </p>
          <a href="#contact" className="cta-button">Get In Touch</a>
        </div>

      </div>
    </section>
  );
};

export default Home;
