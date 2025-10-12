import React from 'react';
import './Contact.css';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const Contact = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [subtitleRef, subtitleVisible] = useScrollAnimation();
  const [textRef, textVisible] = useScrollAnimation();
  const [buttonRef, buttonVisible] = useScrollAnimation();

  return (
    <section id="contact" className="contact-section">
      <h2 
        ref={titleRef}
        className={`section-title scroll-slide-top ${titleVisible ? 'visible' : ''}`}
      >
        What's Next?
      </h2>
      <h3 
        ref={subtitleRef}
        className={`contact-subtitle scroll-fade-in ${subtitleVisible ? 'visible' : ''}`}
      >
        Get In Touch
      </h3>
      <p 
        ref={textRef}
        className={`scroll-slide-left ${textVisible ? 'visible' : ''}`}
      >
        I'm currently looking for new opportunities, and my inbox is always open. Whether you have a question or just want to say hi, I'll do my best to get back to you!
      </p>
      <a 
        ref={buttonRef}
        href="mailto:your-email@example.com" 
        className={`cta-button scroll-pop-in ${buttonVisible ? 'visible' : ''}`}
      >
        Say Hello
      </a>
    </section>
  );
};

export default Contact;

