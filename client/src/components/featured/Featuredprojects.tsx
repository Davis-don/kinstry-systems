import './featuredprojects.css'
import { useNavigate } from 'react-router-dom'
import frbaldo from '../../assets/images/fr-baldo.jpg'
import agriconnect from '../../assets/images/agri-tech.jpg'
import jungletravel from '../../assets/images/jungle-hearts.jpg'
import edutech from '../../assets/images/masomo.jpg'
import { 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  Star,
  Globe,
  Sparkles,
  ArrowRight,
  Cpu,
  Palette,
  Plane,
} from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import type { MouseEvent } from 'react'

// Define TypeScript interfaces
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  status: 'live' | 'dev';
  techStack: string[];
  features: string[];
  icon: React.ReactNode;
}

interface ProjectStatusBubbleProps {
  status: 'live' | 'dev';
  title: string;
}

interface CarouselDotProps {
  index: number;
  isActive: boolean;
  onClick: (index: number) => void;
}

function ProjectStatusBubble({ status, title }: ProjectStatusBubbleProps) {
  return (
    <div className={`status-bubble ${status === 'live' ? 'status-live-bubble' : 'status-dev-bubble'}`} 
      title={title}
    />
  );
}

function CarouselDot({ index, isActive, onClick }: CarouselDotProps) {
  return (
    <button
      className={`carousel-dot ${isActive ? 'active' : ''}`}
      onClick={() => onClick(index)}
      aria-label={`Go to project ${index + 1}`}
    />
  );
}

function Featuredprojects() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [touchStartX, setTouchStartX] = useState<number>(0);
  const [touchEndX, setTouchEndX] = useState<number>(0);

  const projects: Project[] = [
    {
      id: 1,
      title: "FR Baldo Integrated Secondary School",
      description: "Advanced school management system handling media, student data, and administrative tasks with modern interface and robust features.",
      image: frbaldo,
      url: "https://www.frbaldointegrated.co.ke/",
      status: "live",
      techStack: ["React", "Node.js", "Postgres", "Cloud", "API"],
      features: ["Media Management", "Student Portal", "Admin Dashboard", "Reports", "Mobile Friendly"],
      icon: <Cpu size={24} />
    },
    {
      id: 2,
      title: "AgriConnect AI",
      description: "Intelligent farm management platform using AI to optimize agriculture, predict yields, and monitor crops with real-time analytics.",
      image: agriconnect,
      url: "https://agri-connect-client.onrender.com/",
      status: "dev",
      techStack: ["React", "Python", "AI/ML", "PostgreSQL", "WebSocket"],
      features: ["AI Analysis", "Crop Monitoring", "Weather Data", "Yield Prediction", "Mobile App"],
      icon: <Sparkles size={24} />
    },
    {
      id: 3,
      title: "JungleHearts Travel",
      description: "Complete travel management system with booking, itinerary planning, and customer management for adventure tourism companies.",
      image: jungletravel,
      url: "https://www.jungleheartstravel.co.ke/",
      status: "live",
      techStack: ["React", "Express", "MySQL", "Stripe", "Maps"],
      features: ["Booking System", "Itinerary Planner", "Payment Gateway", "CRM", "Tour Management"],
      icon: <Plane size={24} />
    },
    {
      id: 4,
      title: "EduTech Platform",
      description: "Interactive learning platform with virtual classrooms, progress tracking, and AI-powered personalized learning paths.",
      image: edutech,
      url: "https://masomo-analytics-client.onrender.com/",
      status: "dev",
      techStack: ["React", "Node.js", "Socket.io", "AWS", "AI"],
      features: ["Virtual Classes", "Progress Tracking", "AI Tutor", "Interactive Content", "Mobile Learning"],
      icon: <Palette size={24} />
    }
  ];

  const scrollToIndex = (index: number): void => {
    if (carouselRef.current) {
      const cardElement = carouselRef.current.children[0] as HTMLElement;
      const cardWidth = cardElement?.offsetWidth || 320;
      const gap = 32;
      const scrollPosition = (cardWidth + gap) * index;
      
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      
      setCurrentIndex(index);
      setIsAutoPlaying(false);
      
      // Resume auto-play after 5 seconds
      setTimeout(() => setIsAutoPlaying(true), 5000);
    }
  };

  const nextSlide = (): void => {
    const nextIndex = (currentIndex + 1) % projects.length;
    scrollToIndex(nextIndex);
  };

  const prevSlide = (): void => {
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    scrollToIndex(prevIndex);
  };

  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent): void => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent): void => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (): void => {
    if (!touchStartX || !touchEndX) return;
    
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      nextSlide();
    }
    
    if (isRightSwipe) {
      prevSlide();
    }
  };

  // Auto-play effect
