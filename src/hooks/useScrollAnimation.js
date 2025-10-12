import { useEffect, useRef, useState } from 'react';

const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Fallback: make visible after 2 seconds if not triggered by scroll
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          clearTimeout(fallbackTimer);
          // Disconnect observer after first intersection to prevent re-triggering
          observer.disconnect();
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px', // Start animation when element is closer to viewport
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return [elementRef, isVisible];
};

export default useScrollAnimation;
