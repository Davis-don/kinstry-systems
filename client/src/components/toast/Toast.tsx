import useToastStore from "../../store/toastStore";
import "./toast.css";
import { useEffect, useRef } from 'react';

// Icons
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const SuccessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const ErrorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

const WarningIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const NotificationIcon = ({ type }: { type: string }) => {
  const icons = {
    success: <SuccessIcon />,
    error: <ErrorIcon />,
    info: <InfoIcon />,
    warning: <WarningIcon />,
  };

  return icons[type as keyof typeof icons] || <InfoIcon />;
};

const Toast = () => {
  const { status, message, type, time, title, position, showProgress, hideToast } = useToastStore();
  const progressRef = useRef<HTMLDivElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status && showProgress && progressRef.current) {
      progressRef.current.style.animation = `progress ${time * 1000}ms linear forwards`;
    }
  }, [status, showProgress, time]);

  useEffect(() => {
    if (!status && toastRef.current) {
      // Trigger exit animation
      const timer = setTimeout(() => {
        if (toastRef.current) {
          toastRef.current.classList.add('toast-exit');
        }
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [status]);

  if (!status) return null;

  const typeColors = {
    success: '#00d166',
    error: '#ff4757',
    info: '#409cff',
    warning: '#ffc107',
  };

  const typeGradients = {
    success: 'linear-gradient(135deg, #00d166 0%, #00b8a9 100%)',
    error: 'linear-gradient(135deg, #ff4757 0%, #ff3838 100%)',
    info: 'linear-gradient(135deg, #409cff 0%, #a855f7 100%)',
    warning: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)',
  };

  const typeGlows = {
    success: 'rgba(0, 209, 102, 0.4)',
    error: 'rgba(255, 71, 87, 0.4)',
    info: 'rgba(64, 156, 255, 0.4)',
    warning: 'rgba(255, 193, 7, 0.4)',
  };

  const positionClasses = {
    'center': 'toast-center',
    'top-right': 'toast-top-right',
    'top-left': 'toast-top-left',
    'bottom-right': 'toast-bottom-right',
    'bottom-left': 'toast-bottom-left',
  };

  return (
    <div className={`toast-overlay ${positionClasses[position]}`}>
      <div 
        ref={toastRef}
        className={`toast-box quantum-toast quantum-toast-${type}`}
        style={{
          '--toast-color': typeColors[type],
          '--toast-gradient': typeGradients[type],
          '--toast-glow': typeGlows[type],
          '--duration': `${time * 1000}ms`,
        } as React.CSSProperties}
      >
        {/* Glow effect */}
        <div className="quantum-toast-glow"></div>
        
        {/* Holographic grid background */}
        <div className="quantum-toast-grid"></div>
        
        {/* Main content */}
        <div className="quantum-toast-content">
          {/* Header with icon and title */}
          <div className="quantum-toast-header">
            <div className="quantum-toast-icon-wrapper">
              <div className="quantum-toast-icon-bg"></div>
              <div className="quantum-toast-icon">
                <NotificationIcon type={type} />
              </div>
            </div>
            
            <div className="quantum-toast-text">
              <div className="quantum-toast-title">{title}</div>
              <div className="quantum-toast-message">{message}</div>
            </div>
            
            <button 
              className="quantum-toast-close"
              onClick={hideToast}
              aria-label="Close toast"
            >
              <CloseIcon />
            </button>
          </div>
          
          {/* Progress bar */}
          {showProgress && (
            <div className="quantum-toast-progress">
              <div className="quantum-progress-track"></div>
              <div ref={progressRef} className="quantum-progress-bar"></div>
            </div>
          )}
          
          {/* Time indicator */}
          <div className="quantum-toast-time">
            <div className="quantum-time-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="quantum-time-text">
              {time}s
            </span>
          </div>
        </div>
        
        {/* Corner accents */}
        <div className="quantum-toast-corner quantum-toast-corner-tl"></div>
        <div className="quantum-toast-corner quantum-toast-corner-tr"></div>
        <div className="quantum-toast-corner quantum-toast-corner-bl"></div>
        <div className="quantum-toast-corner quantum-toast-corner-br"></div>
      </div>
    </div>
  );
};

export default Toast;
