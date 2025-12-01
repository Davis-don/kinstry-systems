import './App.css';
import Homepage from './pages/home/Homepage';
import Mainlayout from './layouts/mainLayout/Mainlayout';
import Project from './pages/projects/Project';
import Contact from './pages/contact/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useThemeStore } from './store/themestore';
import { useMobileMenuStore } from './store/menustore';

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

  // Add futuristic cursor effect
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

    const moveCursor = (e:any) => {
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

    const handleLinkHover = (e:any) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
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

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleLinkHover);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleLinkHover);
      cursorDot.remove();
      cursorOutline.remove();
    };
  }, []);

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <Router>
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
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;