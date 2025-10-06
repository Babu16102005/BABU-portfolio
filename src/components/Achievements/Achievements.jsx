import React from 'react';
import './Achievements.css';

const Credentials = () => {
  const credentialData = [
    {
      type: 'Achievement',
      title: 'Winner of the Annual Hackathon 2023',
      source: 'TechCrunch'
    },
    {
      type: 'Certification',
      title: 'Certified React Developer',
      source: 'React Training Institute, 2023'
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

  return (
    <section id="credentials" className="credentials-section">
      <h2 className="section-title">My Credentials</h2>
      <div className="credentials-grid">
        {credentialData.map((item, index) => (
          <div key={index} className="credential-card">
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

