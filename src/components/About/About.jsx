import React from 'react';
import './About.css';
import { DiJava, DiReact, DiMongodb, DiHtml5, DiCss3 } from 'react-icons/di';
import { SiSpringboot } from 'react-icons/si';

const About = () => {
  return (
    <section id="about" className="about-section">
      <h2 className="section-title">About Me</h2>

      <div className="about-content-grid">
        <div className="about-text">
          <p className='para'>
            I'm <span className='glow-text'>Babu B</span>, currently focused on <span className='glow-text'>Java Full Stack Development</span>.
            I have a strong passion for technology and problem-solving,
            always eager to tackle challenges and build meaningful solutions.
          </p>

          <p>
            As a <span className='glow-text'>fast learner</span> and enthusiastic developer, I continuously expand my
            skills across front-end and back-end technologies,
            including <span className='glow-text'>Java</span>, <span className='glow-text'>React</span>, <span className='glow-text'>Spring Boot</span>, and <span className='glow-text'>MongoDB</span>. I thrive in collaborative
            environments and enjoy creating projects that combine creativity with
            technical expertise        
              </p>
              <p>
                Beyond coding, I am committed to improving my skills, exploring new technologies,
                 and contributing to impactful projects that make a difference.
              </p>

          {/* <ul className="skills-list-about">
            
          </ul> */}
        </div>
      </div>
    </section>
  );
};

export default About;