useEffect(() => {
  let interval: number; // <--- use number for browser

  if (isAutoPlaying) {
    interval = window.setInterval(() => {
      nextSlide();
    }, 5000);
  }

  return () => {
    clearInterval(interval);
  };
}, [isAutoPlaying, currentIndex]);


  // Initial auto-scroll
  useEffect(() => {
    const timeout = setTimeout(() => {
      nextSlide();
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      scrollToIndex(currentIndex);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex]);

  const handleMouseEnter = (): void => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = (): void => {
    setIsAutoPlaying(true);
  };

  const handlePrevClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    prevSlide();
  };

  const handleNextClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    nextSlide();
  };
  const navigate = useNavigate();

  return (
    <section className="futuristic-projects-showcase" id="projects-showcase">
      {/* Background Layers */}
      <div className="projects-showcase-bg"></div>
      <div className="projects-binary-animation"></div>
      <div className="projects-floating-elements">
        <div className="floating-element float-element-1"></div>
        <div className="floating-element float-element-2"></div>
        <div className="floating-element float-element-3"></div>
      </div>

      {/* Section Header */}
      <div className="container projects-header-container">
        <div className="projects-header-tag">
          <Star size={16} />
          <span>Innovation Portfolio</span>
        </div>
        
        <h2 className="projects-main-heading">
          Projects That Define Excellence
        </h2>
        
        <p className="projects-heading-subtext">
          Discover our cutting-edge solutions that transform industries 
          and create exceptional digital experiences through innovation.
        </p>
      </div>

      {/* Carousel Container */}
      <div className="projects-carousel-container">
        {/* Carousel Track */}
        <div 
          className="projects-carousel-track"
          ref={carouselRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {projects.map((project) => (
            <div key={project.id} className="futuristic-project-card">
              <div className="project-card-inner">
                {/* Front of Card */}
                <div className="project-card-front">
                  {/* Status Indicator */}
                  <div className="project-status-indicator">
                    <ProjectStatusBubble 
                      status={project.status} 
                      title={project.status === 'live' ? 'Live Project' : 'In Development'} 
                    />
                  </div>

                  {/* Project Image */}
                  <div className="project-image-container">
                    <div className="project-image-overlay"></div>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="project-main-image"
                      loading="lazy"
                      width="100%"
                      height="100%"
                    />
                  </div>

                  {/* Project Content */}
                  <div className="project-content-area">
                    {/* Tech Stack */}
                    <div className="project-badge-container">
                      {project.techStack.map((tech, idx) => (
                        <span key={idx} className="project-tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="project-title-main">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="project-description-main">
                      {project.description}
                    </p>

                    {/* Feature Dots */}
                    <div className="project-feature-dots">
                      {project.features.slice(0, 5).map((_, idx) => (
                        <div key={idx} className="feature-dot-item"></div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="project-action-buttons">
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-visit-btn"
                      >
                        <ExternalLink size={18} />
                        Visit
                      </a>
                      
                      {/* <a 
                        href={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="project-details-btn"
                      >
                        <Eye size={18} />
                        Details
                      </a> */}
                    </div>
                  </div>
                </div>

                {/* Back of Card (3D Flip) */}
                <div className="project-card-back">
                  <div className="card-back-content">
                    {project.icon}
                    <h4 className="card-back-title">
                      {project.title}
                    </h4>
                    <p className="card-back-description">
                      Click to explore this innovative solution
                    </p>
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="card-back-btn"
                    >
                      <ArrowRight size={18} />
                      Explore Project
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation */}
        <div className="carousel-navigation">
          <button 
            className="carousel-nav-btn"
            onClick={handlePrevClick}
            aria-label="Previous project"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            className="carousel-nav-btn"
            onClick={handleNextClick}
            aria-label="Next project"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Carousel Dots */}
        <div className="carousel-dots-container">
          {projects.map((_, index) => (
            <CarouselDot
              key={index}
              index={index}
              isActive={index === currentIndex}
              onClick={scrollToIndex}
            />
          ))}
        </div>
      </div>

      {/* View All Projects */}
      <div className="container view-all-projects-container">
        <div className="view-all-content-area">
          <h3 className="view-all-heading">
            Want to See More Amazing Work?
          </h3>
          
          <p className="view-all-text">
            Explore our complete portfolio of innovative projects across various 
            industries. Each solution showcases our commitment to excellence 
            and cutting-edge technology.
          </p>
          
          <a onClick={()=>navigate("/projects")} className="view-all-button">
            <Globe size={20} />
            View Complete Portfolio
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Featuredprojects;