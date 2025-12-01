import React from 'react';
import './servicelist.css'

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  gradient: string;
}

const ServicesList: React.FC = () => {
  const services: ServiceItem[] = [
    {
      id: 1,
      title: "Web Development",
      description: "Modern, responsive web applications with cutting-edge frameworks",
      icon: "🌐",
      features: ["React/Next.js", "TypeScript", "PWA", "SEO Optimized"],
      gradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)"
    },
    {
      id: 2,
      title: "System Development",
      description: "Scalable backend systems and enterprise solutions",
      icon: "⚙️",
      features: ["Microservices", "API Design", "Database Architecture", "DevOps"],
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)"
    },
    {
      id: 3,
      title: "AI & Automation",
      description: "Intelligent automation and machine learning solutions",
      icon: "🤖",
      features: ["Machine Learning", "Chatbots", "Process Automation", "Data Analysis"],
      gradient: "linear-gradient(135deg, #f59e0b 0%, #10b981 100%)"
    },
    {
      id: 4,
      title: "UI/UX Design",
      description: "User-centric interfaces with exceptional experiences",
      icon: "🎨",
      features: ["User Research", "Prototyping", "Design Systems", "Accessibility"],
      gradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)"
    },
    {
      id: 5,
      title: "Maintenance & Support",
      description: "Ongoing support and optimization for existing systems",
      icon: "🔧",
      features: ["Performance Monitoring", "Security Updates", "Bug Fixes", "Scaling"],
      gradient: "linear-gradient(135deg, #06b6d4 0%, #10b981 100%)"
    }
  ];

  return (
    <section className="kinstry-services-grid">
      <div className="ks-grid-background">
        <div className="ks-grid-lines"></div>
        <div className="ks-grid-glow"></div>
      </div>
      
      <div className="ks-grid-container">
        <div className="ks-grid-header">
          <h2 className="ks-grid-title">
            <span className="ks-grid-title-text">Core Services</span>
            <span className="ks-grid-title-underline"></span>
          </h2>
          <p className="ks-grid-subtitle">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </div>
        
        <div className="ks-grid-items">
          {services.map((service) => (
            <div key={service.id} className="ks-service-card">
              <div className="ks-card-border"></div>
              
              <div className="ks-card-icon" style={{ background: service.gradient }}>
                <span className="ks-icon-emoji">{service.icon}</span>
                <div className="ks-icon-halo"></div>
              </div>
              
              <div className="ks-card-content">
                <h3 className="ks-card-title">{service.title}</h3>
                <p className="ks-card-description">{service.description}</p>
                
                <div className="ks-card-features">
                  {service.features.map((feature, index) => (
                    <span key={index} className="ks-feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="ks-card-hover-effect"></div>
              <div className="ks-card-connection-dots"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;