import React from 'react';
import { Link } from 'react-router-dom';
import './servicecta.css'

const ServicesCTA: React.FC = () => {
  return (
    <section className="kinstry-services-cta">
      <div className="ks-cta-nebula"></div>
      <div className="ks-cta-grid"></div>
      
      <div className="ks-cta-container">
        <div className="ks-cta-card">
          <div className="ks-cta-hologram"></div>
          <div className="ks-cta-rings">
            <div className="ks-ring ks-ring-1"></div>
            <div className="ks-ring ks-ring-2"></div>
            <div className="ks-ring ks-ring-3"></div>
          </div>
          
          <div className="ks-cta-content">
            <div className="ks-cta-icon">
              <span className="ks-icon-spark">✨</span>
            </div>
            
            <h2 className="ks-cta-title">
              <span className="ks-cta-title-main">Need a Custom Solution?</span>
              <span className="ks-cta-title-glow"></span>
            </h2>
            
            <p className="ks-cta-description">
              Let's build something extraordinary together. We specialize in 
              tailored solutions that perfectly fit your unique requirements 
              and business objectives.
            </p>
            
            <div className="ks-cta-stats">
              <div className="ks-stat">
                <div className="ks-stat-value">24/7</div>
                <div className="ks-stat-label">Support</div>
              </div>
              <div className="ks-stat">
                <div className="ks-stat-value">100%</div>
                <div className="ks-stat-label">Satisfaction</div>
              </div>
              <div className="ks-stat">
                <div className="ks-stat-value">∞</div>
                <div className="ks-stat-label">Scalability</div>
              </div>
            </div>
            
            <Link to="/contact" className="ks-cta-button">
              <span className="ks-button-content">
                <span className="ks-button-text">Start Your Project</span>
                <span className="ks-button-arrow">→</span>
              </span>
              <div className="ks-button-glow"></div>
              <div className="ks-button-particles"></div>
            </Link>
          </div>
          
          <div className="ks-cta-orbit">
            <div className="ks-orbit-dot"></div>
            <div className="ks-orbit-dot"></div>
            <div className="ks-orbit-dot"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCTA;