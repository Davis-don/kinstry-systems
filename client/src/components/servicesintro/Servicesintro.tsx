import './servicesintro.css'

const ServicesIntro: React.FC = () => {
  return (
    <section className="kinstry-services-intro">
      <div className="ks-intro-wrapper">
        {/* Animated Background Elements */}
        <div className="ks-bg-orbital-ring"></div>
        <div className="ks-bg-particles"></div>
        
        {/* Content */}
        <div className="ks-intro-container">
          <div className="ks-badge-pulse">
            <span className="ks-badge-icon">⚡</span>
            <span className="ks-badge-text">Premium Solutions</span>
          </div>
          
          <h1 className="ks-title-holographic">
            <span className="ks-title-primary" data-text="What We Offer">What We Offer</span>
            <span className="ks-title-aura"></span>
          </h1>
          
          <div className="ks-description-wrapper">
            <p className="ks-description-main">
              We deliver cutting-edge digital solutions that transform ideas into 
              <span className="ks-highlight-spark"> scalable, efficient, and innovative</span> 
              products for the modern era.
            </p>
            
            <div className="ks-tech-stack">
              <span className="ks-tech-tag">Web3 Ready</span>
              <span className="ks-tech-tag">AI-Enhanced</span>
              <span className="ks-tech-tag">Cloud-Native</span>
              <span className="ks-tech-tag">Cross-Platform</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesIntro;