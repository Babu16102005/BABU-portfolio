import React, { useState } from 'react';
import './Header.css';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // Header should be visible immediately
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0 });
  const [logoRef, logoVisible] = useScrollAnimation({ threshold: 0 });
  const [menuRef, menuVisible] = useScrollAnimation({ threshold: 0 });
  const [navRef, navVisible] = useScrollAnimation({ threshold: 0 });

  return (
    <header 
      ref={headerRef}
      className={`header scroll-slide-top ${headerVisible ? 'visible' : ''}`}
    >
      <nav className="nav">
        <div 
          ref={logoRef}
          className={`logo scroll-fade-in ${logoVisible ? 'visible' : ''}`}
        >
          <a href="#home">MyPortfolio</a>
        </div>

        {/* Hamburger Icon */}
        <div
          ref={menuRef}
          className={`menu-toggle scroll-scale-in ${menuOpen ? 'active' : ''} ${menuVisible ? 'visible' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul 
          ref={navRef}
          className={`nav-list scroll-slide-right ${menuOpen ? 'active' : ''} ${navVisible ? 'visible' : ''}`}
        >
          <li className="nav-item scroll-fade-in"><a href="#about">About</a></li>
          <li className="nav-item scroll-fade-in"><a href="#skills">Skills</a></li>
          <li className="nav-item scroll-fade-in"><a href="#projects">Projects</a></li>
          <li className="nav-item scroll-fade-in"><a href="#credentials">Credentials</a></li>
          <li className="nav-item scroll-fade-in"><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
