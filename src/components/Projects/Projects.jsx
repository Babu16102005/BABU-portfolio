import React from 'react';
import './Projects.css';
import WebGLScrollSync from '../animations/WebGLScrollSync';

const projectData = [
  {
    title: 'Smart Mentis',
    description: 'A comprehensive AI-driven career guidance system designed to help individuals make informed career decisions by holistically assessing aptitude and interests.',
    tech: ['React js', 'Fast API', 'Firebase'],
    domain: 'Smart Education',
    id: '01'
  },
  {
    title: 'Zomato Delivery Analytics',
    description: 'Analyzing Zomato delivery data to optimize delivery routes and improve customer satisfaction.',
    tech: ['Metabase', 'Pandas'],
    domain: 'Data Analytics',
    id: '02'
  },

  {
    title: 'SOS Emergency System',
    description: 'A critical safety infrastructure designed for instantaneous emergency response. Features one-tap SOS alerting, real-time GPS synchronization, and automated multi-channel notifications to trusted responder networks.',
    tech: ['React Native', 'Firebase', 'Live GPS'],
    domain: 'Public Safety',
    id: '03'
  },
  {
    title: 'PrivateChat',
    description: 'A premium, atmospheric 1:1 messaging ecosystem featuring Obsidian and Mocha themes. Engineered with WebRTC for secure calling and Supabase for real-time synchronization and secure data architecture.',
    tech: ['React Native', 'Supabase', 'WebRTC'],
    domain: 'Private Ops',
    id: '04'
  },
];

const Projects = () => {
  return (
    <section id="projects" className="projects-container">
      <WebGLScrollSync />
      
      <div className="projects-content">
        <div className="projects-intro">

          <h2 className="brutal-heading">CODE &<br/>SYSTEMS</h2>
        </div>

        <div className="projects-grid">
          {projectData.map((project, idx) => (
            <div key={idx} className="project-card-brutal">
              <div className="card-top">
                <span className="card-index">[{project.id}]</span>
                <span className="card-domain">{project.domain || 'SYSTEM_BUILD'}</span>

              </div>
              <div className="card-main">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className="card-bottom">
                <div className="tech-tags">
                  {project.tech.map((t, i) => (
                    <span key={i} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
