import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          <a href="#home">MyPortfolio</a>
        </div>

        {/* Hamburger Icon */}
        <div
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-list ${menuOpen ? 'active' : ''}`}>
          <li className="nav-item"><a href="#about">About</a></li>
          <li className="nav-item"><a href="#skills">Skills</a></li>
          <li className="nav-item"><a href="#projects">Projects</a></li>
          <li className="nav-item"><a href="#credentials">Credentials</a></li>
          <li className="nav-item"><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
