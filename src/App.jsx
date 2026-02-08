import React from 'react';
import './App.css';
import GlobalBackground from './components/GlobalBackground/GlobalBackground';

// Import Components
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Credentials from './components/Achievements/Achievements';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

import VantaBackground from './components/VantaBackground/VantaBackground';

function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <VantaBackground>
        <GlobalBackground />
        <div className="App">
          <Header />
          <main>
            <Home />
            <About />
            <Skills />
            <Projects />
            <Credentials />
            <Contact />
          </main>
          <Footer />
        </div>
      </VantaBackground>
    </div>
  );
}

export default App;


