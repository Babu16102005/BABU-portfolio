import React from 'react';
import './About.css';
import TextFillOnScroll from '../animations/TextFillOnScroll';

const About = () => {
  return (
    <section id="about" className="about-brutal">
      <div className="about-content">
        <div className="brutal-header">

          <h2 className="brutal-heading">SYSTEM<br/>OVERVIEW</h2>
        </div>

        <div className="about-body">
          <p className="about-text">
            I'm Babu B, a Full Stack Developer skilled in Java, Spring Boot, React.js, and SQL. Currently working as an SDE Intern at MUA Technologies Pvt Ltd, I specialize in building scalable web applications and AI-powered solutions.
          </p>
          <p className="about-text">
            My technical toolkit spans Java, Python, JavaScript, FastAPI, PostgreSQL, Firebase, Docker, and advanced AI architectures like RAG (Retrieval-Augmented Generation). I've built projects like Smart Mentis (AI career guidance), VITA5 (emergency safety app), and KIBA (secure messaging app).
          </p>
          <p className="about-text">
            Beyond coding, I'm an active open-source contributor, event coordinator at INTELINFO 2K25, and volunteer at VGLUG. I hold certifications in Java, Python, and Artificial Intelligence from IBM SkillsBuild.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
