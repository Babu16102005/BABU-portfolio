import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu after clicking a link
  const closeMenu = () => setMenuOpen(false);

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
          <li className="nav-item"><a href="#about" onClick={closeMenu}>About</a></li>
          <li className="nav-item"><a href="#skills" onClick={closeMenu}>Skills</a></li>
          <li className="nav-item"><a href="#projects" onClick={closeMenu}>Projects</a></li>
          <li className="nav-item"><a href="#credentials" onClick={closeMenu}>Credentials</a></li>
          <li className="nav-item"><a href="#contact" onClick={closeMenu}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
