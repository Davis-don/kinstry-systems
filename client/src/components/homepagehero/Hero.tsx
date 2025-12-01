import './hero.css'
import { ChevronRight, Zap, Shield, Users, TrendingUp } from 'lucide-react'

function Hero() {
  return (
    <div className="hero-container">
      {/* Background Effects */}
      <div className="hero-bg-overlay"></div>
      <div className="hero-grid-animation"></div>
      
      {/* Floating Orbs */}
      <div className="hero-orb-container">
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>
        <div className="hero-orb hero-orb-3"></div>
      </div>
      
      {/* Particles */}
      <div className="hero-particles">
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
      </div>
      
      {/* Main Content */}
      <div className="container hero-content-wrapper">
        <div className="hero-grid-layout">
          {/* Left Column - Text Content */}
          <div className="hero-text-section">
            <div className="hero-badge">
              <Zap size={16} />
              <span>Innovating Since 2020</span>
            </div>
            
            <h1 className="hero-main-heading">
              Simplify Your Digital World with
              <span className="hero-heading-accent"> Intelligent Systems</span>
            </h1>
            
            <p className="hero-subtitle">
              At <span className="hero-highlight">Kinstry Systems</span>, we transform complex challenges into elegant digital solutions. 
              Our cutting-edge systems streamline your everyday activities, boost productivity, 
              and drive meaningful growth through innovative technology.
            </p>
            
            {/* Stats Grid */}
            <div className="hero-stats-grid">
              <div className="hero-stat-item">
                <span className="stat-number">250+</span>
                <span className="stat-label">Projects Delivered</span>
              </div>
              <div className="hero-stat-item">
                <span className="stat-number">99.8%</span>
                <span className="stat-label">Satisfaction Rate</span>
              </div>
              <div className="hero-stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Team Experts</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="hero-cta-group">
              <button className="hero-primary-btn">
                Start Your Digital Journey
                <ChevronRight size={20} style={{ marginLeft: '0.5rem' }} />
              </button>
              <button className="hero-secondary-btn">
                View Our Work
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="hero-trust-section">
              <span className="trust-label">Trusted by industry leaders:</span>
              <div className="trust-badges">
                <span className="trust-badge">Enterprise Solutions</span>
                <span className="trust-badge">FinTech</span>
                <span className="trust-badge">Healthcare</span>
                <span className="trust-badge">E-commerce</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - 3D Visualization */}
          <div className="hero-visualization">
            <div className="hero-cube-container">
              <div className="cube-face cube-face-front">
                <Shield className="cube-icon" />
              </div>
              <div className="cube-face cube-face-back">
                <Users className="cube-icon" />
              </div>
              <div className="cube-face cube-face-right">
                <Zap className="cube-icon" />
              </div>
              <div className="cube-face cube-face-left">
                <TrendingUp className="cube-icon" />
              </div>
              <div className="cube-face cube-face-top">
                <div className="cube-icon">⚡</div>
              </div>
              <div className="cube-face cube-face-bottom">
                <div className="cube-icon">🔒</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </div>
  )
}

export default Hero