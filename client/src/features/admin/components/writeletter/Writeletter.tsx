import './writeletter.css';
import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { format, addDays } from 'date-fns';
import useToastStore from '../../../../store/toastStore';

// Types
interface NewsletterData {
  title: string;
  body: string;
  scheduled_at?: string;
}

interface NewsletterResponse {
  id: number;
  title: string;
  body: string;
  created_at: string;
  scheduled_at: string | null;
  is_sent: boolean;
  message?: string;
}

interface NewsletterError {
  message: string;
  errors?: {
    [key: string]: string[];
  };
}

// Icons
const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const ScheduleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const SaveIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/>
    <polyline points="7 3 7 8 15 8"/>
  </svg>
);

const PreviewIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const ClearIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6L6 18"/>
    <path d="M6 6l12 12"/>
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const BoldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
    <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
  </svg>
);

const ItalicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="4" x2="10" y2="4"/>
    <line x1="14" y1="20" x2="5" y2="20"/>
    <line x1="15" y1="4" x2="9" y2="20"/>
  </svg>
);

const UnderlineIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/>
    <line x1="4" y1="21" x2="20" y2="21"/>
  </svg>
);

const ListBulletIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6"/>
    <line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/>
    <line x1="3" y1="12" x2="3.01" y2="12"/>
    <line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);

const ListNumberIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 6h11"/>
    <path d="M10 12h11"/>
    <path d="M10 18h11"/>
    <path d="M4 6h1v4"/>
    <path d="M4 10h2"/>
    <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>
  </svg>
);

const HeadingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 12h12"/>
    <path d="M6 20V4"/>
    <path d="M18 20V4"/>
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

// Toast wrapper function to handle sequential toasts
const useSequentialToast = () => {
  const showToast = useToastStore(state => state.showToast);
  const toastQueue = useRef<Array<() => void>>([]);
  const isProcessing = useRef(false);

  const processQueue = () => {
    if (toastQueue.current.length > 0 && !isProcessing.current) {
      isProcessing.current = true;
      const nextToast = toastQueue.current.shift();
      if (nextToast) {
        nextToast();
        // Wait for toast duration before processing next
        setTimeout(() => {
          isProcessing.current = false;
          processQueue();
        }, 3500); // Slightly longer than toast duration to ensure smooth transitions
      }
    }
  };

  const showSequentialToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', time = 3, title?: string) => {
    toastQueue.current.push(() => {
      showToast(message, type, time, title);
    });
    
    if (!isProcessing.current) {
      processQueue();
    }
  };

  return showSequentialToast;
};

