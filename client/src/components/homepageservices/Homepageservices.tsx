import './homepageservices.css'
import { 
  Palette, 
  Users, 
  Briefcase, 
  Cpu, 
  ChevronRight, 
  Check,
  Zap,
  TrendingUp,
  Sparkles
} from 'lucide-react'

function Homepageservices() {
  const services = [
    {
      id: 1,
      title: "UI/UX Design",
      icon: <Palette />,
      description: "Craft intuitive and engaging user experiences that blend aesthetics with functionality. We design interfaces that users love to interact with.",
      features: [
        "User Research & Analysis",
        "Wireframing & Prototyping",
        "Interactive Design Systems",
        "Usability Testing",
        "Design Handoff"
      ],
      ctaText: "View Design Portfolio",
      ctaLink: "/projects"
    },
    {
      id: 2,
      title: "Strategic Consultation",
      icon: <Users />,
      description: "Expert guidance to align your technology with business goals. We help you make informed decisions for digital transformation.",
      features: [
        "Digital Strategy Planning",
        "Technology Assessment",
        "Roadmap Development",
        "Process Optimization",
        "ROI Analysis"
      ],
      ctaText: "Schedule Consultation",
      ctaLink: "/contact",
      highlight: true
    },
    {
      id: 3,
      title: "Portfolio Systems",
      icon: <Briefcase />,
      description: "Showcase your work with sophisticated portfolio systems that tell your story and highlight your achievements effectively.",
      features: [
        "Custom Portfolio Design",
        "Content Management",
        "Case Studies Integration",
        "Analytics Dashboard",
        "Mobile Optimization"
      ],
      ctaText: "See Portfolio Examples",
      ctaLink: "/projects"
    },
    {
      id: 4,
      title: "Full Systems Development",
      icon: <Cpu />,
      description: "End-to-end development of robust, scalable systems that streamline operations and drive business growth.",
      features: [
        "Custom Software Development",
        "System Architecture",
        "API Integration",
        "Cloud Deployment",
        "Maintenance & Support"
      ],
      ctaText: "Explore Our Solutions",
      ctaLink: "/projects"
    },
    {
      id: 5,
      title: "AI Integration",
      icon: <Sparkles />,
      description: "Leverage artificial intelligence to automate processes, gain insights, and create intelligent business solutions.",
      features: [
        "Machine Learning Models",
        "Natural Language Processing",
        "Predictive Analytics",
        "Chatbot Development",
        "AI Strategy"
      ],
      ctaText: "Discover AI Solutions",
      ctaLink: "/projects"
    },
    {
      id: 6,
      title: "SEO & Digital Marketing",
      icon: <TrendingUp />,
      description: "Boost your online visibility and drive targeted traffic with data-driven SEO and marketing strategies.",
      features: [
        "Technical SEO Audit",
        "Content Strategy",
        "Keyword Research",
        "Performance Analytics",
        "Conversion Optimization"
      ],
      ctaText: "Get SEO Analysis",
      ctaLink: "/projects"
    }
  ]

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" },
    { number: "50+", label: "Expert Team Members" }
  ]

  return (
    <div className="overall-homepage-services">
      <section className="kinstry-services-section" id="services">
        {/* Background Effects */}
        <div className="services-bg-grid"></div>
        <div className="services-orbs-container">
          <div className="services-orb orb-1"></div>
          <div className="services-orb orb-2"></div>
        </div>

        {/* Section Header */}
        <div className="container services-header-container">
          <div className="services-tagline">
            <Zap size={16} />
            <span>Our Core Expertise</span>
          </div>
          
          <h2 className="services-main-title">
            Digital Solutions That Drive Success
          </h2>
          
          <p className="services-subtitle">
            We transform complex challenges into elegant digital solutions. 
            Each service is designed to help you achieve measurable results 
            and stay ahead in the digital landscape.
          </p>
        </div>

        {/* Services Grid */}
        <div className="container services-grid-wrapper">
          <div className="services-grid-container">
            {services.map((service) => (
              <div 
                key={service.id} 
                className={`service-card-item ${service.highlight ? 'service-card-highlight' : ''}`}
              >
                {service.highlight && (
                  <div className="highlight-badge">
                    Most Popular
                  </div>
                )}
                
                {/* Card Number */}
                <div className="card-number-badge">
                  {service.id}
                </div>
                
                {/* Icon */}
                <div className="service-icon-container">
                  <div className="service-icon">
                    {service.icon}
                  </div>
                </div>
                
                {/* Content */}
                <div className="service-content-wrapper">
                  <h3 className="service-title">
                    {service.title}
                  </h3>
                  
                  <p className="service-description">
                    {service.description}
                  </p>
                  
                  {/* Features List */}
                  <ul className="service-features-list">
                    {service.features.map((feature, index) => (
                      <li key={index} className="service-feature-item">
                        <div className="feature-check">
                          <Check size={12} />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA Button */}
                  <a href={service.ctaLink} className="service-cta-btn">
                    {service.ctaText}
                    <ChevronRight className="cta-arrow" size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="container services-stats-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="container services-cta-banner">
          <h3 className="cta-banner-title">
            Ready to Transform Your Digital Presence?
          </h3>
          
          <p className="cta-banner-subtitle">
            Let's discuss how our expertise can help you achieve your goals. 
            We're here to guide you every step of the way.
          </p>
          
          <a href="/contact" className="cta-banner-btn">
            Start Your Project Today
            <ChevronRight size={20} />
          </a>
        </div>
      </section>
    </div>
  )
}

export default Homepageservices