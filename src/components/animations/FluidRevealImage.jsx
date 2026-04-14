import React, { useEffect, useRef, useState } from 'react';
import './FluidRevealImage.css';

const FluidRevealImage = ({ src, alt = "Profile" }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const blobRef = useRef(null);
  const topImageRef = useRef(null);
  
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const blob = blobRef.current;
    const topImage = topImageRef.current;
    if (!container || !canvas || !blob || !topImage) return;

    const ctx = canvas.getContext('2d');
    const w = 280;
    const h = 280;
    canvas.width = w;
    canvas.height = h;

    const mouse = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const ease = 0.12;
    let time = 0;
    const morphSpeed = 0.02;
    let animationId;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const updateMask = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'black';
      ctx.beginPath();
      
      const centerX = w / 2;
      const centerY = h / 2;
      const baseRadius = w / 3;
      
      for (let angle = 0; angle <= Math.PI * 2; angle += 0.1) {
        const variation1 = Math.sin(angle * 3 + time) * 15;
        const variation2 = Math.cos(angle * 5 - time * 0.7) * 10;
        const variation3 = Math.sin(angle * 7 + time * 1.3) * 8;
        
        const radius = baseRadius + variation1 + variation2 + variation3;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (angle === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.closePath();
      ctx.fill();
      
      const maskImage = canvas.toDataURL();
      topImage.style.setProperty('--mask-image', `url(${maskImage})`);
    };

    const animate = () => {
      time += morphSpeed;
      current.x += (mouse.x - current.x) * ease;
      current.y += (mouse.y - current.y) * ease;
      
      blob.style.left = `${current.x}px`;
      blob.style.top = `${current.y}px`;
      
      topImage.style.setProperty('--mask-x', `${current.x - 140}px`);
      topImage.style.setProperty('--mask-y', `${current.y - 140}px`);
      
      updateMask();
      animationId = requestAnimationFrame(animate);
    };

    container.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fluid-reveal-frame"
    >
      <div className="image-under">
        <img src={src} alt={alt} style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 95%)', WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 95%)' }} />
      </div>
    </div>
  );
};

export default FluidRevealImage;
