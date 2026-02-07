import React, { useEffect, useRef, useState } from 'react';
import './Projects.css';

const Projects = () => {
  const projectData = [
    {
      title: 'Smart Mentis',
      description:
        'A comprehensive AI-driven career guidance system designed to help individuals make informed career decisions by holistically assessing their aptitude, interests, skills, and potential career trajectories.',
      tech: ['React js', 'Fast API', 'Firebase'],
      link: '#',
      domain: "Smart Education"
    },
    {
      title: 'Zomato Delivery Analytics',
      description:
        'We analyze Zomato delivery data to optimize delivery routes and improve customer satisfaction.',
      tech: ['Metabase', 'pandas'],
      link: '#',
      domain: "Data Analytics"
    }

  ];

  const projectsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // trigger only once
        }
      },
      { threshold: 0.3 }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={projectsRef}
      className={`projects-section ${isVisible ? 'visible' : ''}`}
    >
      <h2 className="section-title">Some Things I've Built</h2>
      <div className="projects-grid">
        {projectData.map((project, index) => (
          <div key={index} className="project-card" style={{ ['--enter-delay']: `${0.3 + index * 0.2}s` }}>
            <div className="project-inner">
              <header>
                <div className="project-top">
                  {/* <div className="folder-icon">// Folder Icon</div> */}
                  <a
                    href={project.link}
                    className="external-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* // Link Icon */}
                  </a>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <div className="project-description">
                  <p>{project.description}</p>
                </div>
                <p className="project-domain"><strong>Domain:</strong>{project.domain}</p>
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
