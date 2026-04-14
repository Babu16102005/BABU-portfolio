import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        e.target.reset();
      } else {
        console.error("Submission failed:", data);
        alert(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Network error. Please check your connection.");
    }
    setIsSubmitting(false);
  };


  return (
    <section id="contact" className="contact-brutal">
      <div className="contact-content-centered">
        <div className="brutal-header-centered">
          <h2 className="brutal-heading">WHAT'S NEXT?</h2>
          <div className="header-line"></div>
          <p className="contact-sub-text">
            I'm currently looking for new opportunities, and my inbox is always open. Whether you have a question or just want to say hi, I'll do my best to get back to you!
          </p>
        </div>


        <div className="contact-body">
          {!isSuccess ? (
            <div className={`form-wrapper ${isSubmitting ? 'submitting' : ''}`}>
              <form className="brutal-form" onSubmit={handleSubmit}>
                {/* REQUIRED: Access Key activated from web3forms.com */}
                <input type="hidden" name="access_key" value="6026a0b4-0a75-4ed0-a023-2b6526ffd05e" />

                <input type="hidden" name="subject" value="New Portfolio Contact" />
                <input type="hidden" name="from_name" value="Babu Portfolio" />
                <input type="checkbox" name="botcheck" style={{ display: "none" }} />

                <div className="form-grid">
                  <div className="form-group grid-half">
                    <label htmlFor="name">NAME / SENDER</label>
                    <input type="text" id="name" name="name" placeholder="IDENTIFY YOURSELF" required />
                  </div>

                  <div className="form-group grid-half">
                    <label htmlFor="email">EMAIL / RETURN_ADDR</label>
                    <input type="email" id="email" name="email" placeholder="ENCRYPTION_KEY@MAIL.COM" required />
                  </div>
                </div>


                <div className="form-group">
                  <label htmlFor="message">DESCRIPTION / PACKET_DATA</label>
                  <textarea id="message" name="message" placeholder="ENTER YOUR MESSAGE HERE..." rows="5" required></textarea>
                </div>

                <div className="btn-container">
                  <button type="submit" className="mega-brutal-btn magnetic" disabled={isSubmitting}>
                    <span>{isSubmitting ? "TRANSMITTING..." : "ENCRYPT & SEND //"}</span>
                    <div className="btn-glitch"></div>
                  </button>
                </div>
              </form>

              {isSubmitting && (
                <div className="loading-overlay">
                  <div className="loader-hud">
                    <div className="scan-line"></div>
                    <div className="loader-text">SENDING_PACKETS...</div>
                    <div className="loader-percent">BYTE_STREAM: ACTIVE</div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="success-card">
              <div className="success-icon">✦</div>
              <h3>TRANSMISSION SUCCESSFUL</h3>
              <p>THE SYSTEM HAS RECEIVED YOUR PACKET. RESPONSE WILL BE GENERATED SOON.</p>
              <button className="mega-brutal-btn" onClick={() => setIsSuccess(false)}>RE-OPEN CHANNEL</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );

};


export default Contact;
