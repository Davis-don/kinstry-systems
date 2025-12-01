import React from 'react';
import './contactheader.css'

const ContactHeader: React.FC = () => {
  return (
    <section className="kinstry-contact-header">
      <div className="kc-header-container">
        <div className="kc-header-badge">
          <span className="kc-badge-dot"></span>
          <span className="kc-badge-text">Available Now</span>
        </div>
        
        <h1 className="kc-header-title">
          <span className="kc-title-line-1">Let's Work</span>
          <span className="kc-title-line-2">
            <span className="kc-title-highlight">Together</span>
            <span className="kc-title-underline"></span>
          </span>
        </h1>
        
        <div className="kc-header-subtitle">
          <p className="kc-subtitle-text">
            Reach out anytime — 
            <span className="kc-subtitle-spark"> call, chat, or email.</span>
            We're ready to bring your ideas to life.
          </p>
          
          <div className="kc-header-stats">
            <div className="kc-stat-item">
              <div className="kc-stat-number">24/7</div>
              <div className="kc-stat-label">Response Time</div>
            </div>
            <div className="kc-stat-item">
              <div className="kc-stat-number">100%</div>
              <div className="kc-stat-label">Availability</div>
            </div>
            <div className="kc-stat-item">
              <div className="kc-stat-number">∞</div>
              <div className="kc-stat-label">Dedication</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHeader;