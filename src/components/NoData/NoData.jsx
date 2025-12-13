import React from 'react';
import './NoData.css';

const NoData = ({ 
  title = "No Content Available", 
  description = "We couldn't find any content for the selected category.",
  stats = { total: 0, available: 0, upcoming: 0 },
  primaryAction = null,
  onWelcomeClick = () => window.location.href = '/', // Default welcome navigation
  onBack = () => window.history.back()
}) => {
  return (
    <div className="nd-container" role="alert" aria-live="polite">
      {/* Animated Illustration */}
      <div className="nd-illustration">
        <svg className="nd-svg" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="95" className="nd-outer-circle" strokeWidth="2" fill="none" />
          <circle cx="100" cy="100" r="75" className="nd-inner-circle" strokeWidth="1.5" fill="none" />
          <path d="M70,70 L130,130" className="nd-search-icon" strokeWidth="3" strokeLinecap="round" />
          <path d="M130,70 L70,130" className="nd-search-icon" strokeWidth="3" strokeLinecap="round" />
          <path d="M85,130 L115,130" className="nd-folder" strokeWidth="2" strokeLinecap="round" />
          <rect x="80" y="110" width="40" height="20" className="nd-folder" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Content */}
      <div className="nd-content">
        <h1 className="nd-title">{title}</h1>
        <p className="nd-description">{description}</p>

        {/* Stats */}
        <div className="nd-stats">
          <div className="nd-stat-card">
            <div className="nd-stat-icon">📊</div>
            <div className="nd-stat-value">{stats.total}</div>
            <div className="nd-stat-label">Total Items</div>
          </div>
          <div className="nd-stat-card">
            <div className="nd-stat-icon">✅</div>
            <div className="nd-stat-value">{stats.available}</div>
            <div className="nd-stat-label">Available</div>
          </div>
          <div className="nd-stat-card">
            <div className="nd-stat-icon">⏳</div>
            <div className="nd-stat-value">{stats.upcoming}</div>
            <div className="nd-stat-label">Upcoming</div>
          </div>
        </div>

        {/* Actions */}
        <div className="nd-actions">
          {primaryAction && (
            <button 
              className="nd-btn nd-btn-primary"
              onClick={primaryAction.onClick}
              aria-label={primaryAction.label}
            >
              <span className="nd-btn-icon">{primaryAction.icon || "🔍"}</span>
              <span className="nd-btn-text">{primaryAction.text || "Explore Content"}</span>
            </button>
          )}
          
          {/* Welcome Button */}
          <button 
            className="nd-btn nd-btn-welcome"
            onClick={onWelcomeClick}
            aria-label="Return to welcome page"
          >
            <span className="nd-btn-icon">🏠</span>
            <span className="nd-btn-text">Back to Welcome</span>
          </button>

          {/* Quick Tip */}
          <div className="nd-hint">
            <span className="nd-hint-icon">💡</span>
            <span className="nd-hint-text">
              Try selecting a different category or check back later for updates
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoData;