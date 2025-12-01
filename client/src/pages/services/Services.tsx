import React from 'react';
import ServicesIntro from '../../components/servicesintro/Servicesintro';
import ServicesList from '../../components/servicelist/Servicelist';
import ServicesCTA from '../../components/servicecta/Servicecta';
import './services.css'

const Services: React.FC = () => {
  return (
    <div className="kinstry-services-main">
      <ServicesIntro />
      <ServicesList />
      <ServicesCTA />
    </div>
  );
};

export default Services;