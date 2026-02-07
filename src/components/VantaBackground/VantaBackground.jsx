import React, { useState, useEffect, useRef } from 'react';
import './VantaBackground.css';

const VantaBackground = ({ children }) => {
    const [vantaEffect, setVantaEffect] = useState(null);
    const vantaRef = useRef(null);

    useEffect(() => {
        const loadScripts = async () => {
            // Check if scripts are already loaded
            if (window.VANTA && window.VANTA.NET && window.THREE) {
                initVanta();
                return;
            }

            // Load THREE.js
            if (!window.THREE) {
                await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
            }

            // Load Vanta NET
            if (!window.VANTA || !window.VANTA.NET) {
                await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js');
            }

            initVanta();
        };

        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };

        const initVanta = () => {
            if (!vantaEffect && vantaRef.current && window.VANTA && window.VANTA.NET) {
                setVantaEffect(
                    window.VANTA.NET({
                        el: vantaRef.current,
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 200.0,
                        minWidth: 200.0,
                        scale: 1.0,
                        scaleMobile: 1.0,
                        // Cyberpunk color palette - rgba(0, 240, 255, 0.5) effect
                        backgroundColor: 0x0a0a0f, // Dark cyber background
                        color: 0x057d87,           // Cyan at ~50% opacity blended with bg (simulates rgba(0,240,255,0.5))
                        points: 8.0,               // Fewer points for cleaner look
                        maxDistance: 25.0,         // Longer connections
                        spacing: 18.0,             // More spacing
                        showDots: true,
                    })
                );
            }
        };

        loadScripts();

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    return (
        <div className="vanta-wrapper">
            <div className="vanta-background" ref={vantaRef}></div>
            <div className="vanta-content">
                {children}
            </div>
        </div>
    );
};

export default VantaBackground;
