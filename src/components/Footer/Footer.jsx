import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-links">
        <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
      </div>
      <div className="copyright">
        Designed & Built by Your Name
      </div>
    </footer>
  );
};

export default Footer;

