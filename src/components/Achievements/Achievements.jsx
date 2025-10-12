import React from 'react';
import './Achievements.css';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const Credentials = () => {
  const credentialData = [
    {
      type: 'Achievement',
      title: 'we won the First prize🏆 in the Vision X (Paper Presentation) in DOTZ.V12 in the UCET.',
      source: 'UCET'
    },
    {
      type: 'Certification',
      title: 'Java Programming Fundamentals course',
      source: 'Springboard , Infosys'
    },
    {
      type: 'Achievement',
      title: 'Published a technical article on a popular blog',
      source: 'Dev.to'
    },
    {
      type: 'Certification',
      title: 'Advanced CSS and Sass',
      source: 'Udemy, 2022'
    }
  ];

  const [titleRef, titleVisible] = useScrollAnimation();
  const [gridRef, gridVisible] = useScrollAnimation();

  return (
    <section id="credentials" className="credentials-section">
      <h2 
        ref={titleRef}
        className={`section-title scroll-slide-top ${titleVisible ? 'visible' : ''}`}
      >
        My Credentials
      </h2>
      <div 
        ref={gridRef}
        className={`credentials-grid ${gridVisible ? 'visible' : ''}`}
      >
        {credentialData.map((item, index) => (
          <div key={index} className="credential-card scroll-bounce-in">
            <div className="credential-type scroll-fade-in">{item.type}</div>
            <h3 className="credential-title scroll-slide-left">{item.title}</h3>
            <p className="credential-source scroll-fade-in">{item.source}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Credentials;

