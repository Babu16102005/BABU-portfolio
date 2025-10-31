import React from 'react';
import './Footer.css';
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { SiHackerrank , SiLeetcode} from "react-icons/si";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-links">
        <a href="https://github.com/Babu16102005" target="_blank" rel="noopener noreferrer"><FaGithub size={40} /></a>
        <a href="https://www.linkedin.com/in/babu-b-395608299" target="_blank" rel="noopener noreferrer"><FaLinkedin size={40} /></a>
        <a href="https://wa.me/6381837277" target="_blank" rel="noopener noreferrer"><FaWhatsapp size={40} /></a>
        <a href="https://www.hackerrank.com/profile/babusanthosh6381" target="_blank" rel="noopener noreferrer"> <SiHackerrank size={40} /></a>
        <a href="https://leetcode.com/u/Babu_B16102005/" target="_blank" rel="noopener noreferrer"> <SiLeetcode size={40} /></a>

      </div>
      <div className="copyright">
        Designed & Built by Babu B
      </div>
    </footer>
  );
};

export default Footer;
