import './header.css';
import { useThemeStore } from '../../store/themestore';
import { useMobileMenuStore } from '../../store/menustore';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../components/logo/Logocomponent';

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
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isDarkMode, toggleTheme } = useThemeStore();
  const {
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
  } = useMobileMenuStore();

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'services', label: 'Services', path: '/services' },
    { id: 'projects', label: 'Our Work', path: '/projects' },
    { id: 'contact', label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    e.preventDefault();
    navigate(path);
    closeMobileMenu();
  };

  // ✅ FIXED: no event here
  const handleLogoClick = () => {
    navigate('/');
    closeMobileMenu();
  };

  return (
    <>
      {/* ===== Main Header ===== */}
      <header className="overall-header-container">
        <div className="overall-header-sub-container">

          {/* ===== Logo ===== */}
          <div className="header-logo-container">
            <Logo onClick={handleLogoClick} />
          </div>

          {/* ===== Desktop Navigation ===== */}
          <nav className="desktop-navigation-links">
            <ul>
              {navItems.map((item) => (
                <li
                  key={item.id}
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                >
                  <a
                    href={item.path}
                    onClick={(e) => handleNavClick(e, item.path)}
                    className="nav-link"
                  >
                    {item.label}
                    {isActive(item.path) && (
                      <div className="active-indicator" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ===== Right Controls ===== */}
          <div className="header-controls">

            {/* Theme Toggle */}
            <div className="theme-toggle-container">
              <button
                className="theme-toggle-btn"
                onClick={toggleTheme}
                aria-label={
                  isDarkMode
                    ? 'Switch to light mode'
                    : 'Switch to dark mode'
                }
              >
                {isDarkMode ? (
                  <div className="moon-icon">
                    <div className="moon-body">
                      <div className="moon-crater moon-crater-1" />
                      <div className="moon-crater moon-crater-2" />
                      <div className="moon-crater moon-crater-3" />
                    </div>
                  </div>
                ) : (
                  <div className="sun-icon">
                    <div className="sun-center" />
                    <div className="sun-ray sun-ray-1" />
                    <div className="sun-ray sun-ray-2" />
                    <div className="sun-ray sun-ray-3" />
                    <div className="sun-ray sun-ray-4" />
                  </div>
                )}
              </button>
            </div>

            {/* Mobile Menu Toggle */}
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

      {/* ===== Mobile Sidebar ===== */}
      <div className={`mobile-sidebar-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
        <div
          className="mobile-sidebar-backdrop"
          onClick={closeMobileMenu}
        />

        <aside className="mobile-sidebar-content">
          <div className="mobile-sidebar-header">
            <div className="mobile-sidebar-logo">
              {/* ✅ reuse Logo here too if you want */}
              <Logo onClick={handleLogoClick} />
            </div>

            <button
              className="mobile-sidebar-close"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          <nav className="mobile-sidebar-nav">
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.path}
                    className={`mobile-nav-item ${isActive(item.path) ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, item.path)}
                  >
                    {item.label}
                    {isActive(item.path) && (
                      <div className="mobile-active-indicator" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-sidebar-footer">
            <button
              className="mobile-theme-toggle-btn"
              onClick={() => {
                toggleTheme();
                closeMobileMenu();
              }}
            >
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}

export default Header;
