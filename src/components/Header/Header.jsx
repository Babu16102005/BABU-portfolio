import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <nav className="nav">
        {/* Logo */}
        <div className="logo">
          <a href="#home">Portfolio...</a>
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

        {/* Navigation List */}
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
