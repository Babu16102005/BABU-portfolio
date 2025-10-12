import React from 'react';
import './Skills.css';
import { DiJava, DiReact, DiMongodb, DiHtml5, DiCss3 } from 'react-icons/di';
import { FaBolt, FaLightbulb, FaGithub } from 'react-icons/fa';
import { SiSpringboot, } from 'react-icons/si';

const Skills = () => {
  // const skills = [
  //   'HTML5', 'CSS3', 'JavaScript', 'React', 'REST API', 'MongoDB', 'Git', 'Responsive Design'
  // ];

  return (
    <section id="skills" className="skills-section">
      <h2 className="section-title">My Industrial Skills</h2>
      <p>
        In Technical and Industry point of view what I have learned,</p>
      <ul className="skills-list">
        <li><span className="icon"><DiJava /></span> Java</li>
        <li><span className="icon"><DiReact /></span> React Js</li>
        <li><span className="icon"><SiSpringboot /></span> Spring Boot</li>
        <li><span className="icon"><FaGithub /></span> Git & GitHub</li>
        <li><span className="icon"><DiMongodb /></span> MongoDB</li>
        <li><span className="icon"><FaLightbulb /></span> Problem Solving</li>
        <li><span className="icon"><FaBolt /></span> Fast Learner</li>
      </ul>
    </section>
  );
};

export default Skills;
