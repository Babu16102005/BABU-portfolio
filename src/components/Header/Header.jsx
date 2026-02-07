import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close menu after clicking a link
  const closeMenu = () => setMenuOpen(false);

  // Handle scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav">
        {/* Logo */}
        <div className="logo">
          <a href="#home">Babu</a>
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
