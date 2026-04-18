import React, { useEffect, useRef, useState } from 'react';
import './HyperScrollScene.css';

const CONFIG = {
  itemCount: 15,
  starCount: 150,
  zGap: 600,
  camSpeed: 2.5,
  loopSize: 0, // Calculated
};
CONFIG.loopSize = CONFIG.itemCount * CONFIG.zGap;

const TEXTS = ["ACHIEVE", "CERTIFY", "COLLAB", "SOS-SAFE", "PRIVATE"];

const PROOF_DATA = [
  {
    category: "ACHIEVEMENT",
    title: "1st Prize x2",
    desc: "We won the 1st prize x2 in the Paper Presentation.",
    provider: "presentation"
  },
  {
    category: "CERTIFICATION",
    title: "Java Fund.",
    desc: "Java Programming Fundamentals course",
    provider: "Springboard, Infosys"
  },
  {
    category: "PROJECT",
    title: "Career Guid.",
    desc: "Career Guidance System - Team work project",
    provider: "Team work"
  },
  {
    category: "PROJECT",
    title: "SOS Alert",
    desc: "Real-time emergency safety system with localized GPS sharing.",
    provider: "Personal Project"
  },
  {
    category: "PROJECT",
    title: "Priv. Chat",
    desc: "Encrypted 1:1 messaging with Obsidian atmospheric themes.",
    provider: "Supabase Ops"
  }
];


