import './whyus.css'
import { 
  Zap, 
  Shield, 
  Users, 
  TrendingUp, 
  Clock,
  Award,
  CheckCircle,
  ArrowRight,
  Star,
  Rocket,
  MessageSquare
} from 'lucide-react'
import { useState, useEffect } from 'react'

function Whychoseus() {
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    satisfaction: 0,
    experience: 0
  })

  const targetCounters = {
    projects: 250,
    clients: 150,
    satisfaction: 98,
    experience: 5
  }

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps
    
    const animateCounter = (key: keyof typeof counters, target: number) => {
      let current = 0
      const increment = target / steps
      const interval = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(interval)
        }
        setCounters(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }))
      }, stepDuration)
      
      return interval
    }

    const intervals = Object.entries(targetCounters).map(([key, target]) => 
      animateCounter(key as keyof typeof counters, target)
    )

    return () => intervals.forEach(clearInterval)
  }, [])

  const features = [
    {
      icon: <Zap size={24} />,
      title: "Cutting-Edge Technology",
      description: "We leverage the latest technologies and frameworks to build solutions that are not just current, but future-proof."
    },
    {
      icon: <Shield size={24} />,
      title: "Enterprise-Grade Security",
      description: "Your data security is our priority. We implement industry-best security practices and protocols."
    },
    {
      icon: <Users size={24} />,
      title: "Client-Centric Approach",
      description: "We work as your strategic partner, understanding your business needs and delivering solutions that drive growth."
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Scalable Solutions",
      description: "Our systems are designed to grow with your business, ensuring long-term value and flexibility."
    },
    {
      icon: <Clock size={24} />,
      title: "On-Time Delivery",
      description: "We respect deadlines and deliver projects on schedule without compromising quality."
    },
    {
      icon: <Award size={24} />,
      title: "Award-Winning Quality",
      description: "Our commitment to excellence has been recognized through various industry accolades."
    }
  ]

  const processSteps = [
    {
      number: 1,
      title: "Discovery & Consultation",
      description: "We begin by deeply understanding your business goals, challenges, and requirements."
    },
    {
      number: 2,
      title: "Strategy & Planning",
      description: "Our experts create a detailed roadmap with clear milestones and deliverables."
    },
    {
      number: 3,
      title: "Design & Development",
      description: "We craft beautiful, functional solutions using agile development methodologies."
    },
    {
      number: 4,
      title: "Testing & Quality Assurance",
      description: "Rigorous testing ensures your solution is bug-free and performs optimally."
    },
    {
      number: 5,
      title: "Deployment & Support",
      description: "We handle smooth deployment and provide ongoing support for continuous success."
    }
  ]

  const trustIndicators = [
    "Enterprise Solutions",
    "Startup Specialists",
    "Government Projects",
    "Financial Sector",
    "Healthcare Industry",
    "Education Sector",
    "E-commerce Experts",
    "FinTech Partners"
  ]

  return (
    <section className="kinstry-why-choose-section" id="why-choose-us">
      {/* Background Elements */}
      <div className="whyus-bg-abstract"></div>
      <div className="whyus-tech-elements">
        <div className="tech-element tech-element-1"></div>
        <div className="tech-element tech-element-2"></div>
        <div className="tech-element tech-element-3"></div>
      </div>

      {/* Section Header */}
      <div className="container whyus-header-wrapper">
        <div className="whyus-tagline">
          <Star size={16} />
          <span>The Kinstry Advantage</span>
        </div>
        
        <h2 className="whyus-main-title">
          Why <span className="whyus-title-accent">Choose Kinstry</span> Systems?
        </h2>
        
        <p className="whyus-subtitle">
          We don't just build software - we create digital experiences that transform 
          businesses, drive growth, and deliver measurable results.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="container whyus-content-grid">
        {/* Left Column - Stats & Trust */}
        <div className="whyus-counter-column">
          {/* Statistics Counter */}
          <div className="counter-grid">
            <div className="counter-item">
              <div className="counter-number">
                {counters.projects}+
              </div>
              <div className="counter-label">
                Successful Projects
              </div>
            </div>
            
            <div className="counter-item">
              <div className="counter-number">
                {counters.clients}+
              </div>
              <div className="counter-label">
                Happy Clients
              </div>
            </div>
            
            <div className="counter-item">
              <div className="counter-number">
                {counters.satisfaction}%
              </div>
              <div className="counter-label">
                Client Satisfaction
              </div>
            </div>
            
            <div className="counter-item">
              <div className="counter-number">
                {counters.experience}+
              </div>
              <div className="counter-label">
                Years Experience
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="trust-indicators">
            <h3 className="trust-title">
              Trusted by Industry Leaders
            </h3>
            <div className="trust-logos">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="trust-logo-item">
                  {indicator}
                </div>
              ))}
            </div>
          </div>

          {/* Process Timeline */}
          <div className="whyus-process">
            <h3 className="process-title">
              Our Proven Process
            </h3>
            <div className="process-steps">
              {processSteps.map((step) => (
                <div key={step.number} className="process-step">
                  <div className="step-number">
                    {step.number}
                  </div>
                  <div className="step-content">
                    <h4 className="step-title">
                      {step.title}
                    </h4>
                    <p className="step-description">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Features */}
        <div className="whyus-features-column">
          <div className="feature-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">
                    {feature.title}
                  </h3>
                  <p className="feature-description">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Value Proposition */}
          <div className="counter-item">
            <div className="counter-number">
              360°
            </div>
            <div className="counter-label">
              Comprehensive Solutions from Strategy to Support
            </div>
          </div>

          {/* Key Benefits List */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon">
                <CheckCircle size={24} />
              </div>
            </div>
            <div className="feature-content">
              <h3 className="feature-title">
                What You Get
              </h3>
              <ul className="feature-description" style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--accent-green)" />
                  <span>Dedicated Project Manager</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--accent-green)" />
                  <span>Regular Progress Updates</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--accent-green)" />
                  <span>Post-Launch Support & Maintenance</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--accent-green)" />
                  <span>Performance Optimization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container whyus-cta-section">
        <h3 className="cta-title">
          Ready to Transform Your Digital Presence?
        </h3>
        
        <p className="cta-subtitle">
          Join hundreds of satisfied clients who have achieved remarkable results 
          with our expert guidance and innovative solutions.
        </p>
        
        <div className="cta-button-group">
          <a href="/contact" className="cta-primary-btn">
            <Rocket size={20} />
            Start Your Project Today
            <ArrowRight size={20} />
          </a>
          
          <a href="/contact" className="cta-secondary-btn">
            <MessageSquare size={20} />
            Schedule Free Consultation
          </a>
        </div>
      </div>
    </section>
  )
}

export default Whychoseus