import React, { useEffect, useState } from 'react';
import './App.css';
import GlobalBackground from './components/GlobalBackground/GlobalBackground';
import SssscalesLoader from './components/animations/SssscalesLoader';
import SmoothScroll from './components/animations/SmoothScroll';

import Home from './components/Home/Home';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Credentials from './components/Achievements/Achievements';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

function App() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowLoader(false);
    }, 2800); // Slightly longer for the premium loader

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="app-shell">
      <GlobalBackground />

      <div className={`site-loader ${showLoader ? 'is-active' : 'is-hidden'}`} aria-hidden={!showLoader}>
        <div className="site-loader__inner">
          <SssscalesLoader />
        </div>
      </div>

      <SmoothScroll>
        <div className="App" aria-hidden={showLoader ? 'true' : undefined} inert={showLoader ? '' : undefined}>
          <main id="main-content">
            <Home />
            <About />
            <Skills />
            <Projects />
            <Credentials />
            <Contact />
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </div>
  );
}

export default App;
