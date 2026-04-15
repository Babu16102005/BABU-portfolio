import React from 'react';
import './Skills.css';
import { DiJava, DiReact } from 'react-icons/di';
import { FaBolt, FaLightbulb, FaGithub } from 'react-icons/fa';
import {
  SiHtml5, SiCss3, SiJavascript, SiSpringboot, SiPostman, SiMetabase,
  SiDocker, SiPostgresql, SiAppwrite,
} from 'react-icons/si';
import { MdOutlineRecordVoiceOver } from 'react-icons/md';

const skillItems = [
  { icon: <SiHtml5 />, label: 'HTML' },
  { icon: <SiCss3 />, label: 'CSS' },
  { icon: <SiJavascript />, label: 'JavaScript' },
  { icon: <DiJava />, label: 'Java' },
  { icon: <DiReact />, label: 'React JS' },
  { icon: <SiSpringboot />, label: 'Spring Boot' },
  { icon: <FaGithub />, label: 'Git & GitHub' },
  { icon: <SiPostman />, label: 'Postman' },
  { icon: <SiPostgresql />, label: 'PostgreSQL' },
  { icon: <SiMetabase />, label: 'Metabase' },
  { icon: <SiAppwrite />, label: 'Appwrite' },
  { icon: <SiDocker />, label: 'Docker' },
];


const Skills = () => {
  return (
    <section id="skills" className="skills-brutal">
      <div className="brutal-header">

        <h2 className="brutal-heading">TECHNICAL<br/>STACK</h2>
        <p className="skills-intro-text">In Technical and Industry point of view what I have learned,</p>
      </div>


      <div className="skills-dynamic-grid">
        {skillItems.map((item, idx) => (
          <div key={idx} className="skill-box-brutal magnetic">
            <span className="skill-icon">{item.icon}</span>
            <span className="skill-label">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="skills-marquee">
        <div className="marquee-content">
          <span>PROBLEM SOLVING ✦ FAST LEARNER ✦ GOOD IN COMMUNICATION ✦ PROBLEM SOLVING ✦ FAST LEARNER ✦ GOOD IN COMMUNICATION ✦&nbsp;</span>
          <span>PROBLEM SOLVING ✦ FAST LEARNER ✦ GOOD IN COMMUNICATION ✦ PROBLEM SOLVING ✦ FAST LEARNER ✦ GOOD IN COMMUNICATION ✦&nbsp;</span>

        </div>
      </div>
    </section>
  );
};

export default Skills;
