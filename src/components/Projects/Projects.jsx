import React from 'react';
import './Projects.css';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const Projects = () => {
  const projectData = [
    {
      title: 'Career Guidance System',
      description: 'A comprehensive AI-driven career guidance system designed to help individuals make informed career decisions by holistically assessing their aptitude, interests, skills, and potential career trajectories.',
      tech: ['React js', 'Fast API', 'Firebase'],
      link: '#'
    }
    // ,
    // {
    //   title: 'Project Two',
    //   description: 'A brief description of the second project. This was a personal exploration into data visualization and API integration.',
    //   tech: ['JavaScript (ES6+)', 'D3.js', 'CSS Grid'],
    //   link: '#'
    // }
  ];

  const [titleRef, titleVisible] = useScrollAnimation();
  const [gridRef, gridVisible] = useScrollAnimation();

  return (
    <section id="projects" className="projects-section">
      <h2 
        ref={titleRef}
        className={`section-title scroll-slide-top ${titleVisible ? 'visible' : ''}`}
      >
        Some Things I've Built
      </h2>
      <div 
        ref={gridRef}
        className={`projects-grid ${gridVisible ? 'visible' : ''}`}
      >
        {projectData.map((project, index) => (
          <div key={index} className="project-card scroll-scale-in">
            <div className="project-inner">
              <header>
                <div className="project-top scroll-fade-in">
                  <div className="folder-icon">// Folder Icon</div>
                  <a href={project.link} className="external-link" target="_blank" rel="noopener noreferrer">// Link Icon</a>
                </div>
                <h3 className="project-title scroll-slide-left">{project.title}</h3>
                <div className="project-description scroll-fade-in">
                  <p>{project.description}</p>
                </div>
              </header>
              <footer>
                <ul className="project-tech-list">
                  {project.tech.map((tech, i) => (
                    <li key={i} className="scroll-pop-in">{tech}</li>
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
