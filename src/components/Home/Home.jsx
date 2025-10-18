import React, { useEffect, useState } from 'react';
import './Home.css';
import { FaDownload } from "react-icons/fa";


const Home = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className={`home-section ${visible ? 'visible' : ''}`}>
      <div className="home-content pop-up">

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
          <h1 className="greeting">Hi, I'm</h1>
          <h2 className="name">Babu B</h2>
          <h3 className="subtitle">Java Full Stack Developer</h3>
          <p className="intro-text">
            Building interactive web apps with modern technologies. Focused on Problem Solving,
            Clean Code, Smart Design, and seamless user experience.
          </p>
          <div className="button-container">
            <a className="scroll-button" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
              <span>Get In Touch</span>
            </a>
            {/* <button className="download-btn">
              <a
                className="download-link"
                href=""
                download="Babu_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              />
                Download CV <FaDownload />
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
