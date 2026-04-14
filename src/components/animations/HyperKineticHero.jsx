import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './HyperKineticHero.css';

const HyperKineticHero = () => {
  const rootRef = useRef(null);
  const cursorRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const cursor = cursorRef.current;
    if (!root || !cursor) return;


    // Magnet effect for magnetic elements
    const magneticElements = root.querySelectorAll('.magnetic');
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: 'power2.out'
      });
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    magneticElements.forEach(el => {
      const magnetMove = (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const moveX = (e.clientX - centerX) * 0.4;
        const moveY = (e.clientY - centerY) * 0.4;
        
        gsap.to(el, {
          x: moveX,
          y: moveY,
          duration: 0.3,
          ease: 'power2.out'
        });
        cursor.classList.add('magnet');
      };

      const magnetLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });
        cursor.classList.remove('magnet');
      };

      el.addEventListener('mousemove', magnetMove);
      el.addEventListener('mouseleave', magnetLeave);
    });

    // Hacker text effect
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const hackerLinks = root.querySelectorAll('[data-text]');
    hackerLinks.forEach(link => {
      let interval = null;
      const originalText = link.dataset.text;

      link.onmouseenter = () => {
        let iteration = 0;
        clearInterval(interval);
        interval = setInterval(() => {
          link.innerText = originalText.split("")
            .map((letter, index) => {
              if(index < iteration) return originalText[index];
              return chars[Math.floor(Math.random() * 36)];
            })
            .join("");
          if(iteration >= originalText.length) clearInterval(interval);
          iteration += 1 / 3;
        }, 30);
      };

      link.onmouseleave = () => {
        clearInterval(interval);
        link.innerText = originalText;
      };
    });

    // 3D Tilt for Nav when scrolled
    const nav = root.querySelector('.brutal-nav');
    const handleNavTilt = (e) => {
      if (window.scrollY <= 100) return;
      const cx = window.innerWidth / 2;
      const cy = 60;
      const rx = (e.clientY - cy) * 0.02;
      const ry = (e.clientX - cx) * 0.02;
      
      const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
      
      gsap.to(nav, {
        rotationX: -clamp(rx, -10, 10),
        rotationY: clamp(ry, -10, 10),
        duration: 0.5,
        ease: 'power2.out'
      });
    };
    window.addEventListener('mousemove', handleNavTilt);

    // Scroll Velocity Skew
    const scrollContent = root.querySelector('#hero-scroll-content');
    let lastScrollTop = 0;
    let skewSetter = gsap.quickSetter(scrollContent, "skewY", "deg");
    let proxy = { skew: 0 };
    
    const skewLoop = () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScrollTop;
      lastScrollTop = currentScroll;
      
      let skew = gsap.utils.clamp(-10, 10, delta * 0.1);
      
      if (Math.abs(skew) > Math.abs(proxy.skew)) {
        proxy.skew = skew;
        gsap.to(proxy, {
          skew: 0,
          duration: 0.8,
          ease: 'power3.out',
          overwrite: true,
          onUpdate: () => skewSetter(proxy.skew)
        });
      }
      requestAnimationFrame(skewLoop);
    };
    const skewRAF = requestAnimationFrame(skewLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleNavTilt);
      cancelAnimationFrame(skewRAF);
      magneticElements.forEach(el => {
        el.removeEventListener('mousemove', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  return (
    <div ref={rootRef} className="hyper-kinetic-hero">
      <div className="noise"></div>
      <div ref={cursorRef} id="hero-cursor"></div>

      <nav className={`brutal-nav ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="nav-left">
          <a href="#home" className="nav-logo magnetic" data-text="BABU">BABU</a>
        </div>
        
        {/* Desktop Menu */}
        <ul className="nav-menu-desktop">
          <li><a href="#about" className="nav-link-desktop" data-text="ABOUT">ABOUT</a></li>
          <li><a href="#projects" className="nav-link-desktop" data-text="WORK">WORK</a></li>
          <li><a href="#skills" className="nav-link-desktop" data-text="STACK">STACK</a></li>
        </ul>

        <div className="nav-right">
          <button className="cta-btn magnetic hide-mobile" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>LET'S TALK</span>
          </button>
          
          <button className={`burger ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`}>
        <ul className="mobile-menu-links">
          <li><a href="#about" onClick={() => setIsMenuOpen(false)}>ABOUT</a></li>
          <li><a href="#projects" onClick={() => setIsMenuOpen(false)}>WORK</a></li>
          <li><a href="#skills" onClick={() => setIsMenuOpen(false)}>STACK</a></li>
          <li><button onClick={() => { setIsMenuOpen(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>CONTACT</button></li>
        </ul>
      </div>





      <div id="hero-scroll-content">
        <section className="hero">
          <div className="hero-bg-poster">
            <img src="/portfolio_image.png" alt="Babu Portrait" />
          </div>
          <div className="hero-title-container">
            <h1>
              <div className="word">BABU B</div>
            </h1>
            <div className="hero-role">FULL STACK DEVELOPER</div>


          </div>


          <div className="tape-wrapper">
            <div className="tape-text">
              BABU B ✦ FULL STACK ENGINEER ✦ CREATIVE TECHNOLOGIST ✦ SYSTEM ARCHITECT ✦ BABU B ✦ FULL STACK ENGINEER ✦ CREATIVE TECHNOLOGIST ✦
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HyperKineticHero;
