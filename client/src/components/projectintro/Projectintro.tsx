import React from 'react';
import './projectintro.css'

const ProjectsIntro: React.FC = () => {
  const stats = [
    { value: '50+', label: 'Projects Completed' },
    { value: '100%', label: 'Success Rate' },
    { value: '∞', label: 'Innovation' },
    { value: '24/7', label: 'Dedication' }
  ];

  return (
    <section className="proj-intro-section">
      {/* Background Elements */}
      <div className="proj-intro-bg">
        <div className="proj-grid-lines"></div>
        <div className="proj-glow-effect"></div>
        <div className="proj-title-glow"></div>
      </div>

      <div className="proj-intro-container">
        {/* Badge */}
        <div className="proj-intro-badge">
          <div className="proj-badge-dot"></div>
          <span className="proj-badge-text">Portfolio Gallery</span>
        </div>

        {/* Main Title - FIXED VISIBILITY */}
        <h1 className="proj-main-title">
          <div className="proj-title-container">
            <span className="proj-title-line proj-line-1">
              <span className="proj-title-word">Where</span>
            </span>
            <span className="proj-title-line proj-line-2">
              <span className="proj-title-highlight">
                Ideas
                {/* <span className="proj-title-spark">✨</span> */}
              </span>
            </span>
            <span className="proj-title-line proj-line-3">
              <span className="proj-title-word">Meet</span>
              <span className="proj-title-innovation">
                Innovation
                <span className="proj-innovation-glow"></span>
              </span>
            </span>
          </div>
        </h1>

        {/* Description */}
        <div className="proj-intro-description">
          <p className="proj-description-text">
            A curated collection of digital masterpieces that showcase our commitment 
            to excellence, innovation, and cutting-edge technology solutions.
          </p>
        </div>

        {/* Stats */}
        <div className="proj-intro-stats">
          {stats.map((stat, index) => (
            <div key={index} className="proj-stat-item">
              <div className="proj-stat-value" data-value={stat.value}>
                {stat.value}
              </div>
              <div className="proj-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="proj-scroll-indicator">
          <div className="proj-scroll-line"></div>
          <span className="proj-scroll-text">Explore Projects</span>
        </div>
      </div>
    </section>
  );
};

export default ProjectsIntro;