import React from 'react';
import './Footer.css';
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { SiHackerrank, SiLeetcode } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="footer-brutal">
      <div className="footer-grid">
        <div className="footer-brand">
          <h2 className="brutal-logo">BABU</h2>
          <p>© 2026_SYSTEM_OPERATIONAL</p>
        </div>
        
        <div className="footer-links">
          <div className="social-row">
            <a href="https://github.com/Babu16102005" target="_blank" rel="noopener noreferrer" className="social-link-brutal"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/babu-b-395608299" target="_blank" rel="noopener noreferrer" className="social-link-brutal"><FaLinkedin /></a>
            <a href="https://wa.me/6381837277" target="_blank" rel="noopener noreferrer" className="social-link-brutal"><FaWhatsapp /></a>
            <a href="https://www.hackerrank.com/profile/babusanthosh6381" target="_blank" rel="noopener noreferrer" className="social-link-brutal"><SiHackerrank /></a>
            <a href="https://leetcode.com/u/Babu_B16102005/" target="_blank" rel="noopener noreferrer" className="social-link-brutal"><SiLeetcode /></a>
          </div>
        </div>

        <div className="footer-tagline">
          <span>BUILT_WITH_PURE_INTENT</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
