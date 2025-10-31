import React, { useEffect, useState } from 'react';
import './Home.css';
import { FaDownload } from "react-icons/fa";

const Home = () => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const words = [
    "Full Stack Developer",
    "Web Designer",
    "Tech Enthusiast",
    "Problem Solver"
  ];

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Typing animation logic
  useEffect(() => {
    const current = words[wordIndex];
    let typingSpeed = isDeleting ? 50 : 120;

    const type = () => {
      setText(prev =>
        isDeleting
          ? current.substring(0, prev.length - 1)
          : current.substring(0, prev.length + 1)
      );

      if (!isDeleting && text === current) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setWordIndex(prev => (prev + 1) % words.length);
      }
    };

    const timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  return (
    <section id="home" className={`home-section ${visible ? 'visible' : ''}`}>
      <div className="home-content pop-up">
        {/* Left side - Image */}
        <div className="about-image">
          <div className="image-wrapper">
            <div className="image-placeholder">
              <img src="/babu_image.jpg" alt="Profile" className="profile-image" />
            </div>
          </div>
        </div>

        {/* Right side - Text */}
        <div className="text-content">
          <h1 className="greeting">Hi, I'm</h1>
          <h2 className="name">Babu B</h2>
          <h3 className="subtitle">
            {text}
            <span className="cursor">|</span>
          </h3>
          <p className="intro-text">
            Building interactive web apps with modern technologies. Focused on Problem Solving,
            Clean Code, Smart Design, and seamless user experience.
          </p>
          <div className="button-container">
            <a className="scroll-button" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
              <span>Get In Touch</span>
            </a>
            {/* Uncomment to enable download button */}
            {/* <button className="download-btn">
              Download CV <FaDownload />
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
