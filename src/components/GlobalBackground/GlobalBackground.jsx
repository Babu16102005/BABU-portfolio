import React from 'react';
import './GlobalBackground.css';

const GlobalBackground = () => {
    return (
        <div className="global-background">
            <div className="background-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>

                {/* Horizontal Circuit Lines */}
                <div className="circuit-line" style={{ top: '20%', left: 0 }}></div>
                <div className="circuit-line" style={{ top: '60%', left: 0, animationDelay: '2s' }}></div>
                <div className="circuit-line" style={{ top: '80%', left: 0, animationDelay: '4s' }}></div>

                {/* Vertical Circuit Lines */}
                <div className="circuit-line circuit-v" style={{ top: 0, left: '30%', animationDuration: '5s' }}></div>
                <div className="circuit-line circuit-v" style={{ top: 0, right: '20%', animationDuration: '7s', animationDelay: '1s' }}></div>
                <div className="circuit-line circuit-v" style={{ top: 0, left: '70%', animationDuration: '6s', animationDelay: '3s' }}></div>
            </div>
        </div>
    );
};

export default GlobalBackground;
