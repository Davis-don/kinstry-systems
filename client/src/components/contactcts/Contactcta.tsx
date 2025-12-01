import React from 'react';
import './contactcta.css'

const ContactCTA: React.FC = () => {
  return (
    <section className="kinstry-contact-cta">
      <div className="kc-cta-universe">
        <div className="kc-cta-stars"></div>
        <div className="kc-cta-nebula"></div>
        <div className="kc-cta-comet"></div>
      </div>
      
      <div className="kc-cta-container">
        <div className="kc-cta-content">
          <div className="kc-cta-icon-wrapper">
            <div className="kc-cta-icon">
              <span className="kc-cta-emoji">🌟</span>
            </div>
            <div className="kc-cta-orbits">
              <div className="kc-orbit kc-orbit-1"></div>
              <div className="kc-orbit kc-orbit-2"></div>
              <div className="kc-orbit kc-orbit-3"></div>
            </div>
          </div>
          
          <h2 className="kc-cta-title">
            <span className="kc-cta-main-text">Always Available</span>
            <span className="kc-cta-sub-text">Monday–Sunday</span>
          </h2>
          
          <p className="kc-cta-message">
            Feel free to reach out anytime — 
            <span className="kc-cta-highlight"> no project is too big or too small.</span>
            We're passionate about solving problems and creating exceptional digital experiences.
          </p>
          
          <div className="kc-cta-actions">
            <a href="tel:+254758420860" className="kc-action-button kc-action-primary">
              <span className="kc-action-icon">📞</span>
              <span className="kc-action-text">Call Now</span>
              <div className="kc-action-glow"></div>
            </a>
            
            <a href="https://wa.me/254758420860" target="_blank" rel="noopener noreferrer" className="kc-action-button kc-action-secondary">
              <span className="kc-action-icon">💬</span>
              <span className="kc-action-text">WhatsApp</span>
              <div className="kc-action-glow"></div>
            </a>
          </div>
          
          <div className="kc-cta-timezone">
            <span className="kc-timezone-icon">🌍</span>
            <span className="kc-timezone-text">Based in Kenya (EAT) • Serving clients worldwide</span>
          </div>
        </div>
        
        <div className="kc-cta-particles">
          <div className="kc-particle"></div>
          <div className="kc-particle"></div>
          <div className="kc-particle"></div>
          <div className="kc-particle"></div>
          <div className="kc-particle"></div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;