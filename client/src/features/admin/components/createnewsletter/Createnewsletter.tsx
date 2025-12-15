import './createnewsletter.css';
import React, { useState, useEffect } from 'react';
import Writeletter from "../writeletter/Writeletter";
import Propagateletter from "../propagateletter/Propagateletter";

// Icons
const CreateIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14"/>
    <circle cx="12" cy="12" r="10"/>
  </svg>
);

const PropagateIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <path d="M12 15V3"/>
    <circle cx="12" cy="3" r="1"/>
  </svg>
);

function Createnewsletter() {
  const [activeTab, setActiveTab] = useState<'create' | 'propagate'>('create');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tabs: {
    id: 'create' | 'propagate';
    label: string;
    icon: React.ReactNode;
    description: string;
    component: React.ReactNode;
  }[] = [
    { 
      id: 'create', 
      label: 'Create Newsletter', 
      icon: <CreateIcon />,
      description: 'Design and craft your newsletter content',
      component: <Writeletter /> 
    },
    { 
      id: 'propagate', 
      label: 'Propagate Newsletter', 
      icon: <PropagateIcon />,
      description: 'Schedule and send to your audience',
      component: <Propagateletter /> 
    }
  ];

  const activeComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="quantum-newsletter-creator">
      {/* Header */}
      <div className="quantum-creator-header">
        <div className="quantum-header-content">
          <h1 className="quantum-creator-title">Newsletter Console</h1>
          <p className="quantum-creator-subtitle">
            Transform ideas into impactful newsletters
          </p>
        </div>
      </div>

      {/* Futuristic Tab Switcher */}
      <div className="quantum-tab-switcher">
        <div className="quantum-tab-container">
          {/* Background Glow Effect */}
          <div className="quantum-tab-glow"></div>
          
          {/* Tab Buttons */}
          <div className="quantum-tab-buttons">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`quantum-tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="quantum-tab-icon">{tab.icon}</div>
                <div className="quantum-tab-content">
                  <span className="quantum-tab-label">{tab.label}</span>
                  {!isMobile && (
                    <span className="quantum-tab-desc">{tab.description}</span>
                  )}
                </div>
                <div className="quantum-tab-indicator">
                  <div className="quantum-indicator-dot"></div>
                </div>
              </button>
            ))}
          </div>
          
          {/* Active Tab Glow Line */}
          <div 
            className="quantum-active-glow"
            style={{
              transform: `translateX(${activeTab === 'create' ? '0' : '100%'})`,
              width: '50%'
            }}
          ></div>
        </div>
      </div>

      {/* Content Area */}
      <div className="quantum-content-area">
        <div className="quantum-content-wrapper">
          {activeComponent}
        </div>
      </div>
    </div>
  );
}

export default Createnewsletter;