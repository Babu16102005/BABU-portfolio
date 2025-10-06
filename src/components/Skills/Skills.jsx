import React from 'react';
import './Skills.css';

const Skills = () => {
  const skills = [
    'HTML5', 'CSS3', 'JavaScript (ES6+)', 'React', 'Node.js', 
    'Express', 'MongoDB', 'Git', 'Webpack', 'Responsive Design'
  ];

  return (
    <section id="skills" className="skills-section">
      <h2 className="section-title">My Skills</h2>
      <ul className="skills-list">
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;
