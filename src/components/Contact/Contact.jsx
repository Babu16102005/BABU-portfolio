import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">What’s Next?</h2>
      <h3 className="contact-subtitle">Get In Touch</h3>
      <p>
        I'm currently looking for new opportunities, and my inbox is always open. Whether you have a question or just want to say hi, I’ll do my best to get back to you!
      </p>
      <a href="mailto:your-email@example.com" className="cta-button">Say Hello</a>
    </section>
  );
};

export default Contact;

