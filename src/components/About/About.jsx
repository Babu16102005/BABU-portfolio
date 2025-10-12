import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <h2 className="section-title">About Me</h2>
      <div className="about-content-grid">
        <div className="about-text">
          <p>
          Currently pursuing B.Tech in Information Technology, I am a passionate 
          learner interested in Full Stack Development and Data Analysis. I enjoy
           solving complex problems, creating impactful solutions, and continuously
            upgrading my skills to stay aligned with the latest technological trends.
          </p>
          <p>
            Here are a few technologies I’ve been working with recently:
          </p>
          <ul className="skills-list-about">
            <li>Java</li>
            <li>React js</li>
            <li>Spring Boot</li>
            <li>HTML & CSS</li>
            <li>MongoDB</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
