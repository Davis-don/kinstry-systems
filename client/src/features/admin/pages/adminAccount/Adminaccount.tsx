import  { useState, useEffect } from 'react';
import Dashboard from '../../components/dashboard/Dashboard';
import Newsletter from '../../components/newsletter/Newsletter';
import Settings from '../../components/settings/Settings';
import './adminaccount.css'

// Icons with consistent styling
const DashboardIcon = () => (
  <svg className="quantum-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="1.5"/>
    <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="1.5"/>
    <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="1.5"/>
    <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="1.5"/>
  </svg>
);

const NewsletterIcon = () => (
  <svg className="quantum-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" strokeWidth="1.5"/>
    <path d="M22 6L12 13L2 6" strokeWidth="1.5"/>
  </svg>
);

const SettingsIcon = () => (
  <svg className="quantum-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="3" strokeWidth="1.5"/>
    <path d="M19.4 15C19.5 15.3 19.6 15.6 19.6 15.9C19.6 16.2 19.5 16.5 19.4 16.8C19.4 16.9 19.4 17 19.4 17.1L20.6 18.3C20.9 18.6 20.9 19.1 20.6 19.4L19.4 20.6C19.1 20.9 18.6 20.9 18.3 20.6L17.1 19.4C17 19.4 16.9 19.4 16.8 19.4C16.5 19.5 16.2 19.6 15.9 19.6C15.6 19.6 15.3 19.5 15 19.4C14.9 19.4 14.8 19.4 14.7 19.4L13.5 20.6C13.2 20.9 12.7 20.9 12.4 20.6L11.2 19.4C11.1 19.4 11 19.4 10.9 19.4C10.6 19.5 10.3 19.6 10 19.6C9.7 19.6 9.4 19.5 9.1 19.4C9 19.4 8.9 19.4 8.8 19.4L7.6 20.6C7.3 20.9 6.8 20.9 6.5 20.6L5.3 19.4C5 19.1 5 18.6 5.3 18.3L6.5 17.1C6.5 17 6.5 16.9 6.5 16.8C6.4 16.5 6.3 16.2 6.3 15.9C6.3 15.6 6.4 15.3 6.5 15C6.5 14.9 6.5 14.8 6.5 14.7L5.3 13.5C5 13.2 5 12.7 5.3 12.4L6.5 11.2C6.8 10.9 7.3 10.9 7.6 11.2L8.8 12.4C8.9 12.4 9 12.4 9.1 12.4C9.4 12.3 9.7 12.2 10 12.2C10.3 12.2 10.6 12.3 10.9 12.4C11 12.4 11.1 12.4 11.2 12.4L12.4 11.2C12.7 10.9 13.2 10.9 13.5 11.2L14.7 12.4C14.8 12.4 14.9 12.4 15 12.4C15.3 12.3 15.6 12.2 15.9 12.2C16.2 12.2 16.5 12.3 16.8 12.4C16.9 12.4 17 12.4 17.1 12.4L18.3 11.2C18.6 10.9 19.1 10.9 19.4 11.2L20.6 12.4C20.9 12.7 20.9 13.2 20.6 13.5L19.4 14.7C19.1 15 19.1 15.3 19.4 15Z" strokeWidth="1.5"/>
  </svg>
);

const LogoutIcon = () => (
  <svg className="quantum-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M9 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H9" strokeWidth="1.5"/>
    <path d="M16 17L21 12L16 7" strokeWidth="1.5"/>
    <path d="M21 12H9" strokeWidth="1.5"/>
  </svg>
);

const MenuIcon = () => (
  <svg className="quantum-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M3 12H21" strokeWidth="2" strokeLinecap="round"/>
    <path d="M3 6H21" strokeWidth="2" strokeLinecap="round"/>
    <path d="M3 18H21" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg className="quantum-close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M18 6L6 18" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 6L18 18" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const NotificationIcon = () => (
  <svg className="quantum-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" strokeWidth="1.5"/>
    <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" strokeWidth="1.5"/>
  </svg>
);

