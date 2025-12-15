import './newsletterstats.css';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// Types based on API response
interface NewsletterStatsData {
  total_subscribers: number;
  active_subscribers: number;
  inactive_subscribers: number;
}

interface NewsletterStatsError {
  message: string;
  status?: number;
}

function NewsletterStats() {
  const [stats, setStats] = useState<NewsletterStatsData>({
    total_subscribers: 0,
    active_subscribers: 0,
    inactive_subscribers: 0
  });

  // API call to fetch newsletter statistics
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery<
    NewsletterStatsData,
    NewsletterStatsError
  >({
    queryKey: ['newsletterStats'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/newsletter/stats/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Include cookies if using session/auth
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          message: errorData.message || `HTTP error! status: ${response.status}`,
          status: response.status
        };
      }

      return response.json();
    },
    refetchInterval: 60000, // Auto-refresh every 60 seconds
    staleTime: 30000, // Data stays fresh for 30 seconds
    retry: 3, // Retry failed requests up to 3 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  useEffect(() => {
    if (data) {
      setStats(data);
    }
  }, [data]);

  const handleRefresh = () => {
    refetch();
  };

  const calculatePercentage = (value: number, total: number) => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };

  const statCards = [
    {
      id: 'total',
      title: 'All Subscribers',
      value: stats.total_subscribers.toLocaleString(),
      percentage: 100,
      change: '+12.5%',
      trend: 'up',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      color: '#409cff',
      gradient: 'linear-gradient(135deg, #409cff, #a855f7)',
      angle: '15deg',
      depth: '12px'
    },
    {
      id: 'active',
      title: 'Active Subscribers',
      value: stats.active_subscribers.toLocaleString(),
      percentage: calculatePercentage(stats.active_subscribers, stats.total_subscribers),
      change: '+8.2%',
      trend: 'up',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
      color: '#00d166',
      gradient: 'linear-gradient(135deg, #00d166, #00b8a9)',
      angle: '25deg',
      depth: '15px'
    },
    {
      id: 'inactive',
      title: 'Inactive Subscribers',
      value: stats.inactive_subscribers.toLocaleString(),
      percentage: calculatePercentage(stats.inactive_subscribers, stats.total_subscribers),
      change: '-3.1%',
      trend: 'down',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      ),
      color: '#ff6b6b',
      gradient: 'linear-gradient(135deg, #ff6b6b, #ff9e7d)',
      angle: '35deg',
      depth: '18px'
    }
  ];

  // Show loading state
  if (isLoading) {
    return (
      <div className="quantum-stats-section">
        <div className="quantum-stats-header">
          <h2 className="quantum-stats-title">
            <span className="quantum-stats-title-text">Subscriber Statistics</span>
            <span className="quantum-stats-title-line"></span>
          </h2>
          <div className="quantum-stats-refresh">
            <button className="quantum-refresh-button" disabled>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 4v6h-6"/>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
              <span>Loading...</span>
            </button>
          </div>
        </div>
        
        <div className="quantum-stats-loading">
          <div className="quantum-loading-content">
            <div className="quantum-loading-spinner"></div>
            <p>Fetching subscriber statistics...</p>
            <p className="quantum-loading-subtext">Connecting to server...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="quantum-stats-section">
        <div className="quantum-stats-header">
          <h2 className="quantum-stats-title">
            <span className="quantum-stats-title-text">Subscriber Statistics</span>
            <span className="quantum-stats-title-line"></span>
          </h2>
          <div className="quantum-stats-refresh">
            <button onClick={handleRefresh} className="quantum-refresh-button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 4v6h-6"/>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
              <span>Retry</span>
            </button>
          </div>
        </div>
        
        <div className="quantum-stats-error">
          <div className="quantum-error-content">
            <div className="quantum-error-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h3 className="quantum-error-title">Unable to Load Statistics</h3>
            <p className="quantum-error-message">
              {error?.message || 'Failed to fetch statistics from server.'}
            </p>
            {error?.status && (
              <p className="quantum-error-status">Status: {error.status}</p>
            )}
            <div className="quantum-error-actions">
              <button onClick={handleRefresh} className="quantum-retry-button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 4v6h-6"/>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                </svg>
                <span>Try Again</span>
              </button>
              <button 
                onClick={() => window.location.reload()} 
                className="quantum-retry-button secondary"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
                <span>Reload Page</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quantum-stats-section">
      <div className="quantum-stats-header">
        <h2 className="quantum-stats-title">
          <span className="quantum-stats-title-text">Subscriber Statistics</span>
          <span className="quantum-stats-title-line"></span>
        </h2>
        <div className="quantum-stats-refresh">
          <button 
            onClick={handleRefresh} 
            className="quantum-refresh-button" 
            disabled={isFetching}
            title={isFetching ? 'Refreshing data...' : 'Refresh statistics'}
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className={isFetching ? 'spinning' : ''}
            >
              <path d="M23 4v6h-6"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            <span>{isFetching ? 'Refreshing...' : 'Refresh'}</span>
            {isFetching && (
              <span className="quantum-refresh-badge">Live</span>
            )}
          </button>
        </div>
      </div>
      
      <div className="quantum-stats-3d-grid">
        {statCards.map((card) => (
          <div 
            key={card.id} 
            className="quantum-stat-3d-card"
            style={{
              '--card-angle': card.angle,
              '--card-depth': card.depth,
              '--card-color': card.color
            } as React.CSSProperties}
          >
            <div className="quantum-3d-card-inner">
              <div className="quantum-3d-card-front">
                <div className="quantum-3d-card-content">
                  <div className="quantum-3d-card-header">
                    <div className="quantum-3d-icon-wrapper">
                      <div className="quantum-3d-icon-glow" style={{ background: card.gradient }}></div>
                      <div className="quantum-3d-icon" style={{ color: card.color }}>
                        {card.icon}
                      </div>
                    </div>
                    <div className={`quantum-3d-change ${card.trend}`}>
                      <span>{card.change}</span>
                    </div>
                  </div>
                  
                  <div className="quantum-3d-value">{card.value}</div>
                  <div className="quantum-3d-title">{card.title}</div>
                  
                  <div className="quantum-3d-progress-section">
                    <div className="quantum-3d-progress-info">
                      <span className="quantum-3d-percentage">{card.percentage}%</span>
                      <span className="quantum-3d-ratio">
                        {card.id === 'total' 
                          ? `${stats.total_subscribers.toLocaleString()} total` 
                          : card.id === 'active'
                          ? `${stats.active_subscribers.toLocaleString()} active`
                          : `${stats.inactive_subscribers.toLocaleString()} inactive`
                        }
                      </span>
                    </div>
                    <div className="quantum-3d-progress-track">
                      <div 
                        className="quantum-3d-progress-fill"
                        style={{
                          width: `${card.percentage}%`,
                          background: card.gradient
                        }}
                      >
                        <div className="quantum-3d-progress-shine"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="quantum-3d-card-side" style={{ background: card.gradient }}></div>
              <div className="quantum-3d-card-bottom" style={{ background: card.gradient }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Last Updated */}
      <div className="quantum-stats-footer">
        <div className="quantum-last-updated">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          <span>Data updates every minute</span>
        </div>
      </div>
    </div>
  );
}

export default NewsletterStats;