import React from 'react';
import './Projects.css';

const Projects = () => {
  const projectData = [
    {
      title: 'Career Guidance System',
      description: 'A comprehensive AI-driven career guidance system designed to help individuals make informed career decisions by holistically assessing their aptitude, interests, skills, and potential career trajectories.',
      tech: ['React js', 'Fast API', 'Firebase'],
      link: '#'
    }
    // You can add more projects here
  ];

  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">Some Things I've Built</h2>
      <div className="projects-grid">
        {projectData.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-inner">
              <header>
                <div className="project-top">
                  <div className="folder-icon">// Folder Icon</div>
                  <a href={project.link} className="external-link" target="_blank" rel="noopener noreferrer">// Link Icon</a>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <div className="project-description">
                  <p>{project.description}</p>
                </div>
              </header>
              <footer>
                <ul className="project-tech-list">
                  {project.tech.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
              </footer>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