const HyperScrollScene = () => {
  const worldRef = useRef(null);
  const viewportRef = useRef(null);
  const containerRef = useRef(null);

  const [items, setItems] = useState([]);


  const [winSize, setWinSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const initItems = () => {
    const newItems = [];
    let pairCount = 0;
    const { width, height } = { width: window.innerWidth, height: window.innerHeight };

    // Preparation of items data
    for (let i = 0; i < CONFIG.itemCount; i++) {
      if (i % 3 === 0 && pairCount < PROOF_DATA.length) {
        const baseZ = -i * CONFIG.zGap;

        let textX = (Math.random() - 0.5) * width * 0.5;
        let textY = (Math.random() - 0.5) * height * 0.5;

        if (pairCount === 0) {
          textX = 0;
          textY = 0;
        }

        newItems.push({
          id: `item-text-${i}`,
          type: 'text',
          text: TEXTS[pairCount % TEXTS.length],
          isOutline: Math.random() > 0.5,
          scale: pairCount === 0 ? 0.4 : (pairCount === 2 ? 0.4 : 1),
          x: textX,
          y: textY,
          rot: 0,
          baseZ: baseZ
        });

        const currentData = PROOF_DATA[pairCount];

        let baseOffset = -300;
        switch (pairCount) {
          case 0:
            baseOffset = -100;
            break;
          case 1:
            baseOffset = -150;
            break;
          case 2:
            baseOffset = -950;
            break;
          case 3:
            baseOffset = -1300;
            break;
          case 4:
            baseOffset = -1450;
            break;
        }

        const angle = (pairCount / PROOF_DATA.length) * Math.PI * 4;
        newItems.push({
          id: `item-card-${i}`,
          type: 'card',
          data: currentData,
          cardId: Math.floor(Math.random() * 9999),
          cardIndex: pairCount + 1,
          x: pairCount === 0 ? 0 : Math.cos(angle) * (width * 0.25),
          y: Math.sin(angle) * (height * 0.25) + baseOffset,
          rot: (Math.random() - 0.5) * 15,
          baseZ: baseZ - 100
        });

        pairCount++;
      }
    }

    for (let i = 0; i < CONFIG.starCount; i++) {
      newItems.push({
        id: `star-${i}`,
        type: 'star',
        x: (Math.random() - 0.5) * 3000,
        y: (Math.random() - 0.5) * 3000,
        baseZ: -Math.random() * CONFIG.loopSize
      });
    }

    setItems(newItems);
  };

  useEffect(() => {
    initItems();

    const handleResize = () => {
      setWinSize({ width: window.innerWidth, height: window.innerHeight });
      initItems();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    if (!worldRef.current || !viewportRef.current || items.length === 0) return;

    const world = worldRef.current;
    const viewport = viewportRef.current;
    const itemEls = Array.from(world.querySelectorAll('.hyper-item'));

    let lastScroll = window.scrollY;
    let vel = 0;
    let targetVel = 0;
    let lastTime = 0;
    let mouseX = 0;
    let mouseY = 0;
    let rafId;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const update = (time) => {
      if (!containerRef.current || !viewportRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const relativeScroll = Math.max(0, -containerRect.top);

      const currentScroll = window.scrollY;
      const scrollDelta = currentScroll - lastScroll;
      targetVel = scrollDelta;
      vel += (targetVel - vel) * 0.1;
      lastScroll = currentScroll;

      // HUD Updates (Removed as per request)

      const delta = time - lastTime;
      lastTime = time;

      const tiltX = mouseY * 5 - vel * 0.5;
      const tiltY = mouseX * 5;
      world.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

      const baseFov = 1000;
      const fov = baseFov - Math.min(Math.abs(vel) * 10, 600);
      viewport.style.perspective = `${fov}px`;

      const cameraZ = relativeScroll * CONFIG.camSpeed;
      const modC = CONFIG.loopSize;

      itemEls.forEach((el, idx) => {
        const item = items[idx];
        if (!item) return;

        let relZ = item.baseZ + cameraZ;
        let vizZ = relZ;

        // Loop only the background stars to ensure they persist indefinitely
        if (item.type === 'star') {
          vizZ = ((relZ % modC) + modC) % modC;
          if (vizZ > 500) vizZ -= modC;
        }

        let alpha = 1;
        if (item.type === 'star') {
          if (vizZ < -3000) alpha = 0;
          else if (vizZ < -2000) alpha = (vizZ + 3000) / 1000;
        } else {
          // Strictly fade in cards/text close to the camera (-1500) so they don't overlap in the distance
          if (vizZ < -1500) alpha = 0;
          else if (vizZ < -800) alpha = (vizZ + 1500) / 700;
        }

        if (vizZ > 100 && item.type !== 'star') alpha -= ((vizZ - 100) / 400);
        if (alpha < 0) alpha = 0;

        el.style.opacity = alpha;
        if (alpha > 0) {
          let trans = `translate3d(${item.x}px, ${item.y}px, ${vizZ}px)`;
          if (item.type === 'star') {
            const stretch = Math.max(1, Math.min(1 + Math.abs(vel) * 0.1, 10));
            trans += ` scale3d(1, 1, ${stretch})`;
          } else if (item.type === 'text') {
            const currentScale = item.scale || 1;
            trans += ` rotateZ(${item.rot}deg) scale3d(${currentScale}, ${currentScale}, 1)`;
            // Fix the red cyan styling from the video
            if (Math.abs(vel) > 1 && !item.isOutline) {
              const offset = Math.min(vel * 1.5, 40);
              el.style.textShadow = `${offset}px 0 #00ffff, ${-offset}px 0 #ff0000`;
            } else if (!item.isOutline) {
              el.style.textShadow = `8px 0 #00ffff, -8px 0 #ff0000`;
            }
          } else {
            const t = time * 0.001;
            const float = Math.sin(t + item.x) * 10;
            trans += ` rotateZ(${item.rot}deg) rotateY(${float}deg)`;
          }
          el.style.transform = trans;
        }
      });

      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [items]);

  const totalCardTravel = (PROOF_DATA.length - 1) * 3 * CONFIG.zGap + 600;
  const dynamicHeight = (totalCardTravel / CONFIG.camSpeed) + window.innerHeight;

  return (
    <div
      ref={containerRef}
      className="hyper-scroll-container"
      style={{ height: `${dynamicHeight}px` }}
    >
      <div ref={viewportRef} id="hyper-viewport">
        {/* OVERLAYS contained within the sticky viewport */}
        <div className="scanlines"></div>
        <div className="vignette"></div>
        <div className="noise-overlay"></div>

        <div ref={worldRef} id="hyper-world">

          {items.map((item) => (
            <div key={item.id} className={`hyper-item ${item.type}`}>
              {item.type === 'text' && <div className={`big-text ${item.isOutline ? 'outline' : 'solid'}`}>{item.text}</div>}
              {item.type === 'card' && (
                <div className="card">
                  <div className="card-top-accent"></div>
                  <div className="card-header">
                    <span className="card-id">{item.data?.category || "SYS-ERROR"}</span>
                  </div>
                  <h2 className="card-title">{item.data?.title || "UNKNOWN"}</h2>
                  <p className="card-desc">
                    {item.data?.desc || "NO DATA AVAILABLE"}
                  </p>
                  <div className="card-footer">
                    <span>{item.data?.provider || "N/A"}</span>
                  </div>
                  <div className="card-bg-number">
                    {(item.cardIndex || 0).toString().padStart(2, '0')}
                  </div>
                </div>
              )}
              {item.type === 'star' && <div className="star"></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HyperScrollScene;
