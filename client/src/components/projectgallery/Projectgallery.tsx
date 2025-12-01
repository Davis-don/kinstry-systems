import React, { useState } from 'react';
import './projectgallery.css'

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  year: number;
  status: 'Live' | 'Development' | 'Concept';
  features: string[];
  color: string;
}

const ProjectsGallery: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Quantum Finance Platform',
      category: 'Web3 & Finance',
      description: 'A decentralized finance platform with AI-powered trading algorithms and real-time market analytics.',
      technologies: ['React', 'TypeScript', 'Solidity', 'Web3.js', 'Node.js'],
      year: 2024,
      status: 'Live',
      features: ['AI Trading Algorithms', 'Cross-chain Support', 'Real-time Analytics', 'Secure Wallet Integration'],
      color: '#10b981'
    },
    {
      id: 2,
      title: 'MediCare AI Assistant',
      category: 'Healthcare & AI',
      description: 'Intelligent healthcare platform using machine learning for patient diagnostics and treatment recommendations.',
      technologies: ['Python', 'TensorFlow', 'React Native', 'GraphQL', 'AWS'],
      year: 2024,
      status: 'Development',
      features: ['ML Diagnostics', 'Patient Monitoring', 'Telemedicine', 'Health Analytics'],
      color: '#06b6d4'
    },
    {
      id: 3,
      title: 'EcoTrack Sustainability',
      category: 'IoT & Green Tech',
      description: 'IoT-powered environmental monitoring system for tracking carbon footprint and sustainability metrics.',
      technologies: ['IoT Sensors', 'React', 'Python', 'MongoDB', 'Redis'],
      year: 2023,
      status: 'Live',
      features: ['Real-time Sensors', 'Carbon Analytics', 'Sustainability Reports', 'Mobile Dashboard'],
      color: '#8b5cf6'
    },
    {
      id: 4,
      title: 'Nexus Commerce Platform',
      category: 'E-commerce',
      description: 'Next-generation e-commerce platform with AR product visualization and AI-driven recommendations.',
      technologies: ['Next.js', 'Three.js', 'Node.js', 'PostgreSQL', 'Redis'],
      year: 2024,
      status: 'Live',
      features: ['AR Visualization', 'AI Recommendations', 'Real-time Chat', 'Multi-vendor Support'],
      color: '#f59e0b'
    },
    {
      id: 5,
      title: 'UrbanFlow Smart City',
      category: 'Government Tech',
      description: 'Centralized dashboard for smart city management with real-time data visualization and IoT integration.',
      technologies: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL', 'Kubernetes'],
      year: 2024,
      status: 'Development',
      features: ['Real-time Data', 'Predictive Analytics', 'IoT Integration', 'Public API'],
      color: '#ec4899'
    },
    {
      id: 6,
      title: 'LearnSphere EdTech',
      category: 'Education',
      description: 'Interactive learning platform with adaptive algorithms and virtual classroom experience.',
      technologies: ['React', 'WebRTC', 'Node.js', 'MongoDB', 'Socket.io'],
      year: 2023,
      status: 'Live',
      features: ['Adaptive Learning', 'Virtual Classrooms', 'Progress Tracking', 'Gamification'],
      color: '#3b82f6'
    }
  ];

  const statusConfig = {
    'Live': { color: '#10b981', label: 'Live' },
    'Development': { color: '#f59e0b', label: 'In Development' },
    'Concept': { color: '#8b5cf6', label: 'Concept' }
  };

  return (
    <section className="proj-showcase-section">
      {/* Background Effects */}
      <div className="proj-showcase-bg">
        <div className="proj-bg-grid"></div>
        <div className="proj-bg-glow"></div>
      </div>

      <div className="proj-showcase-container">
        {/* Header */}
        <div className="proj-showcase-header">
          <div className="proj-header-badge">
            <div className="proj-badge-icon">🚀</div>
            <span className="proj-badge-text">Featured Projects</span>
          </div>
          
          <h2 className="proj-showcase-title">
            <span className="proj-title-primary">Project</span>
            <span className="proj-title-secondary">Showcase</span>
          </h2>
          
          <p className="proj-showcase-description">
            A curated collection of our most innovative digital solutions, 
            each crafted with precision and cutting-edge technology.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="proj-showcase-grid">
          {projects.map((project) => {
            const status = statusConfig[project.status];
            
            return (
              <div
                key={project.id}
                className="proj-showcase-card"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{ '--project-color': project.color } as React.CSSProperties}
              >
                {/* Card Background */}
                <div className="proj-card-bg"></div>
                
                {/* Year Badge */}
                <div className="proj-year-indicator">
                  <span className="proj-year-text">{project.year}</span>
                  <div className="proj-year-line"></div>
                </div>

                {/* Status Badge */}
                <div 
                  className="proj-status-indicator"
                  style={{ backgroundColor: `${status.color}15`, borderColor: status.color }}
                >
                  <div 
                    className="proj-status-glow"
                    style={{ backgroundColor: status.color }}
                  />
                  <span className="proj-status-text">{status.label}</span>
                </div>

                {/* Category */}
                <div className="proj-card-category">
                  <span className="proj-category-text">{project.category}</span>
                </div>

                {/* Title */}
                <h3 className="proj-card-title">{project.title}</h3>

                {/* Description */}
                <p className="proj-card-description">{project.description}</p>

                {/* Technologies */}
                <div className="proj-tech-container">
                  <div className="proj-tech-label">Technologies</div>
                  <div className="proj-tech-list">
                    {project.technologies.map((tech, index) => (
                      <div key={index} className="proj-tech-item">
                        <div className="proj-tech-dot"></div>
                        <span className="proj-tech-name">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="proj-features-container">
                  <div className="proj-features-label">Key Features</div>
                  <div className="proj-features-list">
                    {project.features.map((feature, index) => (
                      <div key={index} className="proj-feature-item">
                        <div className="proj-feature-check">✓</div>
                        <span className="proj-feature-text">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className={`proj-card-overlay ${hoveredProject === project.id ? 'active' : ''}`}>
                  <div className="proj-overlay-content">
                    <div className="proj-overlay-glow"></div>
                    <div className="proj-overlay-stats">
                      <div className="proj-overlay-stat">
                        <div className="proj-stat-value">{project.technologies.length}</div>
                        <div className="proj-stat-label">Technologies</div>
                      </div>
                      <div className="proj-overlay-stat">
                        <div className="proj-stat-value">{project.features.length}</div>
                        <div className="proj-stat-label">Features</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="proj-showcase-footer">
          <div className="proj-footer-content">
            <div className="proj-footer-stats">
              <div className="proj-footer-stat">
                <div className="proj-footer-number">{projects.length}</div>
                <div className="proj-footer-label">Total Projects</div>
              </div>
              <div className="proj-footer-stat">
                <div className="proj-footer-number">
                  {projects.filter(p => p.status === 'Live').length}
                </div>
                <div className="proj-footer-label">Live Projects</div>
              </div>
              <div className="proj-footer-stat">
                <div className="proj-footer-number">
                  {new Set(projects.map(p => p.category)).size}
                </div>
                <div className="proj-footer-label">Categories</div>
              </div>
              <div className="proj-footer-stat">
                <div className="proj-footer-number">
                  {projects.reduce((acc, p) => acc + p.technologies.length, 0)}
                </div>
                <div className="proj-footer-label">Technologies Used</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsGallery;