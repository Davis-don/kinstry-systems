import React from 'react';
import ProjectsIntro from '../../components/projectintro/Projectintro';
import ProjectsGallery from '../../components/projectgallery/Projectgallery';
import './project.css'

const ProjectsPage: React.FC = () => {
  return (
    <div className="projects-page">
      <ProjectsIntro />
      <ProjectsGallery />
    </div>
  );
};

export default ProjectsPage;