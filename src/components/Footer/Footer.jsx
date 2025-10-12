import React from 'react';
import './Footer.css';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const Footer = () => {
  const [footerRef, footerVisible] = useScrollAnimation();
  const [linksRef, linksVisible] = useScrollAnimation();
  const [copyrightRef, copyrightVisible] = useScrollAnimation();

  return (
    <footer 
      ref={footerRef}
      className={`footer scroll-slide-bottom ${footerVisible ? 'visible' : ''}`}
    >
      <div 
        ref={linksRef}
        className={`social-links ${linksVisible ? 'visible' : ''}`}
      >
        <a href="#" target="_blank" rel="noopener noreferrer" className="scroll-fade-in">GitHub</a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="scroll-fade-in">LinkedIn</a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="scroll-fade-in">Twitter</a>
      </div>
      <div 
        ref={copyrightRef}
        className={`copyright scroll-fade-in ${copyrightVisible ? 'visible' : ''}`}
      >
        Designed & Built by Your Name
      </div>
    </footer>
  );
};

export default Footer;

