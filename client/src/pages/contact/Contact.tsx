import React from 'react';
import ContactHeader from '../../components/contactheader/Contactheader';
import ContactMethods from '../../components/contactmethods/Contactmethods';
import ContactCTA from '../../components/contactcts/Contactcta';
import './contact.css'

const Contact: React.FC = () => {
  return (
    <div className="kinstry-contact-main">
      <div className="kc-background-canvas">
        <div className="kc-bg-grid"></div>
        <div className="kc-bg-glow"></div>
        <div className="kc-floating-particles"></div>
      </div>
      
      <ContactHeader />
      <ContactMethods />
      <ContactCTA />
    </div>
  );
};

export default Contact;