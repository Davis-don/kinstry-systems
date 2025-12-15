import './footer.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

// Minimal Icon Components
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const SpinnerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" 
          strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Define types based on your Django response structure
interface SubscribeResponse {
  message?: string;
  email?: string[];
  non_field_errors?: string[];
}

function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Mutation for newsletter subscription
  const subscribeMutation = useMutation<SubscribeResponse, Error, { email: string }>({
    mutationFn: async (subscriptionData) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/newsletter/subscribe/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Extract the first error message from the response
        const errorMessage = extractErrorMessage(data);
        throw new Error(errorMessage);
      }

      return data;
    },
    onSuccess: (data) => {
      // Extract success message from response
      const message = data.message || 'Successfully subscribed to newsletter!';
      toast.success(message);
      setServerMessage(message);
      setIsSuccess(true);
      setEmail('');
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setServerMessage(null);
        setIsSuccess(false);
      }, 5000);
    },
    onError: (error) => {
      // Display the error message from server
      toast.error(error.message);
      setServerMessage(error.message);
      setIsSuccess(false);
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setServerMessage(null);
      }, 5000);
    },
  });

  // Helper function to extract error message from Django response
  const extractErrorMessage = (data: any): string => {
    if (data.email) {
      // Handle field-specific errors
      return Array.isArray(data.email) ? data.email[0] : data.email;
    } else if (data.non_field_errors) {
      // Handle non-field errors
      return Array.isArray(data.non_field_errors) ? data.non_field_errors[0] : data.non_field_errors;
    } else if (data.message) {
      // Handle general message
      return data.message;
    } else if (data.detail) {
      // Handle detail field
      return data.detail;
    } else {
      // Extract first error if it's an object
      const firstKey = Object.keys(data)[0];
      if (firstKey && data[firstKey]) {
        const firstError = data[firstKey];
        return Array.isArray(firstError) ? firstError[0] : firstError;
      }
      return 'Subscription failed. Please try again.';
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous messages
    setServerMessage(null);
    
    // Validate email
    if (!email || !email.includes('@')) {
      const errorMsg = 'Please enter a valid email address';
      toast.error(errorMsg);
      setServerMessage(errorMsg);
      setIsSuccess(false);
      return;
    }

    // Submit subscription
    subscribeMutation.mutate({ email });
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo(0, 0);
  };

  const navigationLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
  ];

  const contactInfo = [
    { icon: <PhoneIcon />, label: 'Phone', value: '0758 420 860', href: 'tel:+254758420860' },
    { icon: <MailIcon />, label: 'Email', value: 'davismugoikou@gmail.com', href: 'mailto:davismugoikou@gmail.com' },
    { icon: <LocationIcon />, label: 'Location', value: 'Nairobi, Kenya' },
  ];

  return (
    <footer className="ks-footer">
      {/* Background Elements */}
      <div className="ks-footer-background">
        <div className="ks-footer-grid"></div>
        <div className="ks-footer-glow"></div>
      </div>

      <div className="ks-footer-container">
        {/* Main Footer Content */}
        <div className="ks-footer-main">
          {/* Brand & Contact Column */}
          <div className="ks-footer-brand">
            <div className="ks-footer-logo" onClick={handleLogoClick}>
              <div className="ks-logo-symbol">
                <div className="ks-logo-k">
                  <div className="ks-logo-line ks-logo-line-vertical"></div>
                  <div className="ks-logo-line ks-logo-line-diagonal-1"></div>
                  <div className="ks-logo-line ks-logo-line-diagonal-2"></div>
                </div>
                <div className="ks-logo-glow"></div>
              </div>
              <div className="ks-logo-text">
                <span className="ks-logo-primary">KINSTRY</span>
                <span className="ks-logo-secondary">SYSTEMS</span>
              </div>
            </div>

            <p className="ks-footer-mission">
              Transforming ideas into innovative digital solutions through cutting-edge technology and expert craftsmanship.
            </p>

            {/* Contact Info - Always Visible */}
            <div className="ks-contact-grid">
              {contactInfo.map((contact, index) => (
                <div key={index} className="ks-contact-item">
                  <div className="ks-contact-icon">{contact.icon}</div>
                  <div className="ks-contact-content">
                    <span className="ks-contact-label">{contact.label}</span>
                    {contact.href ? (
                      <a 
                        href={contact.href} 
                        className="ks-contact-value"
                        target={contact.label === 'Phone' || contact.label === 'Email' ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <span className="ks-contact-value">{contact.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation & Newsletter Column */}
          <div className="ks-footer-actions">
            {/* Quick Navigation */}
            <div className="ks-quick-nav">
              <h3 className="ks-section-title">Quick Links</h3>
              <div className="ks-nav-grid">
                {navigationLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavigation(link.path)}
                    className="ks-nav-link"
                  >
                    <span className="ks-nav-text">{link.label}</span>
                    <ArrowIcon />
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="ks-newsletter-card">
              <div className="ks-newsletter-header">
                <h3 className="ks-section-title">Stay Updated</h3>
                <div className="ks-newsletter-badge">New</div>
              </div>
              
              <p className="ks-newsletter-desc">
                Subscribe to receive updates on new services, tech insights, and exclusive offers.
              </p>

              <form onSubmit={handleSubscribe} className="ks-newsletter-form">
                <div className="ks-input-wrapper">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      // Clear message when user starts typing
                      if (serverMessage) setServerMessage(null);
                    }}
                    required
                    disabled={subscribeMutation.isPending}
                    className="ks-email-input"
                  />
                  <button 
                    type="submit" 
                    className="ks-submit-button"
                    disabled={subscribeMutation.isPending}
                  >
                    {subscribeMutation.isPending ? (
                      <>
                        <div className="ks-spinner-icon">
                          <SpinnerIcon />
                        </div>
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <ArrowIcon />
                      </>
                    )}
                  </button>
                </div>
                
                {/* Server Response Message */}
                {serverMessage && (
                  <div className={`ks-server-message ${isSuccess ? 'success' : 'error'}`}>
                    {isSuccess ? <CheckIcon /> : null}
                    <span>{serverMessage}</span>
                  </div>
                )}

                <div className="ks-newsletter-note">
                  By subscribing, you agree to our Privacy Policy. No spam, unsubscribe anytime.
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="ks-footer-divider">
          <div className="ks-divider-line"></div>
          <div className="ks-divider-dot"></div>
          <div className="ks-divider-line"></div>
        </div>

        {/* Bottom Bar */}
        <div className="ks-footer-bottom">
          <div className="ks-copyright-section">
            <span className="ks-copyright-text">
              © {new Date().getFullYear()} Kinstry Systems. All rights reserved.
            </span>
            <div className="ks-copyright-separator"></div>
            <span className="ks-copyright-tagline">
              Building digital excellence since 2024
            </span>
          </div>

          {/* Expandable Legal Section */}
          <div className={`ks-legal-section ${isExpanded ? 'expanded' : ''}`}>
            <button 
              className="ks-legal-toggle"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
            >
              <span>Legal</span>
              <div className={`ks-toggle-icon ${isExpanded ? 'expanded' : ''}`}>
                <div className="ks-toggle-line"></div>
                <div className="ks-toggle-line"></div>
              </div>
            </button>

            <div className="ks-legal-links">
              <button 
                onClick={() => handleNavigation('/privacy')}
                className="ks-legal-link"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => handleNavigation('/terms')}
                className="ks-legal-link"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;