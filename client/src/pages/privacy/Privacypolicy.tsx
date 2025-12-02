import { useState, useEffect, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Lock, 
  EyeOff, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  User,
  Server,
  Globe,
  Calendar,
  Mail,
  Phone,
  ArrowUp,
  ChevronRight,
  ShieldCheck,
  Database,
  Cpu,
  Users,
  MessageSquare,
  Download
} from 'lucide-react';
import './privacypolicy.css'

interface PolicySection {
  id: string;
  title: string;
  content: string;
  icon: JSX.Element;
  lastUpdated: string;
}

interface DataType {
  id: string;
  name: string;
  description: string;
  purpose: string;
  retentionPeriod: string;
}

interface CookieType {
  id: string;
  name: string;
  type: 'Essential' | 'Functional' | 'Analytics' | 'Marketing';
  duration: string;
  description: string;
}

function PrivacyPolicy() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('introduction');
  const [showToTop, setShowToTop] = useState(false);
  const [lastUpdated] = useState('December 15, 2023');
  const [effectiveDate] = useState('January 1, 2024');
  const [acceptedCookies, setAcceptedCookies] = useState<'essential' | 'all' | 'none'>('essential');
  const [showCookieSettings, setShowCookieSettings] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowToTop(window.scrollY > 300);
      
      // Update active section based on scroll
      const sections = document.querySelectorAll('.policy-section');
      let current = 'introduction';
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = section.id;
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  const policySections: PolicySection[] = [
    {
      id: 'introduction',
      title: 'Introduction & Overview',
      content: `Welcome to Kinstry Systems. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. By accessing or using our services, you consent to the practices described in this Privacy Policy.`,
      icon: <FileText size={20} />,
      lastUpdated: 'December 15, 2023'
    },
    {
      id: 'data-collection',
      title: 'Information We Collect',
      content: `We collect various types of information to provide and improve our services to you:
      
      1. Personal Information: Name, email address, phone number, company details
      2. Technical Information: IP address, browser type, device information, usage data
      3. Professional Information: Job title, company size, industry, project requirements
      4. Communication Data: Emails, chat messages, support requests
      5. Payment Information: Billing details (processed securely through third-party providers)
      
      We collect this information through forms, cookies, analytics tools, and direct communications.`,
      icon: <Database size={20} />,
      lastUpdated: 'December 15, 2023'
    },
    {
      id: 'data-use',
      title: 'How We Use Your Information',
      content: `We use the collected information for the following purposes:
      
      • Service Delivery: To provide and maintain our services
      • Communication: To respond to inquiries and send important updates
      • Improvement: To analyze usage patterns and enhance our offerings
      • Security: To protect against unauthorized access and ensure system integrity
      • Marketing: To send relevant information about our services (with consent)
      • Compliance: To meet legal obligations and regulatory requirements
      
      We process your data based on contractual necessity, legitimate interests, or your explicit consent.`,
      icon: <Cpu size={20} />,
      lastUpdated: 'December 15, 2023'
    },
    {
      id: 'data-sharing',
      title: 'Information Sharing & Disclosure',
      content: `We do not sell your personal information. We may share your information only in the following circumstances:
      
      • Service Providers: With trusted partners who assist in delivering our services (under strict confidentiality agreements)
      • Legal Requirements: When required by law or to protect our rights
      • Business Transfers: In connection with mergers, acquisitions, or asset sales
      • Consent: With your explicit permission for specific purposes
      
      All third-party service providers are carefully vetted and required to maintain confidentiality.`,
      icon: <Users size={20} />,
      lastUpdated: 'December 15, 2023'
    },
    {
      id: 'data-security',
      title: 'Data Security Measures',
      content: `We implement comprehensive security measures to protect your information:
      
      • Encryption: All sensitive data is encrypted in transit and at rest
      • Access Controls: Strict role-based access permissions
      • Regular Audits: Continuous security assessments and penetration testing
      • Employee Training: Regular privacy and security training for all staff
      • Incident Response: Established procedures for security incident management
      • Compliance: Adherence to industry standards and best practices
      
      While we implement robust security measures, no system is 100% secure.`,
      icon: <ShieldCheck size={20} />,
      lastUpdated: 'December 15, 2023'
    },
    {
      id: 'your-rights',
      title: 'Your Privacy Rights',
      content: `Depending on your location, you may have the following rights regarding your personal data:
      
      • Access: Request a copy of your personal information
      • Correction: Request correction of inaccurate data
      • Deletion: Request deletion of your personal data
      • Restriction: Request limitation of data processing
      • Objection: Object to certain types of processing
      • Portability: Request transfer of your data to another service
      • Consent Withdrawal: Withdraw previously given consent
      
      To exercise these rights, contact us using the information below.`,
      icon: <User size={20} />,
      lastUpdated: 'December 15, 2023'
    },
    {
      id: 'cookies',
      title: 'Cookies & Tracking Technologies',
      content: `We use cookies and similar technologies to enhance your experience:
      
      Essential Cookies: Required for basic website functionality
      Functional Cookies: Remember your preferences and settings
      Analytics Cookies: Help us understand how visitors use our site
      Marketing Cookies: Used for relevant advertising (with consent)
      
      You can control cookie settings through your browser or our cookie preference center.`,
      icon: <Server size={20} />,
      lastUpdated: 'December 15, 2023'
    },
    {
      id: 'international',
      title: 'International Data Transfers',
      content: `As a global company, we may transfer your personal information to countries outside your country of residence. These transfers occur only when necessary for our service provision and always with appropriate safeguards, including:
      
      • Standard Contractual Clauses
      • Privacy Shield Frameworks (where applicable)
      • Binding Corporate Rules
      • Your explicit consent
      
      We ensure all international transfers comply with applicable data protection laws.`,
      icon: <Globe size={20} />,
      lastUpdated: 'December 15, 2023'
    },
    {
      id: 'children',
      title: "Children's Privacy",
      content: `Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that a child under 16 has provided us with personal information, we will take steps to delete such information from our files immediately.
      
      Parents or guardians who believe their child has submitted personal information should contact us to request deletion.`,
      icon: <Users size={20} />,
      lastUpdated: 'December 15, 2023'
    },
    {
      id: 'updates',
      title: 'Policy Updates & Changes',
      content: `We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes by:
      
      • Posting the updated policy on our website
      • Sending email notifications (for major changes)
      • Updating the "Last Updated" date
      
      We encourage you to review this policy regularly to stay informed about how we protect your information.`,
      icon: <Calendar size={20} />,
      lastUpdated: 'December 15, 2023'
    }
  ];

  const dataTypes: DataType[] = [
    {
      id: 'personal',
      name: 'Personal Identification',
      description: 'Name, email, phone number, address',
      purpose: 'Account creation, communication, service delivery',
      retentionPeriod: '3 years after account termination'
    },
    {
      id: 'technical',
      name: 'Technical Data',
      description: 'IP address, browser info, device data',
      purpose: 'Security, analytics, service improvement',
      retentionPeriod: '2 years from collection'
    },
    {
      id: 'usage',
      name: 'Usage Data',
      description: 'Website interactions, feature usage',
      purpose: 'Product improvement, personalization',
      retentionPeriod: '18 months from collection'
    },
    {
      id: 'communication',
      name: 'Communication Data',
      description: 'Emails, support tickets, chat messages',
      purpose: 'Customer support, service improvement',
      retentionPeriod: '5 years from last communication'
    },
    {
      id: 'financial',
      name: 'Financial Information',
      description: 'Billing details, payment history',
      purpose: 'Payment processing, financial records',
      retentionPeriod: '7 years for tax purposes'
    }
  ];

  const cookieTypes: CookieType[] = [
    {
      id: 'essential',
      name: 'Session & Security',
      type: 'Essential',
      duration: 'Session',
      description: 'Required for website functionality and security'
    },
    {
      id: 'functional',
      name: 'Preference Cookies',
      type: 'Functional',
      duration: '1 year',
      description: 'Remember your settings and preferences'
    },
    {
      id: 'analytics',
      name: 'Google Analytics',
      type: 'Analytics',
      duration: '2 years',
      description: 'Help us understand website usage patterns'
    },
    {
      id: 'marketing',
      name: 'Marketing & Advertising',
      type: 'Marketing',
      duration: '6 months',
      description: 'Show relevant content and offers'
    }
  ];

  const handleCookieAccept = (type: 'essential' | 'all' | 'none') => {
    setAcceptedCookies(type);
    setShowCookieSettings(false);
    // In a real app, you would save this preference
  };

  const generatePrivacyPolicyText = () => {
    let text = `KINSTRY SYSTEMS PRIVACY POLICY\n`;
    text += `================================\n\n`;
    text += `Effective Date: ${effectiveDate}\n`;
    text += `Last Updated: ${lastUpdated}\n`;
    text += `Version: 2.1\n\n`;
    
    text += `OUR PRIVACY COMMITMENT\n`;
    text += `======================\n`;
    text += `At Kinstry Systems, we believe privacy is a fundamental right. This document outlines how we handle your personal information with the utmost care and respect. We're committed to being transparent about our data practices and giving you control over your information.\n\n`;
    
    policySections.forEach(section => {
      text += `${section.title.toUpperCase()}\n`;
      text += `${'='.repeat(section.title.length)}\n\n`;
      text += `${section.content}\n\n`;
      
      if (section.id === 'data-collection') {
        text += `DATA CATEGORIES WE PROCESS:\n`;
        dataTypes.forEach(dataType => {
          text += `- ${dataType.name}\n`;
          text += `  Description: ${dataType.description}\n`;
          text += `  Purpose: ${dataType.purpose}\n`;
          text += `  Retention: ${dataType.retentionPeriod}\n\n`;
        });
      }
      
      if (section.id === 'cookies') {
        text += `COOKIE TYPES:\n`;
        cookieTypes.forEach(cookie => {
          text += `- ${cookie.name} (${cookie.type})\n`;
          text += `  Duration: ${cookie.duration}\n`;
          text += `  Description: ${cookie.description}\n\n`;
        });
      }
      
      if (section.id === 'data-security') {
        text += `SECURITY FRAMEWORK:\n`;
        text += `- End-to-End Encryption: Military-grade encryption for all sensitive data\n`;
        text += `- Regular Security Audits: Quarterly third-party security assessments\n`;
        text += `- Access Control: Strict role-based access with 2FA enforcement\n`;
        text += `- Incident Response: 24/7 monitoring and rapid response protocols\n\n`;
      }
      
      text += `\n`;
    });
    
    text += `CONTACT INFORMATION\n`;
    text += `===================\n\n`;
    text += `Privacy Team:\n`;
    text += `Email: davismugoikou@gmail.com\n`;
    text += `Phone: +254 758 420 860\n\n`;
    
    text += `IMPORTANT NOTICE\n`;
    text += `================\n`;
    text += `This Privacy Policy applies only to Kinstry Systems' services. Our website may contain links to third-party sites with their own privacy policies. We encourage you to review those policies before providing any personal information.\n\n`;
    
    text += `© ${new Date().getFullYear()} Kinstry Systems. All rights reserved.\n`;
    
    return text;
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      const policyText = generatePrivacyPolicyText();
      
      // Create a blob with the text
      const blob = new Blob([policyText], { type: 'text/plain' });
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Kinstry_Systems_Privacy_Policy_${lastUpdated.replace(/\s+/g, '_')}.txt`;
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Revoke the blob URL
      window.URL.revokeObjectURL(url);
      
      // Show success feedback (optional)
      console.log('Privacy Policy downloaded successfully');
      
    } catch (error) {
      console.error('Error downloading privacy policy:', error);
      // You could add a toast notification here
    } finally {
      setIsDownloading(false);
    }
  };

//   const generatePDF = () => {
//     // For a more advanced PDF generation, you could use a library like jsPDF
//     // For now, we'll use the text version
//     handleDownload();
//   };

  return (
    <div className="privacy-policy-container">
      {/* Header */}
      <header className="privacy-header">
        <div className="container">
          <div className="privacy-header-content">
            <div className="privacy-header-badge">
              <Shield size={24} />
              <span>Privacy Policy</span>
            </div>
            <h1 className="privacy-main-title">
              Protecting Your <span className="gradient-text">Privacy & Data</span>
            </h1>
            <p className="privacy-subtitle">
              Our commitment to transparency, security, and your privacy rights
            </p>
            
            <div className="privacy-meta-info">
              <div className="meta-item">
                <Calendar size={16} />
                <span>Effective: {effectiveDate}</span>
              </div>
              <div className="meta-item">
                <Calendar size={16} />
                <span>Last Updated: {lastUpdated}</span>
              </div>
              <div className="meta-item">
                <FileText size={16} />
                <span>Version 2.1</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="privacy-main-content">
        <div className="container">
          <div className="privacy-content-layout">
            {/* Table of Contents */}
            <aside className="privacy-sidebar">
              <div className="sidebar-card glass">
                <h3 className="sidebar-title">
                  <FileText size={20} />
                  Quick Navigation
                </h3>
                <nav className="toc-nav">
                  <ul>
                    {policySections.map((section) => (
                      <li key={section.id} className={activeSection === section.id ? 'active' : ''}>
                        <button 
                          onClick={() => scrollToSection(section.id)}
                          className="toc-item"
                        >
                          <div className="toc-item-content">
                            <span className="toc-icon">{section.icon}</span>
                            <span className="toc-text">{section.title}</span>
                          </div>
                          <ChevronRight size={16} className="toc-arrow" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
                
                <div className="sidebar-actions">
                  <button 
                    className="btn btn-secondary"
                    onClick={() => navigate('/contact')}
                  >
                    <MessageSquare size={16} />
                    Contact DPO
                  </button>
                  <button 
                    className={`btn btn-primary ${isDownloading ? 'downloading' : ''}`}
                    onClick={handleDownload}
                    disabled={isDownloading}
                  >
                    {isDownloading ? (
                      <>
                        <span className="download-spinner"></span>
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download size={16} />
                        Download PDF
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="sidebar-stats glass">
                <h4>Key Privacy Points</h4>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-number">256-bit</div>
                    <div className="stat-label">Encryption</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">0</div>
                    <div className="stat-label">Data Sold</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">100%</div>
                    <div className="stat-label">Transparency</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">24/7</div>
                    <div className="stat-label">Security</div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Policy Content */}
            <div className="privacy-content">
              {/* Introduction */}
              <div className="policy-intro-card card">
                <div className="intro-icon">
                  <ShieldCheck size={32} />
                </div>
                <h2>Our Privacy Commitment</h2>
                <p>
                  At Kinstry Systems, we believe privacy is a fundamental right. This document outlines 
                  how we handle your personal information with the utmost care and respect. We're committed 
                  to being transparent about our data practices and giving you control over your information.
                </p>
                <div className="intro-features">
                  <div className="feature">
                    <CheckCircle size={20} />
                    <span>GDPR Compliant</span>
                  </div>
                  <div className="feature">
                    <CheckCircle size={20} />
                    <span>CCPA Ready</span>
                  </div>
                  <div className="feature">
                    <CheckCircle size={20} />
                    <span>ISO 27001 Certified</span>
                  </div>
                </div>
              </div>

              {/* Policy Sections */}
              {policySections.map((section) => (
                <section 
                  key={section.id}
                  id={section.id}
                  className="policy-section"
                >
                  <div className="section-header">
                    <div className="section-icon">
                      {section.icon}
                    </div>
                    <h2>{section.title}</h2>
                    <div className="section-meta">
                      <Calendar size={14} />
                      <span>Updated: {section.lastUpdated}</span>
                    </div>
                  </div>
                  
                  <div className="section-content">
                    <p>{section.content}</p>
                    
                    {/* Additional content for specific sections */}
                    {section.id === 'data-collection' && (
                      <div className="data-types-table">
                        <h4>Data Categories We Process</h4>
                        <div className="table-container">
                          <table>
                            <thead>
                              <tr>
                                <th>Data Type</th>
                                <th>Description</th>
                                <th>Purpose</th>
                                <th>Retention</th>
                              </tr>
                            </thead>
                            <tbody>
                              {dataTypes.map((dataType) => (
                                <tr key={dataType.id}>
                                  <td>
                                    <strong>{dataType.name}</strong>
                                  </td>
                                  <td>{dataType.description}</td>
                                  <td>{dataType.purpose}</td>
                                  <td>
                                    <span className="retention-badge">
                                      {dataType.retentionPeriod}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    
                    {section.id === 'cookies' && (
                      <div className="cookies-section">
                        <div className="cookies-header">
                          <h4>Cookie Types & Purposes</h4>
                          <button 
                            className="btn btn-secondary"
                            onClick={() => setShowCookieSettings(!showCookieSettings)}
                          >
                            Manage Preferences
                          </button>
                        </div>
                        
                        <div className="cookies-grid">
                          {cookieTypes.map((cookie) => (
                            <div key={cookie.id} className="cookie-card">
                              <div className="cookie-header">
                                <span className={`cookie-type-badge ${cookie.type.toLowerCase()}`}>
                                  {cookie.type}
                                </span>
                                <span className="cookie-duration">{cookie.duration}</span>
                              </div>
                              <h5>{cookie.name}</h5>
                              <p>{cookie.description}</p>
                            </div>
                          ))}
                        </div>
                        
                        {showCookieSettings && (
                          <div className="cookie-settings-card glass">
                            <h5>Cookie Preferences</h5>
                            <p>Choose which cookies you accept:</p>
                            
                            <div className="cookie-options">
                              <label className="cookie-option">
                                <input
                                  type="radio"
                                  name="cookies"
                                  checked={acceptedCookies === 'essential'}
                                  onChange={() => handleCookieAccept('essential')}
                                />
                                <div className="option-content">
                                  <strong>Essential Only</strong>
                                  <span>Required for basic functionality</span>
                                </div>
                              </label>
                              
                              <label className="cookie-option">
                                <input
                                  type="radio"
                                  name="cookies"
                                  checked={acceptedCookies === 'all'}
                                  onChange={() => handleCookieAccept('all')}
                                />
                                <div className="option-content">
                                  <strong>All Cookies</strong>
                                  <span>Essential + analytics + marketing</span>
                                </div>
                              </label>
                              
                              <label className="cookie-option">
                                <input
                                  type="radio"
                                  name="cookies"
                                  checked={acceptedCookies === 'none'}
                                  onChange={() => handleCookieAccept('none')}
                                />
                                <div className="option-content">
                                  <strong>Reject Non-Essential</strong>
                                  <span>May affect website functionality</span>
                                </div>
                              </label>
                            </div>
                            
                            <div className="cookie-actions">
                              <button 
                                className="btn btn-primary"
                                onClick={() => setShowCookieSettings(false)}
                              >
                                Save Preferences
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {section.id === 'data-security' && (
                      <div className="security-features">
                        <h4>Our Security Framework</h4>
                        <div className="features-grid">
                          <div className="security-feature">
                            <Lock size={24} />
                            <h5>End-to-End Encryption</h5>
                            <p>Military-grade encryption for all sensitive data</p>
                          </div>
                          <div className="security-feature">
                            <Shield size={24} />
                            <h5>Regular Security Audits</h5>
                            <p>Quarterly third-party security assessments</p>
                          </div>
                          <div className="security-feature">
                            <EyeOff size={24} />
                            <h5>Access Control</h5>
                            <p>Strict role-based access with 2FA enforcement</p>
                          </div>
                          <div className="security-feature">
                            <AlertTriangle size={24} />
                            <h5>Incident Response</h5>
                            <p>24/7 monitoring and rapid response protocols</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              ))}

              {/* Contact Information */}
              <div className="contact-section card">
                <h2>Contact Our Privacy Team</h2>
                <div className="contact-grid">
                  <div className="contact-method">
                    <Mail size={24} />
                    <div>
                      <h5>Email</h5>
                      <a href="mailto:davismugoikou@gmail.com">davismugoikou@gmail.com</a>
                    </div>
                  </div>
                  <div className="contact-method">
                    <Phone size={24} />
                    <div>
                      <h5>Phone</h5>
                      <a href="tel:+254758420860">+254 758 420 860</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Note */}
              <div className="policy-footer-note glass">
                <AlertTriangle size={24} />
                <div>
                  <h4>Important Notice</h4>
                  <p>
                    This Privacy Policy applies only to Kinstry Systems' services. Our website may contain 
                    links to third-party sites with their own privacy policies. We encourage you to review 
                    those policies before providing any personal information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Back to Top Button */}
      {showToTop && (
        <button 
          className="back-to-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}

export default PrivacyPolicy;