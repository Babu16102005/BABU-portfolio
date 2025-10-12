import React from 'react';
import './About.css';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const About = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [contentRef, contentVisible] = useScrollAnimation();
  const [p1Ref, p1Visible] = useScrollAnimation();
  const [p2Ref, p2Visible] = useScrollAnimation();
  const [listRef, listVisible] = useScrollAnimation();

  return (
    <section id="about" className="about-section">
      <h2 
        ref={titleRef}
        className={`section-title scroll-slide-top ${titleVisible ? 'visible' : ''}`}
      >
        About Me
      </h2>
      <div className="about-content-grid">
        <div 
          ref={contentRef}
          className={`about-text scroll-slide-left ${contentVisible ? 'visible' : ''}`}
        >
          <p 
            ref={p1Ref}
            className={`scroll-fade-in ${p1Visible ? 'visible' : ''}`}
          >
          Currently pursuing B.Tech in Information Technology, I am a passionate 
          learner interested in Full Stack Development and Data Analysis. I enjoy
           solving complex problems, creating impactful solutions, and continuously
            upgrading my skills to stay aligned with the latest technological trends.
          </p>
          <p 
            ref={p2Ref}
            className={`scroll-fade-in ${p2Visible ? 'visible' : ''}`}
          >
            Here are a few technologies I've been working with recently:
          </p>
          <ul 
            ref={listRef}
            className={`skills-list-about ${listVisible ? 'visible' : ''}`}
          >
            <li className="scroll-pop-in">Java</li>
            <li className="scroll-pop-in">React js</li>
            <li className="scroll-pop-in">Spring Boot</li>
            <li className="scroll-pop-in">HTML & CSS</li>
            <li className="scroll-pop-in">MongoDB</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
