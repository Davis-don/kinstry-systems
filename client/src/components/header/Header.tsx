import './header.css';
import { useThemeStore } from '../../store/themestore';
import { useMobileMenuStore } from '../../store/menustore';
import { useNavigate } from 'react-router-dom';

// Hamburger Menu Icon Component
const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className={`hamburger-icon ${isOpen ? 'open' : ''}`}>
    <span className="hamburger-line"></span>
    <span className="hamburger-line"></span>
    <span className="hamburger-line"></span>
  </div>
);

// Close Icon for Mobile Sidebar
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

function Header() {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenuStore();

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'services', label: 'Services', path: '/services' },
    { id: 'contact', label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
    closeMobileMenu();
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/');
    closeMobileMenu();
  };

  return (
    <>
      {/* Main Header */}
      <header className="overall-header-container">
        <div className="overall-header-sub-container">
          {/* Creative Logo */}
          <div className="header-logo-container">
            <a href="/" className="logo-graphic" onClick={handleLogoClick}>
              <div className="logo-k-wrapper">
                <div className="logo-k-vertical"></div>
                <div className="logo-k-diagonal-1"></div>
                <div className="logo-k-diagonal-2"></div>
              </div>
              <div className="logo-text-container">
                <span className="logo-text-kinstry">KINSTRY</span>
                <div className="logo-subtitle-container">
                  <div className="logo-dot"></div>
                  <span className="logo-text-systems">SYSTEMS</span>
                </div>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="desktop-navigation-links">
            <ul>
              {navItems.map((item) => (
                <li key={item.id} className="nav-item">
                  <a 
                    href={item.path} 
                    onClick={(e) => handleNavClick(e, item.path)}
                    className="nav-link"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Side Controls */}
          <div className="header-controls">
            {/* Theme Toggle */}
            <div className="theme-toggle-container">
              <button 
                className="theme-toggle-btn" 
                onClick={toggleTheme}
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? (
                  // Moon Icon (Dark Mode)
                  <div className="moon-icon">
                    <div className="moon-body">
                      <div className="moon-crater moon-crater-1"></div>
                      <div className="moon-crater moon-crater-2"></div>
                      <div className="moon-crater moon-crater-3"></div>
                    </div>
                    <div className="moon-star moon-star-1"></div>
                    <div className="moon-star moon-star-2"></div>
                    <div className="moon-star moon-star-3"></div>
                  </div>
                ) : (
                  // Sun Icon (Light Mode)
                  <div className="sun-icon">
                    <div className="sun-center"></div>
                    <div className="sun-ray sun-ray-1"></div>
                    <div className="sun-ray sun-ray-2"></div>
                    <div className="sun-ray sun-ray-3"></div>
                    <div className="sun-ray sun-ray-4"></div>
                    <div className="sun-ray sun-ray-5"></div>
                    <div className="sun-ray sun-ray-6"></div>
                    <div className="sun-ray sun-ray-7"></div>
                    <div className="sun-ray sun-ray-8"></div>
                  </div>
                )}
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button 
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <HamburgerIcon isOpen={isMobileMenuOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div className={`mobile-sidebar-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
        {/* Backdrop */}
        <div 
          className="mobile-sidebar-backdrop"
          onClick={closeMobileMenu}
        ></div>

        {/* Sidebar Content */}
        <aside className="mobile-sidebar-content" aria-label="Mobile navigation menu">
          {/* Sidebar Header */}
          <div className="mobile-sidebar-header">
            <div className="mobile-sidebar-logo">
              <a href="/" className="logo-graphic" onClick={handleLogoClick}>
                <div className="logo-k-wrapper">
                  <div className="logo-k-vertical"></div>
                  <div className="logo-k-diagonal-1"></div>
                  <div className="logo-k-diagonal-2"></div>
                </div>
                <div className="logo-text-container">
                  <span className="logo-text-kinstry">KINSTRY</span>
                  <div className="logo-subtitle-container">
                    <div className="logo-dot"></div>
                    <span className="logo-text-systems">SYSTEMS</span>
                  </div>
                </div>
              </a>
            </div>
            <button 
              className="mobile-sidebar-close"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mobile-sidebar-nav">
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a 
                    href={item.path}
                    className="mobile-nav-item"
                    onClick={(e) => handleNavClick(e, item.path)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar Footer with Theme Toggle */}
          <div className="mobile-sidebar-footer">
            <div className="mobile-theme-toggle">
              <span className="theme-toggle-label">
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </span>
              <button 
                className="mobile-theme-toggle-btn"
                onClick={() => {
                  toggleTheme();
                  closeMobileMenu();
                }}
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? (
                  <div className="moon-icon">
                    <div className="moon-body">
                      <div className="moon-crater moon-crater-1"></div>
                      <div className="moon-crater moon-crater-2"></div>
                      <div className="moon-crater moon-crater-3"></div>
                    </div>
                  </div>
                ) : (
                  <div className="sun-icon">
                    <div className="sun-center"></div>
                    <div className="sun-ray sun-ray-1"></div>
                    <div className="sun-ray sun-ray-2"></div>
                    <div className="sun-ray sun-ray-3"></div>
                    <div className="sun-ray sun-ray-4"></div>
                  </div>
                )}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default Header;