import { useState, useEffect, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Scale,
  Shield,
  AlertCircle,
  BookOpen,
  UserCheck,
  Clock,
  Mail,
  ArrowUp,
  ChevronRight,
  CheckCircle,
  XCircle,
  HelpCircle,
  ExternalLink,
  Download,
  MessageSquare,
  CreditCard,
  Lock,
  Eye,
  Database,
  Cpu,
  Server,
} from 'lucide-react';
import './terms.css'

interface TermSection {
  id: string;
  title: string;
  content: string;
  icon: JSX.Element;
  lastUpdated: string;
}

interface ImportantTerm {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
}

interface ServiceTier {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  restrictions: string[];
}

function Terms() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('acceptance');
  const [showToTop, setShowToTop] = useState(false);
  const [lastUpdated] = useState('December 15, 2023');
  const [effectiveDate] = useState('January 1, 2024');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowToTop(window.scrollY > 300);
      
      // Update active section based on scroll
      const sections = document.querySelectorAll('.terms-section');
      let current = 'acceptance';
      
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

  const handleAcceptTerms = () => {
    setAcceptedTerms(true);
    setShowAcceptModal(false);
    // In a real app, you would save this to localStorage/database
  };

  const termSections: TermSection[] = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      content: `By accessing or using Kinstry Systems' services, websites, or applications (collectively, the "Services"), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these Terms, you must not access or use our Services.

These Terms constitute a legally binding agreement between you (either an individual or a legal entity) and Kinstry Systems Inc. ("Kinstry," "we," "us," or "our").`,
      icon: <UserCheck size={20} />,
      lastUpdated: 'December 15, 2023'
    },
    {
      id: 'definitions',
      title: 'Definitions & Interpretation',
      content: `For the purposes of these Terms:

• "Client" refers to any individual or entity using our Services
• "Services" means all software, websites, applications, and consulting provided by Kinstry
• "Content" includes text, images, code, data, and other materials
• "Intellectual Property" refers to patents, copyrights, trademarks, trade secrets, and other proprietary rights
• "Confidential Information" means any non-public information disclosed by either party
• "Effective Date" is the date you first accept these Terms or begin using our Services`,
      icon: <BookOpen size={20} />,
      lastUpdated: 'December 15, 2023'
    },
    {
      id: 'services',
      title: 'Services Description',
      content: `Kinstry Systems provides comprehensive technology solutions including:

1. Software Development: Custom application development across web, mobile, and desktop platforms
2. Consulting Services: Technology strategy, architecture design, and digital transformation consulting
3. Maintenance & Support: Ongoing technical support and system maintenance
4. Cloud Solutions: Cloud migration, infrastructure management, and DevOps services
5. AI & ML Solutions: Artificial intelligence and machine learning integration

We reserve the right to modify, suspend, or discontinue any Service at our discretion. All Services are provided "as is" and "as available."`,
      icon: <Cpu size={20} />,
      lastUpdated: 'December 15, 2023'
    },
    {
      id: 'accounts',
      title: 'Account Registration & Security',
      content: `To access certain Services, you must create an account. You agree to:

• Provide accurate, current, and complete information during registration
• Maintain and promptly update your account information
• Maintain the confidentiality of your login credentials
• Notify us immediately of any unauthorized access or security breach
• Accept responsibility for all activities under your account

You must be at least 18 years old to create an account. We reserve the right to refuse service, terminate accounts, or remove content at our discretion.`,
      icon: <Lock size={20} />,
      lastUpdated: 'December 15, 2023'
    },
    {
      id: 'payments',
      title: 'Payments & Billing',
      content: `Our Services may be offered on various pricing models:

1. Subscription Plans: Monthly or annual recurring payments
2. Project-Based: Fixed price for specific deliverables
3. Time & Materials: Hourly rates with detailed time tracking
4. Retainer Agreements: Pre-paid blocks of hours

Payment Terms:
• Invoices are due within 30 days of receipt
• Late payments may incur interest charges of 1.5% per month
• All fees are exclusive of applicable taxes
• We may suspend Services for non-payment

Refund Policy:
• Subscription fees are non-refundable after 14 days
• Project-based fees follow our Project Cancellation Policy
• Contact billing@kinstrysystems.com for refund requests`,
      icon: <CreditCard size={20} />,
      lastUpdated: 'December 15, 2023'
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property Rights',
      content: `1. Our Property: All software, documentation, designs, and proprietary technology developed by Kinstry remain our exclusive property unless otherwise specified in a written agreement.

2. Client Property: Your data, content, and pre-existing intellectual property remain your property.

3. License Grants: We grant you a limited, non-exclusive, non-transferable license to use our Services for your internal business purposes.

4. Restrictions: You may not reverse engineer, decompile, disassemble, modify, or create derivative works of our Services without our written permission.

5. Third-Party Rights: You must ensure your content does not infringe on third-party intellectual property rights.`,
      icon: <Shield size={20} />,
      lastUpdated: 'December 15, 2023'
    },
    {
      id: 'data-privacy',
      title: 'Data Protection & Privacy',
      content: `We handle your data in accordance with our Privacy Policy and applicable data protection laws including GDPR and CCPA.

Data Processing:
• We process personal data only as necessary to provide our Services
• We implement appropriate technical and organizational security measures
• We act as a Data Processor for client data as defined in data protection laws

Your Responsibilities:
• Obtain necessary consents for data processing
• Ensure data accuracy and lawfulness
• Implement your own data protection measures

Data Breach Notification: We will notify affected parties of data breaches as required by law.`,
      icon: <Database size={20} />,
      lastUpdated: 'December 15, 2023'
    },
    {
      id: 'confidentiality',
      title: 'Confidentiality',
      content: `Both parties agree to maintain the confidentiality of proprietary information received from the other party.

Confidential Information includes:
• Business plans and strategies
• Technical specifications and designs
• Financial information
• Customer lists and data
• Trade secrets and proprietary methodologies

Obligations:
• Use Confidential Information only for the intended purpose
• Implement reasonable security measures
• Not disclose to third parties without written consent
• Return or destroy Confidential Information upon request

Exceptions: Information that is publicly available or independently developed.`,
      icon: <Eye size={20} />,
      lastUpdated: 'December 15, 2023'
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      content: `To the maximum extent permitted by law:

• We are not liable for indirect, incidental, special, or consequential damages
• Our total liability shall not exceed the fees paid by you in the preceding 12 months
• We are not liable for delays or failures due to circumstances beyond our control
• We exclude liability for data loss, business interruption, or loss of profits

Notwithstanding the above, nothing in these Terms limits liability for:
• Death or personal injury caused by negligence
• Fraud or fraudulent misrepresentation
• Any liability that cannot be excluded by law`,
      icon: <Scale size={20} />,
      lastUpdated: 'December 15, 2023'
    },
    {
      id: 'warranties',
      title: 'Warranties & Disclaimers',
      content: `Our Services are provided "as is" without warranties of any kind, either express or implied.

Disclaimers:
• We do not warrant that Services will be uninterrupted or error-free
• We do not warrant that Services will meet your specific requirements
• We do not warrant the accuracy or completeness of any information

Your Warranties:
• You have the authority to enter into this agreement
• Your content does not infringe third-party rights
• You will comply with all applicable laws and regulations

Third-Party Services: We are not responsible for third-party services integrated with our platform.`,
      icon: <AlertCircle size={20} />,
      lastUpdated: 'December 15, 2023'
    },
    {
      id: 'termination',
      title: 'Term & Termination',
      content: `These Terms remain effective until terminated by either party.

Termination Rights:
• We may terminate for material breach with 30 days notice
• Either party may terminate for convenience with 30 days notice
• Immediate termination for violations of acceptable use policies

Effects of Termination:
• All licenses and rights granted will cease
• You must stop using our Services
• We may delete your data after 90 days
• Outstanding payments become immediately due

Survival: Provisions relating to intellectual property, confidentiality, liability, and indemnification survive termination.`,
      icon: <Clock size={20} />,
      lastUpdated: 'December 15, 2023'
    },
    {
      id: 'disputes',
      title: 'Dispute Resolution',
      content: `We prefer to resolve disputes amicably through negotiation.

Process:
1. Informal Resolution: Parties will attempt to resolve disputes through good faith negotiation for 30 days
2. Mediation: If negotiation fails, parties will attempt mediation before pursuing litigation
3. Arbitration: Disputes may be resolved through binding arbitration under [Arbitration Association] rules
4. Litigation: If arbitration fails, disputes will be resolved in courts located in [Your State/Country]

Governing Law: These Terms are governed by the laws of the State of [Your State], without regard to conflict of law principles.

Class Action Waiver: You waive any right to participate in class actions against us.`,
      icon: <Scale size={20} />,
      lastUpdated: 'December 15, 2023'
    },
    {
      id: 'updates',
      title: 'Updates to Terms',
      content: `We may update these Terms periodically to reflect changes in our practices or legal requirements.

Update Process:
• We will post updated Terms on our website
• We will update the "Last Updated" date
• For material changes, we will provide at least 30 days notice
• Continued use after updates constitutes acceptance

Your Rights:
• You may review current Terms at any time
• You may terminate your account if you disagree with updates
• Historical versions are available upon request

Notification: We may notify you of updates via email or through our Services.`,
      icon: <FileText size={20} />,
      lastUpdated: 'December 15, 2023'
    }
  ];

  const importantTerms: ImportantTerm[] = [
    {
      id: 'liability-cap',
      title: 'Liability Cap',
      description: 'Our liability is limited to the fees paid in the last 12 months',
      icon: <Scale size={20} />
    },
    {
      id: 'data-ownership',
      title: 'Data Ownership',
      description: 'Your data remains yours, our code remains ours',
      icon: <Database size={20} />
    },
    {
      id: 'payment-terms',
      title: 'Payment Terms',
      description: 'Invoices due in 30 days, 1.5% monthly interest for late payments',
      icon: <CreditCard size={20} />
    },
    {
      id: 'termination',
      title: 'Termination',
      description: '30-day notice for termination, 90-day data retention after termination',
      icon: <Clock size={20} />
    },
    {
      id: 'dispute-resolution',
      title: 'Dispute Resolution',
      description: 'Negotiation → Mediation → Arbitration → Litigation',
      icon: <Scale size={20} />
    },
    {
      id: 'updates',
      title: 'Terms Updates',
      description: '30-day notice for material changes, continued use equals acceptance',
      icon: <FileText size={20} />
    }
  ];

  const serviceTiers: ServiceTier[] = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'For small projects and proof of concepts',
      price: '$5,000 - $25,000',
      features: [
        'Basic project management',
        'Standard support (9-5, Mon-Fri)',
        'Monthly progress reports',
        '3 rounds of revisions',
        '60-day warranty'
      ],
      restrictions: [
        'Maximum 3-month project duration',
        'No dedicated account manager',
        'Limited to web technologies',
        'No SLA guarantees',
        'Source code escrow not included'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'For growing businesses and established projects',
      price: '$25,000 - $100,000',
      features: [
        'Dedicated project manager',
        'Priority support (24/5)',
        'Weekly progress reports',
        'Unlimited revisions',
        '180-day warranty',
        '99.5% SLA guarantee',
        'Source code escrow'
      ],
      restrictions: [
        '6-month minimum contract',
        'Requires credit check',
        'Maximum team size: 5 developers'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations and mission-critical systems',
      price: 'Custom Pricing',
      features: [
        'Dedicated account team',
        '24/7 premium support',
        'Real-time dashboards',
        'Custom SLA up to 99.99%',
        'Full source code ownership',
        'On-site consultation',
        'Security audits',
        'Business continuity planning'
      ],
      restrictions: [
        'Annual contracts only',
        'Enterprise security requirements',
        'Compliance certifications required'
      ]
    }
  ];

  const generateTermsText = () => {
    let text = `KINSTRY SYSTEMS TERMS AND CONDITIONS\n`;
    text += `=======================================\n\n`;
    text += `Effective Date: ${effectiveDate}\n`;
    text += `Last Updated: ${lastUpdated}\n`;
    text += `Version: 3.2\n\n`;
    
    text += `UNDERSTANDING OUR AGREEMENT\n`;
    text += `==========================\n`;
    text += `These Terms and Conditions establish the legal framework for our partnership. They define our respective rights, responsibilities, and expectations to ensure successful collaboration.\n\n`;
    
    text += `SERVICE TIERS & PRICING MODELS\n`;
    text += `==============================\n`;
    serviceTiers.forEach(tier => {
      text += `\n${tier.name.toUpperCase()} - ${tier.price}\n`;
      text += `${tier.description}\n\n`;
      text += `INCLUDED FEATURES:\n`;
      tier.features.forEach(feature => text += `• ${feature}\n`);
      text += `\nRESTRICTIONS:\n`;
      tier.restrictions.forEach(restriction => text += `• ${restriction}\n`);
      text += `\n`;
    });
    
    termSections.forEach(section => {
      text += `${section.title.toUpperCase()}\n`;
      text += `${'='.repeat(section.title.length)}\n\n`;
      text += `${section.content}\n\n`;
      
      if (section.id === 'payments') {
        text += `PAYMENT SCHEDULE & METHODS:\n`;
        text += `• Standard Payment Terms:\n`;
        text += `  - 50% upfront for project-based work\n`;
        text += `  - 25% upon milestone completion\n`;
        text += `  - 25% upon project delivery\n`;
        text += `  - Subscription fees billed monthly in advance\n\n`;
        text += `• Accepted Payment Methods:\n`;
        text += `  - Bank Transfer (ACH/Wire)\n`;
        text += `  - Credit Cards (Visa, MasterCard, Amex)\n`;
        text += `  - Digital Payments (PayPal, Stripe)\n`;
        text += `  - Cryptocurrency (BTC, ETH by special arrangement)\n\n`;
      }
      
      if (section.id === 'intellectual-property') {
        text += `INTELLECTUAL PROPERTY FRAMEWORK:\n`;
        text += `• Kinstry Owns:\n`;
        text += `  - Proprietary software frameworks\n`;
        text += `  - Development methodologies\n`;
        text += `  - Internal tools and libraries\n`;
        text += `  - Trademarks and branding\n\n`;
        text += `• Client Owns:\n`;
        text += `  - Custom developed source code\n`;
        text += `  - Project-specific documentation\n`;
        text += `  - Client-provided content and data\n`;
        text += `  - Business processes and workflows\n\n`;
      }
      
      if (section.id === 'liability') {
        text += `LIABILITY SCENARIOS:\n`;
        text += `• Covered by Liability:\n`;
        text += `  - Direct financial losses resulting from our breach of contract\n\n`;
        text += `• Excluded from Liability:\n`;
        text += `  - Indirect damages, lost profits, or data loss due to client errors\n\n`;
      }
      
      text += `\n`;
    });
    
    text += `IMPORTANT TERMS\n`;
    text += `==============\n\n`;
    importantTerms.forEach(term => {
      text += `• ${term.title}: ${term.description}\n`;
    });
    
    text += `\nFREQUENTLY ASKED QUESTIONS\n`;
    text += `=========================\n\n`;
    text += `• Can I negotiate these terms?\n`;
    text += `  Yes, for enterprise agreements we're open to negotiation on specific clauses. Contact our legal team to discuss custom terms.\n\n`;
    text += `• What happens if I breach the terms?\n`;
    text += `  We'll provide a 14-day cure period for most breaches. Repeated or serious breaches may result in immediate termination and legal action.\n\n`;
    text += `• Are there different terms for different services?\n`;
    text += `  Yes, specific services may have supplemental terms. The main Terms apply broadly, with service-specific details in separate agreements.\n\n`;
    text += `• How do I terminate my agreement?\n`;
    text += `  Provide written notice 30 days before your next billing cycle. Contact accounts@kinstrysystems.com for termination requests.\n\n`;
    
    text += `CONTACT LEGAL TEAM\n`;
    text += `=================\n\n`;
    text += `Email: legal@kinstrysystems.com\n`;
    text += `Book Consultation: Visit our contact page to schedule a free 30-minute initial consultation\n\n`;
    
    text += `© ${new Date().getFullYear()} Kinstry Systems. All rights reserved.\n`;
    
    return text;
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      const termsText = generateTermsText();
      
      // Create a blob with the text
      const blob = new Blob([termsText], { type: 'text/plain' });
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Kinstry_Systems_Terms_Conditions_${lastUpdated.replace(/\s+/g, '_')}.txt`;
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Revoke the blob URL
      window.URL.revokeObjectURL(url);
      
      // Show success feedback (optional)
      console.log('Terms and Conditions downloaded successfully');
      
    } catch (error) {
      console.error('Error downloading terms and conditions:', error);
      // You could add a toast notification here
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="terms-container">
      {/* Header */}
      <header className="terms-header">
        <div className="container">
          <div className="terms-header-content">
            <div className="terms-header-badge">
              <Scale size={24} />
              <span>Terms & Conditions</span>
            </div>
            <h1 className="terms-main-title">
              Our <span className="gradient-text">Legal Framework</span> for Partnership
            </h1>
            <p className="terms-subtitle">
              Clear, transparent terms that protect both parties and foster successful collaboration
            </p>
            
            <div className="terms-meta-info">
              <div className="meta-item">
                <Clock size={16} />
                <span>Effective: {effectiveDate}</span>
              </div>
              <div className="meta-item">
                <Clock size={16} />
                <span>Last Updated: {lastUpdated}</span>
              </div>
              <div className="meta-item">
                <FileText size={16} />
                <span>Version 3.2</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="terms-main-content">
        <div className="container">
          <div className="terms-content-layout">
            {/* Table of Contents */}
            <aside className="terms-sidebar">
              <div className="sidebar-card glass">
                <h3 className="sidebar-title">
                  <BookOpen size={20} />
                  Quick Navigation
                </h3>
                <nav className="toc-nav">
                  <ul>
                    {termSections.map((section) => (
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
                    onClick={() => setShowAcceptModal(true)}
                    disabled={acceptedTerms}
                  >
                    {acceptedTerms ? (
                      <>
                        <CheckCircle size={16} />
                        Terms Accepted
                      </>
                    ) : (
                      <>
                        <UserCheck size={16} />
                        Accept Terms
                      </>
                    )}
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

              {/* Important Terms */}
              <div className="important-terms-card glass">
                <h4>
                  <AlertCircle size={20} />
                  Key Provisions
                </h4>
                <div className="important-terms-list">
                  {importantTerms.map((term) => (
                    <div key={term.id} className="important-term">
                      <div className="term-icon">
                        {term.icon}
                      </div>
                      <div className="term-content">
                        <h5>{term.title}</h5>
                        <p>{term.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Terms Content */}
            <div className="terms-content">
              {/* Introduction */}
              <div className="terms-intro-card card">
                <div className="intro-icon">
                  <Scale size={32} />
                </div>
                <h2>Understanding Our Agreement</h2>
                <p>
                  These Terms and Conditions establish the legal framework for our partnership. 
                  They define our respective rights, responsibilities, and expectations to ensure 
                  successful collaboration. We believe in transparency and fairness, and these 
                  terms reflect our commitment to ethical business practices.
                </p>
                
                <div className="intro-stats">
                  <div className="stat">
                    <div className="stat-number">30</div>
                    <div className="stat-label">Day Review Period</div>
                  </div>
                  <div className="stat">
                    <div className="stat-number">99%</div>
                    <div className="stat-label">Client Satisfaction</div>
                  </div>
                  <div className="stat">
                    <div className="stat-number">24/7</div>
                    <div className="stat-label">Legal Support</div>
                  </div>
                </div>
              </div>

              {/* Service Tiers */}
              <div className="service-tiers-section">
                <div className="section-header">
                  <div className="section-icon">
                    <Server size={20} />
                  </div>
                  <h2>Service Tiers & Pricing Models</h2>
                  <p className="section-description">
                    Different engagement models with varying terms and conditions
                  </p>
                </div>
                
                <div className="service-tiers-grid">
                  {serviceTiers.map((tier) => (
                    <div key={tier.id} className={`service-tier-card ${tier.id}`}>
                      <div className="tier-header">
                        <h3>{tier.name}</h3>
                        <div className="tier-price">{tier.price}</div>
                        <p className="tier-description">{tier.description}</p>
                      </div>
                      
                      <div className="tier-features">
                        <h4>
                          <CheckCircle size={16} />
                          Included Features
                        </h4>
                        <ul>
                          {tier.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="tier-restrictions">
                        <h4>
                          <XCircle size={16} />
                          Restrictions
                        </h4>
                        <ul>
                          {tier.restrictions.map((restriction, index) => (
                            <li key={index}>{restriction}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terms Sections */}
              {termSections.map((section) => (
                <section 
                  key={section.id}
                  id={section.id}
                  className="terms-section"
                >
                  <div className="section-header">
                    <div className="section-icon">
                      {section.icon}
                    </div>
                    <h2>{section.title}</h2>
                    <div className="section-meta">
                      <Clock size={14} />
                      <span>Updated: {section.lastUpdated}</span>
                    </div>
                  </div>
                  
                  <div className="section-content">
                    <p>{section.content}</p>
                    
                    {/* Additional content for specific sections */}
                    {section.id === 'payments' && (
                      <div className="payment-details">
                        <h4>Payment Schedule & Methods</h4>
                        <div className="payment-grid">
                          <div className="payment-method">
                            <h5>Standard Payment Terms</h5>
                            <ul>
                              <li>50% upfront for project-based work</li>
                              <li>25% upon milestone completion</li>
                              <li>25% upon project delivery</li>
                              <li>Subscription fees billed monthly in advance</li>
                            </ul>
                          </div>
                          <div className="payment-method">
                            <h5>Accepted Payment Methods</h5>
                            <ul>
                              <li>Bank Transfer (ACH/Wire)</li>
                              <li>Credit Cards (Visa, MasterCard, Amex)</li>
                              <li>Digital Payments (PayPal, Stripe)</li>
                              <li>Cryptocurrency (BTC, ETH by special arrangement)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {section.id === 'intellectual-property' && (
                      <div className="ip-details">
                        <h4>Intellectual Property Framework</h4>
                        <div className="ip-grid">
                          <div className="ip-category">
                            <h5>Kinstry Owns</h5>
                            <ul>
                              <li>Proprietary software frameworks</li>
                              <li>Development methodologies</li>
                              <li>Internal tools and libraries</li>
                              <li>Trademarks and branding</li>
                            </ul>
                          </div>
                          <div className="ip-category">
                            <h5>Client Owns</h5>
                            <ul>
                              <li>Custom developed source code</li>
                              <li>Project-specific documentation</li>
                              <li>Client-provided content and data</li>
                              <li>Business processes and workflows</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {section.id === 'liability' && (
                      <div className="liability-details">
                        <h4>Liability Scenarios</h4>
                        <div className="liability-examples">
                          <div className="example covered">
                            <div className="example-header">
                              <CheckCircle size={20} />
                              <h5>Covered by Liability</h5>
                            </div>
                            <p>Direct financial losses resulting from our breach of contract</p>
                          </div>
                          <div className="example excluded">
                            <div className="example-header">
                              <XCircle size={20} />
                              <h5>Excluded from Liability</h5>
                            </div>
                            <p>Indirect damages, lost profits, or data loss due to client errors</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              ))}

              {/* FAQ Section */}
              <div className="faq-section card">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-grid">
                  <div className="faq-item">
                    <div className="faq-question">
                      <HelpCircle size={20} />
                      <h5>Can I negotiate these terms?</h5>
                    </div>
                    <div className="faq-answer">
                      Yes, for enterprise agreements we're open to negotiation on specific clauses. 
                      Contact our legal team to discuss custom terms.
                    </div>
                  </div>
                  
                  <div className="faq-item">
                    <div className="faq-question">
                      <HelpCircle size={20} />
                      <h5>What happens if I breach the terms?</h5>
                    </div>
                    <div className="faq-answer">
                      We'll provide a 14-day cure period for most breaches. Repeated or serious 
                      breaches may result in immediate termination and legal action.
                    </div>
                  </div>
                  
                  <div className="faq-item">
                    <div className="faq-question">
                      <HelpCircle size={20} />
                      <h5>Are there different terms for different services?</h5>
                    </div>
                    <div className="faq-answer">
                      Yes, specific services may have supplemental terms. The main Terms apply 
                      broadly, with service-specific details in separate agreements.
                    </div>
                  </div>
                  
                  <div className="faq-item">
                    <div className="faq-question">
                      <HelpCircle size={20} />
                      <h5>How do I terminate my agreement?</h5>
                    </div>
                    <div className="faq-answer">
                      Provide written notice 30 days before your next billing cycle. 
                      Contact accounts@kinstrysystems.com for termination requests.
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Legal */}
              <div className="legal-contact-section card">
                <h2>Need Legal Assistance?</h2>
                <div className="contact-options">
                  <div className="contact-option">
                    <Mail size={24} />
                    <div>
                      <h5>Email Legal Team</h5>
                      <a href="mailto:legal@kinstrysystems.com">legal@kinstrysystems.com</a>
                      <p>Response within 24 business hours</p>
                    </div>
                  </div>
                  
                  <div className="contact-option">
                    <MessageSquare size={24} />
                    <div>
                      <h5>Schedule Consultation</h5>
                      <a onClick={() => navigate('/contact')} style={{cursor: 'pointer'}}>Book Legal Consultation</a>
                      <p>30-minute free initial consultation</p>
                    </div>
                  </div>
                  
                  <div className="contact-option">
                    <ExternalLink size={24} />
                    <div>
                      <h5>View Additional Documents</h5>
                      <div className="document-links">
                        <a href="/privacy-policy">Privacy Policy</a>
                        <a href="#cookie">Cookie Policy</a>
                        <a href="#nda">Standard NDA</a>
                      </div>
                    </div>
                  </div>
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

      {/* Accept Terms Modal */}
      {showAcceptModal && (
        <div className="accept-modal-overlay">
          <div className="accept-modal glass">
            <div className="modal-header">
              <Scale size={32} />
              <h3>Accept Terms & Conditions</h3>
            </div>
            
            <div className="modal-content">
              <p>
                By clicking "Accept", you acknowledge that you have read, understood, 
                and agree to be bound by the Terms and Conditions of Kinstry Systems.
              </p>
              
              <div className="acceptance-points">
                <div className="acceptance-point">
                  <CheckCircle size={16} />
                  <span>I have read and understood the Terms</span>
                </div>
                <div className="acceptance-point">
                  <CheckCircle size={16} />
                  <span>I agree to the payment terms and liability provisions</span>
                </div>
                <div className="acceptance-point">
                  <CheckCircle size={16} />
                  <span>I consent to electronic communications</span>
                </div>
                <div className="acceptance-point">
                  <CheckCircle size={16} />
                  <span>I confirm I am authorized to accept these Terms</span>
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowAcceptModal(false)}
                >
                  Review Again
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleAcceptTerms}
                >
                  Accept & Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Terms;