import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './SssscalesLoader.css';

const SssscalesLoader = () => {
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // Clear existing children from previous renders if any (though StrictMode should be handled)
    // But since we are creating elements, let's just make it declarative if possible, 
    // or clean up correctly.
    
    // The original script clones nodes. In React, we prefer mapping.
    // Let's implement it with mapping for better React compatibility.
    
    const tl = gsap.timeline();
    
    // We'll target classes we'll create in the JSX
    tl.to('.sssscales-col', {
      duration: 1.5,
      y: 11,
      ease: 'sine.inOut',
      stagger: {
        amount: 3,
        repeat: -1,
        yoyo: true
      }
    }, 0);

    for (let i = 0; i <= 9; i++) {
      tl.add(
        gsap.fromTo(`.sssscales-box-${i} circle`, {
          y: (j) => gsap.utils.interpolate(77, -77, j / 10),
          transformOrigin: '50%',
          scale: 0.133
        }, {
          y: (j) => gsap.utils.interpolate(i, -i, j / 10),
          scale: 0.8,
          duration: 1,
          ease: 'sine',
          repeat: -1,
          yoyo: true,
          yoyoEase: 'sine.in'
        }), i / 10);
    }

    tl.play(50);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="sssscales-container">
      <svg ref={stageRef} className="sssscales-stage" viewBox="0 0 98 108">
        <defs>
          <mask id="sssscales-m">
            <rect width="10" height="10" fill="#fff" />
          </mask>
        </defs>
        {[...Array(10)].map((_, i) => (
          <g key={`col-${i}`} className={`sssscales-col sssscales-col-${i}`} transform={`translate(${i * 10}, 0)`}>
            {[...Array(10)].map((_, j) => (
              <g 
                key={`box-${i}-${j}`} 
                className={`sssscales-box sssscales-box-${i}`} 
                mask="url(#sssscales-m)"
                transform={`translate(0, ${j * 10})`}
              >
                <circle cx="5" cy="5" r="5" fill="currentColor" />
              </g>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default SssscalesLoader;