const SearchIcon = () => (
  <svg className="quantum-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="11" cy="11" r="8" strokeWidth="1.5"/>
    <path d="M21 21L16.65 16.65" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

function AdminAccount() {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, component: <Dashboard /> },
    { id: 'newsletter', label: 'Newsletter', icon: <NewsletterIcon />, component: <Newsletter /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon />, component: <Settings /> },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderActiveComponent = () => {
    const activeItem = navItems.find(item => item.id === activeComponent);
    return activeItem ? activeItem.component : <Dashboard />;
  };

  return (
    <div className="quantum-admin">
      {/* Top Navigation Bar */}
      <header className="quantum-header">
        <div className="quantum-header-content">
          <div className="quantum-header-left">
            <button 
              className="quantum-menu-button"
              onClick={toggleSidebar}
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
            <div className="quantum-brand">
              <span className="quantum-brand-primary">QUANTUM</span>
              <span className="quantum-brand-secondary">ADMIN</span>
            </div>
          </div>
          
          <div className="quantum-header-center">
            <div className="quantum-search">
              <SearchIcon />
              <input 
                type="text" 
                placeholder="Search across all systems..."
                className="quantum-search-input"
              />
            </div>
          </div>
          
          <div className="quantum-header-right">
            <button className="quantum-notification-button">
              <NotificationIcon />
              <span className="quantum-notification-badge">3</span>
            </button>
            
            <div className="quantum-user-profile">
              <div className="quantum-user-avatar">
                <span className="quantum-user-initials">AD</span>
              </div>
              <div className="quantum-user-info">
                <span className="quantum-user-name">Admin User</span>
                <span className="quantum-user-role">Super Admin</span>
              </div>
            </div>
            
            <button 
              className="quantum-logout-button"
              onClick={handleLogout}
              title="Logout"
            >
              <LogoutIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="quantum-layout">
        {/* Sidebar */}
        <aside className={`quantum-sidebar ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className="quantum-sidebar-content">
            <div className="quantum-sidebar-header">
              <h2 className="quantum-sidebar-title">NAVIGATION</h2>
            </div>
            
            <nav className="quantum-sidebar-nav">
              <ul className="quantum-nav-list">
                {navItems.map((item) => (
                  <li key={item.id} className="quantum-nav-item">
                    <button
                      className={`quantum-nav-button ${activeComponent === item.id ? 'active' : ''}`}
                      onClick={() => {
                        setActiveComponent(item.id);
                        if (isMobile) setSidebarOpen(false);
                      }}
                    >
                      <span className="quantum-nav-icon">{item.icon}</span>
                      <span className="quantum-nav-label">{item.label}</span>
                      <span className="quantum-nav-indicator"></span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="quantum-sidebar-footer">
              <div className="quantum-system-status">
                <div className="quantum-status-indicator online"></div>
                <span>System Status: <strong>OPERATIONAL</strong></span>
              </div>
              <div className="quantum-system-info">
                <div className="quantum-system-metric">
                  <span>CPU</span>
                  <div className="quantum-progress-bar">
                    <div className="quantum-progress-fill" style={{width: '65%'}}></div>
                  </div>
                </div>
                <div className="quantum-system-metric">
                  <span>Memory</span>
                  <div className="quantum-progress-bar">
                    <div className="quantum-progress-fill" style={{width: '42%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="quantum-main">
          <div className="quantum-content-wrapper">
            {/* Page Header */}
            <div className="quantum-page-header">
              <div className="quantum-page-title-section">
                <h1 className="quantum-page-title">
                  {navItems.find(item => item.id === activeComponent)?.label || 'Dashboard'}
                  <span className="quantum-page-subtitle">
                    {activeComponent === 'dashboard' && 'System Overview & Analytics'}
                    {activeComponent === 'newsletter' && 'Email Campaigns & Subscribers'}
                    {activeComponent === 'settings' && 'System Configuration & Preferences'}
                  </span>
                </h1>
                <div className="quantum-page-actions">
                  <button className="quantum-action-button">
                    <span>Export Data</span>
                  </button>
                  <button className="quantum-action-button primary">
                    <span>+ Create New</span>
                  </button>
                </div>
              </div>
              
              <div className="quantum-breadcrumb">
                <span className="quantum-breadcrumb-item">Home</span>
                <span className="quantum-breadcrumb-separator">/</span>
                <span className="quantum-breadcrumb-item active">
                  {navItems.find(item => item.id === activeComponent)?.label || 'Dashboard'}
                </span>
              </div>
            </div>

            {/* Content Container */}
            <div className="quantum-content-container">
              <div className="quantum-content-scroll">
                {renderActiveComponent()}
              </div>
            </div>

            {/* Footer */}
            <footer className="quantum-main-footer">
              <div className="quantum-footer-content">
                <div className="quantum-footer-left">
                  <span className="quantum-footer-text">
                    © 2024 Quantum Admin System v2.5.1
                  </span>
                </div>
                <div className="quantum-footer-right">
                  <span className="quantum-footer-stat">
                    <span className="quantum-stat-label">Response Time:</span>
                    <span className="quantum-stat-value">24ms</span>
                  </span>
                  <span className="quantum-footer-stat">
                    <span className="quantum-stat-label">Uptime:</span>
                    <span className="quantum-stat-value">99.9%</span>
                  </span>
                </div>
              </div>
            </footer>
          </div>
        </main>

        {/* Mobile Overlay */}
        {isMobile && sidebarOpen && (
          <div 
            className="quantum-sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default AdminAccount;