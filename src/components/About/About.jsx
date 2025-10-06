import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <h2 className="section-title">About Me</h2>
      <div className="about-content-grid">
        <div className="about-text">
          <p>
            Hello! I'm a dedicated and passionate web developer with a knack for creating elegant and efficient solutions. I have a strong foundation in front-end technologies and a love for learning and applying new skills to build beautiful, responsive, and user-friendly websites.
          </p>
          <p>
            Here are a few technologies I’ve been working with recently:
          </p>
          <ul className="skills-list-about">
            <li>JavaScript (ES6+)</li>
            <li>React</li>
            <li>Node.js</li>
            <li>HTML & (S)CSS</li>
            <li>Python</li>
            <li>Django</li>
          </ul>
        </div>
        {/* <div className="about-image">
          <div className="image-wrapper">
           
            <div className="image-placeholder"></div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default About;
