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
                        // Matching your portfolio color palette #0a192f (very subtle net)
                        backgroundColor: 0x0a192f,
                        color: 0x1a4a40,        // Very subtle teal - faint
                        points: 10.0,
                        maxDistance: 20.0,
                        spacing: 15.0,
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
