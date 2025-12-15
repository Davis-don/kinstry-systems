import './App.css';
import Homepage from './pages/home/Homepage';
import Mainlayout from './layouts/mainLayout/Mainlayout';
import Project from './pages/projects/Project';
import Contact from './pages/contact/Contact';
import Services from './pages/services/Services';
import Aboutpage from './pages/about/Aboutpage';
import Privacypolicy from './pages/privacy/Privacypolicy';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useThemeStore } from './store/themestore';
import { useMobileMenuStore } from './store/menustore';
import Terms from './pages/terms/Terms';
import Loginpage from './features/admin/pages/login/Loginpage';
import Adminaccount from './features/admin/pages/adminAccount/Adminaccount';
import Toasterlayout from './features/admin/layouts/Toasterlayout';


// Component to handle scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top instantly when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior
    });
    
    // Also ensure body scroll is restored
    document.body.style.overflow = 'auto';
    document.body.classList.remove('sidebar-open');
  }, [pathname]);

  return null;
}

// Custom cursor component
function CustomCursor() {
  useEffect(() => {
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorDot.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 8px;
      height: 8px;
      background: var(--accent-green);
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      mix-blend-mode: difference;
      transform: translate(-50%, -50%);
      transition: width 0.2s, height 0.2s, background 0.2s;
    `;
    
    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    cursorOutline.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
      border: 2px solid var(--accent-green);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      transform: translate(-50%, -50%);
      transition: all 0.1s;
    `;

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    const moveCursor = (e: MouseEvent) => {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
      cursorOutline.style.left = `${e.clientX}px`;
      cursorOutline.style.top = `${e.clientY}px`;
    };

    const handleMouseDown = () => {
      cursorDot.style.width = '12px';
      cursorDot.style.height = '12px';
      cursorOutline.style.width = '30px';
      cursorOutline.style.height = '30px';
    };

    const handleMouseUp = () => {
      cursorDot.style.width = '8px';
      cursorDot.style.height = '8px';
      cursorOutline.style.width = '40px';
      cursorOutline.style.height = '40px';
    };

    const handleLinkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.closest('a') || 
          target.closest('button')) {
        cursorDot.style.width = '16px';
        cursorDot.style.height = '16px';
        cursorDot.style.background = 'var(--accent-cyan)';
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.borderColor = 'var(--accent-cyan)';
      } else {
        cursorDot.style.width = '8px';
        cursorDot.style.height = '8px';
        cursorDot.style.background = 'var(--accent-green)';
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.borderColor = 'var(--accent-green)';
      }
    };

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      document.addEventListener('mousemove', moveCursor);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseover', handleLinkHover);
    }

    return () => {
      if (!prefersReducedMotion) {
        document.removeEventListener('mousemove', moveCursor);
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mouseover', handleLinkHover);
      }
      cursorDot.remove();
      cursorOutline.remove();
    };
  }, []);

  return null;
}

function App() {
  const { isDarkMode } = useThemeStore();
  const { isMobileMenuOpen } = useMobileMenuStore();

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    const body = document.body;
    if (isMobileMenuOpen) {
      body.classList.add('sidebar-open');
      body.style.overflow = 'hidden';
    } else {
      body.classList.remove('sidebar-open');
      body.style.overflow = 'auto';
    }

    // Cleanup function
    return () => {
      body.classList.remove('sidebar-open');
      body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  // Handle initial page load - scroll to top
  useEffect(() => {
    // Scroll to top on initial load
    window.scrollTo(0, 0);
    
    // Also handle browser back/forward navigation
    const handlePopState = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);


  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <Router>
        <ScrollToTop />
        <CustomCursor />
        <Routes>
          <Route path="/" element={
            <Mainlayout>
              <Homepage />
            </Mainlayout>
          } />
          <Route path="/projects" element={
            <Mainlayout>
              <Project />
            </Mainlayout>
          } />
          <Route path="/contact" element={
            <Mainlayout>
              <Contact />
            </Mainlayout>
          } />
            <Route path="/about" element={
              <Mainlayout>
                <Aboutpage />
              </Mainlayout>
            } />
          <Route path="/services" element={
            <Mainlayout>
              <Services />
            </Mainlayout>
          } />

           <Route path="/login" element={
              <Loginpage />
          } />
            <Route path="/super-admin-account" element={
              <Toasterlayout>
              <Adminaccount/>
              </Toasterlayout>
          } />
          <Route path="/privacy" element={
            <Mainlayout>
              <Privacypolicy />
            </Mainlayout>
          } />
          <Route path="/terms" element={
            <Mainlayout>
              <Terms />
            </Mainlayout>
          } />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;