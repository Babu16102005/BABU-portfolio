import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './AnimatedSkillsBackground.css';

const getDistance = (p1, p2) => (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2;

const AnimatedSkillsBackground = ({ title = 'My', thinTitle = 'Skills', children }) => {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;

    if (!root || !canvas) {
      return undefined;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return undefined;
    }

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let animateHeader = true;
    let points = [];
    const target = { x: 0, y: 0 };
    const tweens = [];

    const drawLines = (point) => {
      if (!point.active) {
        return;
      }

      point.closest.forEach((closestPoint) => {
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(closestPoint.x, closestPoint.y);
        ctx.strokeStyle = `rgba(156,217,249,${point.active})`;
        ctx.stroke();
      });
    };

    const drawCircle = (point) => {
      if (!point.circleActive) {
        return;
      }

      ctx.beginPath();
      ctx.arc(point.x, point.y, point.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = `rgba(156,217,249,${point.circleActive})`;
      ctx.fill();
    };

    const shiftPoint = (point) => {
      const tween = gsap.to(point, {
        x: point.originX - 50 + Math.random() * 100,
        y: point.originY - 50 + Math.random() * 100,
        duration: 1 + Math.random(),
        ease: 'circ.inOut',
        onComplete: () => shiftPoint(point),
      });

      tweens.push(tween);
    };

    const createPoints = () => {
      points = [];
      const stepX = width / 20;
      const stepY = height / 20;

      for (let x = 0; x < width; x += stepX) {
        for (let y = 0; y < height; y += stepY) {
          const px = x + Math.random() * stepX;
          const py = y + Math.random() * stepY;
          points.push({ x: px, originX: px, y: py, originY: py, radius: 2 + Math.random() * 2, closest: [] });
        }
      }

      points.forEach((point) => {
        point.closest = points
          .filter((candidate) => candidate !== point)
          .sort((a, b) => getDistance(point, a) - getDistance(point, b))
          .slice(0, 5);
      });
    };

    const resize = () => {
      width = Math.max(root.clientWidth, window.innerWidth || 1024);
      height = Math.max(root.clientHeight, Math.min(window.innerHeight || 720, 720));
      target.x = width / 2;
      target.y = height / 2;
      root.style.minHeight = `${height}px`;
      canvas.width = width;
      canvas.height = height;
      tweens.splice(0).forEach((tween) => tween.kill());
      createPoints();
      points.forEach(shiftPoint);
    };

    const animate = () => {
      if (animateHeader) {
        ctx.clearRect(0, 0, width, height);

        points.forEach((point) => {
          const distance = Math.abs(getDistance(target, point));

          if (distance < 4000) {
            point.active = 0.3;
            point.circleActive = 0.6;
          } else if (distance < 20000) {
            point.active = 0.1;
            point.circleActive = 0.3;
          } else if (distance < 40000) {
            point.active = 0.02;
            point.circleActive = 0.1;
          } else {
            point.active = 0;
            point.circleActive = 0;
          }

          drawLines(point);
          drawCircle(point);
        });
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    const mouseMove = (event) => {
      target.x = event.pageX || event.clientX;
      target.y = event.pageY || event.clientY;
    };

    const scrollCheck = () => {
      const top = document.body.scrollTop || document.documentElement.scrollTop || window.scrollY;
      animateHeader = top <= height;
    };

    resize();
    animate();

    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', mouseMove);
    }
    window.addEventListener('scroll', scrollCheck, { passive: true });
    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('scroll', scrollCheck);
      window.removeEventListener('resize', resize);
      tweens.forEach((tween) => tween.kill());
    };
  }, []);

  return (
    <div ref={rootRef} className="animated-skills-background">
      <div className="large-header">
        <canvas ref={canvasRef} aria-hidden="true" />
        <div className="animated-skills-background__content">
          <h2 className="main-title">
            {title} <span className="thin">{thinTitle}</span>
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AnimatedSkillsBackground;