function Writeletter() {
  // Form state
  const [formData, setFormData] = useState<NewsletterData>({
    title: '',
    body: '',
    scheduled_at: ''
  });

  // UI state
  const [isScheduled, setIsScheduled] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('12:00');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const showToast = useSequentialToast();

  // Initialize date
  useEffect(() => {
    setSelectedDate(getTomorrowDate());
  }, []);

  // Calculate counts
  useEffect(() => {
    const words = formData.body.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    setCharCount(formData.body.length);
  }, [formData.body]);

  // Handle form input changes
  const handleInputChange = (field: keyof NewsletterData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle text formatting
  const formatText = (tag: string, _extra?: string) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    let formattedText = '';
    
    switch (tag) {
      case 'bold':
        formattedText = `**${selectedText || 'bold text'}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText || 'italic text'}*`;
        break;
      case 'underline':
        formattedText = `__${selectedText || 'underlined text'}__`;
        break;
      case 'h1':
        formattedText = `# ${selectedText || 'Heading 1'}`;
        break;
      case 'h2':
        formattedText = `## ${selectedText || 'Heading 2'}`;
        break;
      case 'list':
        formattedText = selectedText 
          ? selectedText.split('\n').map(line => `- ${line}`).join('\n')
          : '- List item';
        break;
      case 'numbered':
        formattedText = selectedText 
          ? selectedText.split('\n').map((line, i) => `${i + 1}. ${line}`).join('\n')
          : '1. Numbered item';
        break;
      case 'link':
        const url = prompt('Enter URL:');
        if (url) {
          formattedText = `[${selectedText || 'link'}](${url})`;
        } else {
          return;
        }
        break;
      default:
        formattedText = selectedText;
    }

    // Insert formatted text
    const newValue = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
    handleInputChange('body', newValue);

    // Focus back on textarea and set cursor position
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + formattedText.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  // Enhanced clear form with toast
  const handleClearForm = () => {
    if (formData.title || formData.body) {
      setFormData({
        title: '',
        body: '',
        scheduled_at: ''
      });
      setIsScheduled(false);
      setSelectedDate(getTomorrowDate());
      setSelectedTime('12:00');
      
      showToast('All form fields have been successfully cleared', 'success', 3, 'Form Cleared');
    } else {
      showToast('Form is already empty', 'info', 2, 'No Action Needed');
    }
  };

  // Enhanced form validation with better error messages
  const validateForm = (): boolean => {
    let isValid = true;

    if (!formData.title.trim()) {
      showToast('Please enter a newsletter title', 'error', 3, 'Missing Title');
      isValid = false;
    } else if (formData.title.length > 200) {
      showToast('Title must be less than 200 characters', 'error', 3, 'Title Too Long');
      isValid = false;
    }

    if (!formData.body.trim()) {
      showToast('Please enter newsletter content', 'error', 3, 'Missing Content');
      isValid = false;
    } else if (formData.body.length < 50) {
      showToast('Newsletter content should be at least 50 characters', 'error', 3, 'Content Too Short');
      isValid = false;
    }

    if (isScheduled && (!selectedDate || !selectedTime)) {
      showToast('Please select both date and time for scheduling', 'error', 3, 'Schedule Incomplete');
      isValid = false;
    } else if (isScheduled && selectedDate && selectedTime) {
      const scheduledDateTime = new Date(`${selectedDate}T${selectedTime}`);
      const now = new Date();
      
      if (scheduledDateTime <= now) {
        showToast('Scheduled time must be in the future', 'error', 3, 'Invalid Schedule Time');
        isValid = false;
      }
    }

    return isValid;
  };

  // Prepare data for submission
  const prepareSubmissionData = (): NewsletterData => {
    const data: NewsletterData = {
      title: formData.title.trim(),
      body: formData.body.trim()
    };

    if (isScheduled && selectedDate && selectedTime) {
      data.scheduled_at = `${selectedDate}T${selectedTime}:00`;
    }

    return data;
  };

  // Set default date to tomorrow
  const getTomorrowDate = () => {
    return format(addDays(new Date(), 1), 'yyyy-MM-dd');
  };

  // Enhanced mutation with better toast handling
  const createMutation = useMutation<NewsletterResponse, NewsletterError, NewsletterData>({
    mutationFn: async (data) => {
      setIsProcessing(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/newsletter/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw {
          message: responseData.message || `HTTP error! status: ${response.status}`,
          errors: responseData.errors
        };
      }

      return responseData;
    },
    onMutate: () => {
      showToast('Creating your newsletter...', 'info', 2, 'Processing');
    },
    onSuccess: (data) => {
      if (isScheduled && data.scheduled_at) {
        showToast(
          `"${data.title}" is scheduled for ${format(new Date(data.scheduled_at), 'MMM dd, yyyy HH:mm')}. It will be sent automatically at the scheduled time.`,
          'success',
          8,
          '🎯 Newsletter Scheduled!'
        );
      } else {
        showToast(
          `The newsletter has been created successfully and is ready to send to subscribers.`,
          'success',
          6,
          '✅ Newsletter Created!'
        );
      }

      // Reset form after success
      setTimeout(() => {
        setFormData({
          title: '',
          body: '',
          scheduled_at: ''
        });
        setIsScheduled(false);
        setSelectedDate(getTomorrowDate());
        setSelectedTime('12:00');
        setIsProcessing(false);
      }, 1000);
    },
    onError: (error) => {
      setIsProcessing(false);
      
      if (error.errors) {
        Object.entries(error.errors).forEach(([field, messages]) => {
          const fieldName = field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ');
          messages.forEach(message => {
            showToast(
              `${fieldName}: ${message}`,
              'error',
              5,
              '⚠️ Validation Error'
            );
          });
        });
      } else {
        showToast(
          error.message || 'Failed to create newsletter. Please check your connection and try again.',
          'error',
          6,
          '❌ Creation Failed'
        );
      }
    },
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isProcessing) {
      showToast('Please wait while we process your previous request', 'warning', 3, 'Already Processing');
      return;
    }

    if (!validateForm()) {
      return;
    }

    const submissionData = prepareSubmissionData();
    createMutation.mutate(submissionData);
  };

  // Enhanced save draft with toast
  const handleSaveDraft = () => {
    if (!formData.title.trim() && !formData.body.trim()) {
      showToast('Cannot save an empty draft', 'warning', 2, 'Empty Draft');
      return;
    }

    try {
      localStorage.setItem('newsletter_draft', JSON.stringify({
        title: formData.title,
        body: formData.body,
        isScheduled,
        selectedDate,
        selectedTime
      }));
      showToast(
        'Your draft has been saved locally. You can load it anytime by refreshing the page.',
        'success',
        4,
        '💾 Draft Saved'
      );
    } catch (error) {
      showToast('Failed to save draft. Storage might be full.', 'error', 3, 'Save Error');
    }
  };

  // Enhanced load draft with toast
  useEffect(() => {
    const savedDraft = localStorage.getItem('newsletter_draft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        if (draft.title || draft.body) {
          setFormData({
            title: draft.title || '',
            body: draft.body || '',
            scheduled_at: ''
          });
          
          if (draft.isScheduled) {
            setIsScheduled(true);
            setSelectedDate(draft.selectedDate || getTomorrowDate());
            setSelectedTime(draft.selectedTime || '12:00');
          }
          
          showToast(
            'Previous draft loaded successfully. You can continue editing where you left off.',
            'info',
            4,
            '📝 Draft Loaded'
          );
        }
      } catch (error) {
        console.error('Failed to load draft:', error);
      }
    }
  }, []);

  // Enhanced preview with toast
  const handlePreview = () => {
    if (!formData.title.trim() || !formData.body.trim()) {
      showToast('Please add some content before previewing', 'info', 3, 'Preview Unavailable');
      return;
    }
    
    showToast(
      'Preview feature is under development. Coming in the next update with live markdown rendering!',
      'info',
      5,
      '🔮 Preview Coming Soon'
    );
  };

  return (
    <div className="quantum-writeletter">
      {/* Header */}
      <div className="quantum-writeletter-header">
        <h2 className="quantum-writeletter-title">Create Newsletter</h2>
        <p className="quantum-writeletter-subtitle">
          Craft your newsletter content and schedule delivery
        </p>
      </div>

      <form onSubmit={handleSubmit} className="quantum-writeletter-form">
        {/* Left Panel - Form Fields */}
        <div className="quantum-form-section">
          {/* Title Input */}
          <div className="quantum-form-group">
            <label className="quantum-form-label">
              Newsletter Title *
              <span className="quantum-label-hint">Maximum 200 characters</span>
            </label>
            <div className="quantum-input-wrapper">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter newsletter title..."
                className="quantum-form-input"
                maxLength={200}
                required
              />
              <div className="quantum-char-counter">
                {formData.title.length}/200
              </div>
            </div>
          </div>

          {/* Schedule Toggle */}
          <div className="quantum-form-group">
            <div className="quantum-schedule-toggle">
              <label className="quantum-toggle-wrapper">
                <input
                  type="checkbox"
                  checked={isScheduled}
                  onChange={(e) => setIsScheduled(e.target.checked)}
                  className="quantum-toggle-checkbox"
                />
                <div className="quantum-toggle-slider">
                  <div className="quantum-toggle-knob"></div>
                </div>
                <div className="quantum-toggle-content">
                  <ScheduleIcon />
                  <span className="quantum-toggle-label">Schedule for later</span>
                  <span className="quantum-toggle-desc">Send at a specific date and time</span>
                </div>
              </label>
            </div>

            {isScheduled && (
              <div className="quantum-schedule-fields">
                <div className="quantum-schedule-grid">
                  <div className="quantum-form-group">
                    <label className="quantum-form-label">
                      <CalendarIcon />
                      Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={format(new Date(), 'yyyy-MM-dd')}
                      className="quantum-form-input"
                      required={isScheduled}
                    />
                  </div>
                  <div className="quantum-form-group">
                    <label className="quantum-form-label">
                      <ClockIcon />
                      Time
                    </label>
                    <input
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="quantum-form-input"
                      required={isScheduled}
                    />
                  </div>
                </div>
                
                {selectedDate && selectedTime && (
                  <div className="quantum-schedule-preview">
                    <div className="quantum-preview-content">
                      <span className="quantum-preview-label">Scheduled for:</span>
                      <span className="quantum-preview-value">
                        {format(new Date(`${selectedDate}T${selectedTime}`), 'PPp')}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Enhanced Statistics */}
          <div className="quantum-form-group">
            <div className="quantum-stats-grid">
              <div className="quantum-stat-item">
                <span className="quantum-stat-label">Words</span>
                <span className="quantum-stat-value">{wordCount}</span>
                <span className="quantum-stat-hint">
                  {wordCount < 50 ? 'Add more content' : wordCount < 200 ? 'Good length' : 'Excellent'}
                </span>
              </div>
              <div className="quantum-stat-item">
                <span className="quantum-stat-label">Characters</span>
                <span className="quantum-stat-value">{charCount}</span>
                <span className="quantum-stat-hint">
                  {charCount < 300 ? 'Keep going' : 'Great length'}
                </span>
              </div>
              <div className="quantum-stat-item">
                <span className="quantum-stat-label">Status</span>
                <span className={`quantum-status-badge ${
                  isProcessing ? 'processing' : 
                  createMutation.isPending ? 'loading' : 
                  'ready'
                }`}>
                  {isProcessing ? 'Processing...' : 
                   createMutation.isPending ? 'Creating...' : 
                   'Ready'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Editor */}
        <div className="quantum-editor-section">
          {/* Editor Header - Toolbar */}
          <div className="quantum-editor-header">
            <div className="quantum-toolbar">
              <div className="quantum-tool-group">
                <button
                  type="button"
                  className="quantum-tool-button"
                  onClick={() => formatText('bold')}
                  title="Bold (Ctrl+B)"
                >
                  <BoldIcon />
                </button>
                <button
                  type="button"
                  className="quantum-tool-button"
                  onClick={() => formatText('italic')}
                  title="Italic (Ctrl+I)"
                >
                  <ItalicIcon />
                </button>
                <button
                  type="button"
                  className="quantum-tool-button"
                  onClick={() => formatText('underline')}
                  title="Underline (Ctrl+U)"
                >
                  <UnderlineIcon />
                </button>
              </div>
              
              <div className="quantum-tool-group">
                <button
                  type="button"
                  className="quantum-tool-button"
                  onClick={() => formatText('h1')}
                  title="Heading 1"
                >
                  <HeadingIcon />
                </button>
                <button
                  type="button"
                  className="quantum-tool-button"
                  onClick={() => formatText('h2')}
                  title="Heading 2"
                >
                  <span>H2</span>
                </button>
              </div>
              
              <div className="quantum-tool-group">
                <button
                  type="button"
                  className="quantum-tool-button"
                  onClick={() => formatText('list')}
                  title="Bullet List"
                >
                  <ListBulletIcon />
                </button>
                <button
                  type="button"
                  className="quantum-tool-button"
                  onClick={() => formatText('numbered')}
                  title="Numbered List"
                >
                  <ListNumberIcon />
                </button>
                <button
                  type="button"
                  className="quantum-tool-button"
                  onClick={() => formatText('link')}
                  title="Insert Link (Ctrl+K)"
                >
                  <LinkIcon />
                </button>
              </div>
            </div>
          </div>

          {/* Editor Content */}
          <div className="quantum-editor-container">
            <textarea
              ref={textareaRef}
              value={formData.body}
              onChange={(e) => handleInputChange('body', e.target.value)}
              placeholder="✨ Start writing your newsletter content here...

Use markdown formatting:
# Heading 1
## Heading 2
**bold text**
*italic text*
- Bullet point
1. Numbered list
[Link text](https://example.com)

Or use the toolbar above for quick formatting.

💡 Tip: Write compelling content that engages your readers and adds value to their day."
              className="quantum-content-editor"
              spellCheck="true"
              rows={20}
            />
            
            {/* Enhanced Markdown Preview */}
            {formData.body && (
              <div className="quantum-markdown-preview">
                <div className="quantum-preview-header">
                  <span className="quantum-preview-title">Live Preview</span>
                  <span className="quantum-preview-hint">{wordCount} words • {charCount} characters</span>
                </div>
                <div className="quantum-preview-content">
                  {formData.body.substring(0, 500)}
                  {formData.body.length > 500 && (
                    <span className="quantum-preview-more">... (showing first 500 characters)</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Editor Footer - Actions */}
          <div className="quantum-editor-footer">
            <div className="quantum-action-buttons">
              <button
                type="button"
                className="quantum-action-button secondary"
                onClick={handleClearForm}
                disabled={createMutation.isPending || isProcessing}
              >
                <ClearIcon />
                <span>Clear All</span>
              </button>
              
              <button
                type="button"
                className="quantum-action-button"
                onClick={handleSaveDraft}
                disabled={createMutation.isPending || isProcessing}
              >
                <SaveIcon />
                <span>Save Draft</span>
              </button>
              
              <button
                type="button"
                className="quantum-action-button"
                onClick={handlePreview}
                disabled={createMutation.isPending || isProcessing}
              >
                <PreviewIcon />
                <span>Preview</span>
              </button>
              
              <button
                type="submit"
                className="quantum-action-button primary"
                disabled={createMutation.isPending || isProcessing}
              >
                {createMutation.isPending || isProcessing ? (
                  <>
                    <div className="quantum-spinner"></div>
                    <span>Processing...</span>
                  </>
                ) : isScheduled ? (
                  <>
                    <ScheduleIcon />
                    <span>Schedule Newsletter</span>
                  </>
                ) : (
                  <>
                    <SendIcon />
                    <span>Create Newsletter</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Enhanced Status Bar */}
      <div className="quantum-status-bar">
        <div className="quantum-status-content">
          <div className="quantum-status-item">
            <div className={`quantum-status-indicator ${
              isProcessing ? 'processing' : 
              createMutation.isPending ? 'loading' : 
              'idle'
            }`}></div>
            <span>
              {isProcessing ? 'Processing your request...' : 
               createMutation.isPending ? 'Creating newsletter...' : 
               'Ready to create newsletter'}
            </span>
          </div>
          
          {isScheduled && selectedDate && selectedTime && (
            <div className="quantum-status-item">
              <ClockIcon />
              <span>Scheduled: {format(new Date(`${selectedDate}T${selectedTime}`), 'PPp')}</span>
            </div>
          )}
          
          <div className="quantum-status-item">
            <div className="quantum-tips">
              💡 <span>Tip: Use markdown for rich formatting</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Writeletter;