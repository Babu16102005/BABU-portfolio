import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation } from 'react-router-dom';
import './TextFillOnScroll.css';

gsap.registerPlugin(ScrollTrigger);

const TextFillOnScroll = ({ children }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Small timeout to ensure DOM is ready and layout has settled
    const timer = setTimeout(() => {
      if (!textRef.current) return;

      const anim = gsap.to(textRef.current, {
        backgroundSize: "200% 200%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 40%",
          scrub: true,
          // invalidateOnRefresh: true
        }
      });

      return () => {
        if (anim.scrollTrigger) anim.scrollTrigger.kill();
        anim.kill();
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [location?.pathname]); // Removed children from dependency array to avoid infinite loop

  return (
    <div ref={containerRef} className="text-fill-container js-fill">
      <h2 className="fill-text">
        <span ref={textRef}>{children}</span>
      </h2>
    </div>
  );
};

export default TextFillOnScroll;
