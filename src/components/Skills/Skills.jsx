import React, { useEffect, useRef, useState } from 'react';
import './Skills.css';
import { DiJava, DiReact, DiMongodb } from 'react-icons/di';
import { FaBolt, FaLightbulb, FaGithub  } from 'react-icons/fa';
import { SiHtml5 ,SiCss3 ,SiJavascript ,SiSpringboot, SiPostman, SiMetabase,SiDocker,SiPostgresql,SiAppwrite} from 'react-icons/si';
import { MdOutlineRecordVoiceOver } from "react-icons/md";

const Skills = () => {
  const skillsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // run once
        }
      },
      { threshold: 0.3 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={skillsRef}
      className={`skills-section ${isVisible ? 'visible' : ''}`}
    >
      <h2 className="section-title">My Skills</h2>
      <p>In Technical and Industry point of view what I have learned,</p>

      <ul className="skills-list">
        <li><span className="icon"><SiHtml5 /></span> HTML</li>
        <li><span className="icon"><SiCss3 /></span> CSS</li>
        <li><span className="icon"><SiJavascript  /></span> JavaScript</li>
        <li><span className="icon"><DiJava /></span> Java</li>
        <li><span className="icon"><DiReact /></span> React JS</li>
        <li><span className="icon"><SiSpringboot /></span> Spring Boot</li>
        <li><span className="icon"><FaGithub /></span> Git & GitHub</li>
        <li><span className="icon"><SiPostman /></span> Postman</li>
        <li><span className="icon"><SiPostgresql /></span> PostgreSQL</li>
        <li><span className="icon"><SiMetabase /></span> Metabase</li>
        <li><span className="icon"><SiAppwrite /></span> Appwrite</li>
        <li><span className="icon"><SiDocker /></span> Docker</li>
        <li><span className="icon"><FaLightbulb /></span> Problem Solving</li>
        <li><span className="icon"><FaBolt /></span> Fast Learner</li>
        <li><span className="icon"><MdOutlineRecordVoiceOver  /></span> Good in communication</li>
      </ul>
    </section>
  );
};

export default Skills;
