import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <section id="home" className="home-section">
      <div className="home-content">

        {/* Left side - Image */}
        <div className="about-image">
          <div className="image-wrapper">
            <div className="image-placeholder">
              <img src="/babu_image.jpg" alt="Profile" className="profile-image" />
            </div>
          </div>
        </div>


        {/* Right side - Text */}
        <div className="text-content">
          <h1 className="greeting">Hi, my name is</h1>
          <h2 className="name">Babu B</h2>
          <h3 className="subtitle">Java Full Stack Developer</h3>
          <p className="intro-text">
            Building interactive web apps with modern technologies. Focused on clean code, smart design, and seamless user experience.
          </p>
          <a href="#contact" className="cta-button">Get In Touch</a>
        </div>

      </div>
    </section>
  );
};

export default Home;
