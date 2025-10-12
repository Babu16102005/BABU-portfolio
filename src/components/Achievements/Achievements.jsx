import React, { useEffect, useRef, useState } from 'react';
import './Achievements.css';

const Credentials = () => {
  const credentialData = [
    {
      type: 'Achievement',
      title: 'We won the First prize🏆 in the Vision X (Paper Presentation) in DOTZ.V12 in the UCET.',
      source: 'UCET',
    },
    {
      type: 'Certification',
      title: 'Java Programming Fundamentals course',
      source: 'Springboard, Infosys',
    },
    {
      type: 'Project',
      title: 'Career Guidance System',
      source: 'Team work project',
    }
   
  ];

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect(); // trigger once
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="credentials"
      ref={sectionRef}
      className={`credentials-section ${visible ? 'visible' : ''}`}
    >
      <h2 className="section-title">My Credentials</h2>
      <div className="credentials-grid">
        {credentialData.map((item, index) => (
          <div
            key={index}
            className="credential-card"
            style={{ transitionDelay: `${0.3 + index * 0.2}s` }}
          >
            <div className="credential-type">{item.type}</div>
            <h3 className="credential-title">{item.title}</h3>
            <p className="credential-source">{item.source}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Credentials;
