import React from 'react';
import './contactmethods.css'

interface ContactMethod {
  id: number;
  title: string;
  description: string;
  icon: string;
  value: string;
  link: string;
  color: string;
}

const ContactMethods: React.FC = () => {
  const methods: ContactMethod[] = [
    {
      id: 1,
      title: "Phone / Call",
      description: "Direct phone line for immediate assistance",
      icon: "📞",
      value: "0758 420 860",
      link: "tel:+254758420860",
      color: "#10b981"
    },
    {
      id: 2,
      title: "WhatsApp",
      description: "Instant chat for quick questions and updates",
      icon: "💬",
      value: "Chat on WhatsApp",
      link: "https://wa.me/254758420860",
      color: "#25D366"
    },
    {
      id: 3,
      title: "Email",
      description: "Detailed inquiries and project discussions",
      icon: "✉️",
      value: "davismugoikou@gmail.com",
      link: "mailto:davismugoikou@gmail.com",
      color: "#06b6d4"
    }
  ];

  return (
    <section className="kinstry-contact-methods">
      <div className="kc-methods-container">
        <div className="kc-methods-grid">
          {methods.map((method) => (
            <a
              key={method.id}
              href={method.link}
              target={method.id === 2 ? "_blank" : "_self"}
              rel={method.id === 2 ? "noopener noreferrer" : ""}
              className="kc-method-card"
            >
              <div className="kc-card-orbit">
                <div className="kc-orbit-circle"></div>
              </div>
              
              <div className="kc-card-icon" style={{ '--method-color': method.color } as React.CSSProperties}>
                <span className="kc-icon-emoji">{method.icon}</span>
                <div className="kc-icon-aura"></div>
                <div className="kc-icon-sparkles"></div>
              </div>
              
              <div className="kc-card-content">
                <h3 className="kc-card-title">{method.title}</h3>
                <p className="kc-card-description">{method.description}</p>
                
                <div className="kc-card-value">
                  <span className="kc-value-text">{method.value}</span>
                  <span className="kc-value-arrow">→</span>
                </div>
              </div>
              
              <div className="kc-card-hover-glow"></div>
              <div className="kc-card-connection-line"></div>
            </a>
          ))}
        </div>
        
        <div className="kc-methods-footer">
          <div className="kc-footer-note">
            <span className="kc-note-icon">⚡</span>
            <span className="kc-note-text">All methods are monitored continuously</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMethods;