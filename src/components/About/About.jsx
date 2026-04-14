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
            I'm Babu B, currently focused on Full Stack Development. I have a strong passion for technology and problem-solving, always eager to tackle challenges and build meaningful solutions.
          </p>
          <p className="about-text">
            As a fast learner and enthusiastic developer, I continuously expand my skills across front-end and back-end technologies, including Java, React, Spring Boot and PostgreSQL. I thrive in collaborative environments and enjoy creating projects that combine creativity with technical expertise.
          </p>
          <p className="about-text">
            Beyond coding, I am committed to improving my skills, exploring new technologies, and contributing to impactful projects that make a difference.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
