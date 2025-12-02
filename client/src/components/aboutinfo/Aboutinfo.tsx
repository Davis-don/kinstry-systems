import './aboutinfo.css';
import { 
  Sparkles, 
  Target, 
  Users, 
  Zap, 
  TrendingUp,
  ArrowRight,
  Heart,
  Globe,
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Aboutinfo() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/contact');
  };

  return (
    <section className="kinstry-about-story">
      {/* Background Elements */}
      <div className="about-bg-abstract"></div>
      
      {/* Animated Grid */}
      <div className="about-tech-grid"></div>

      {/* Content Container */}
      <div className="about-content-wrapper">
        {/* Header Section */}
        <div className="about-header-section">
          <div className="about-story-tag">
            <Sparkles size={16} />
            <span>Our Journey</span>
          </div>
          
          <h1 className="about-main-title">
            From Vision to <span className="about-title-accent">Innovation</span>
          </h1>
          
          <p className="about-intro-text">
            Born from a passion for simplifying complexity through intelligent technology
          </p>
        </div>

        {/* Hero Story */}
        <div className="about-hero-story">
          <div className="story-year-badge">
            <div className="year-number">2020</div>
            <div className="year-label">Founded</div>
          </div>
          
          <div className="story-content">
            <h2 className="story-title">
              The Genesis of Kinstry Systems
            </h2>
            
            <div className="story-paragraphs">
              <p className="story-text">
                Kinstry Systems began with a simple yet powerful vision: to transform 
                everyday activities through intelligent automation. Our founders, 
                frustrated by inefficient systems in education, agriculture, and business 
                operations, envisioned a future where AI could simplify complex processes.
              </p>
              
       <p className="story-text">
  We started by developing our first AI-powered farm management system, 
  <span className="story-highlight"> AgriAI Platform</span>, which automated crop monitoring, 
  resource allocation, and supply chain communication. This success showed us the immense 
  potential of intelligent systems to transform industries.
</p>
              
              <p className="story-text">
                Today, we're pioneering <span className="story-highlight">AI-driven solutions</span> that go beyond 
                automation to create intelligent, predictive systems. From smart farm 
                management to personalized learning platforms, we're building the 
                digital infrastructure for tomorrow.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mission-vision-grid">
          <div className="mission-card">
            <div className="card-icon-wrapper">
              <Target size={28} />
            </div>
            <h3 className="card-title">Our Mission</h3>
            <p className="card-description">
              To simplify complex systems through intelligent technology, 
              making advanced AI solutions accessible to businesses of all sizes.
            </p>
          </div>
          
          <div className="vision-card">
            <div className="card-icon-wrapper">
              <Globe size={28} />
            </div>
            <h3 className="card-title">Our Vision</h3>
            <p className="card-description">
              A world where every organization leverages intelligent systems 
              to optimize operations, enhance experiences, and drive innovation.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="values-section">
          <h2 className="values-title">What Defines Us</h2>
          <p className="values-subtitle">
            Three principles that guide every project we undertake
          </p>
          
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">
                <Zap size={24} />
              </div>
              <h3 className="value-title">Intelligent Innovation</h3>
              <p className="value-description">
                We don't just follow trends—we create them. Our focus is on 
                AI-driven solutions that anticipate needs before they arise.
              </p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <Shield size={24} />
              </div>
              <h3 className="value-title">Uncompromising Quality</h3>
              <p className="value-description">
                Every line of code, every design element, every feature is 
                crafted with precision and attention to detail.
              </p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <Users size={24} />
              </div>
              <h3 className="value-title">Client Partnership</h3>
              <p className="value-description">
                We work alongside our clients, not just for them. Your success 
                is our success, and we're committed to your growth.
              </p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="achievements-section">
          <div className="achievement-stats">
            <div className="stat-item">
              <div className="stat-number">4+</div>
              <div className="stat-label">Years Innovating</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">250+</div>
              <div className="stat-label">Projects Delivered</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">AI Features Implemented</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Future Focus */}
        <div className="future-section">
          <div className="future-icon">
            <TrendingUp size={32} />
          </div>
          <h2 className="future-title">Looking Ahead</h2>
          <p className="future-text">
            We're expanding our AI capabilities to include predictive analytics, 
            natural language processing, and machine learning models that adapt 
            and learn. The future is intelligent, and we're building it today.
          </p>
        </div>

        {/* CTA Section */}
        <div className="about-cta-section">
          <h3 className="cta-title">Ready to Simplify Your World?</h3>
          <p className="cta-subtitle">
            Let's explore how intelligent systems can transform your operations.
          </p>
          <button className="about-cta-button" onClick={handleContactClick}>
            <Heart size={20} />
            Start Your AI Journey
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Aboutinfo;