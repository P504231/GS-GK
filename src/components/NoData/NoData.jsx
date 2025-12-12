import React, { useMemo } from 'react';
import './NoData.css';

const NoData = ({ 
  categoryFilter, 
  totalItems = 0, 
  pictorialNotesCount = 0, 
  videosCount = 0,
  onShowAll,
  onBack
}) => {
  const { title, message, stats } = useMemo(() => {
    let title, message;
    
    if (categoryFilter === 'Pictorial Notes') {
      title = 'No Pictorial Notes';
      message = 'There are no pictorial notes in this category yet.';
    } else if (categoryFilter) {
      title = `No ${categoryFilter} Content`;
      message = `No "${categoryFilter}" content found. Try another category or show all content.`;
    } else {
      title = 'No Content Available';
      message = 'No content has been loaded. Please check your data source.';
    }

    const stats = [
      { icon: '📊', value: totalItems, label: 'Total Items' },
      { icon: '🎬', value: videosCount, label: 'Videos' },
      { icon: '📷', value: pictorialNotesCount, label: 'Pictorial Notes' }
    ];

    return { title, message, stats };
  }, [categoryFilter, totalItems, pictorialNotesCount, videosCount]);

  const hasBackButton = onBack && categoryFilter;

  return (
    <div className="no-data-container">
      {/* Illustration Section */}
      <div className="no-data-illustration">
        <div className="illustration-wrapper">
          <svg className="illustration-svg" viewBox="0 0 120 120" fill="none">
            <circle 
              className="outer-circle" 
              cx="60" cy="60" r="55" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeDasharray="6 6"
            />
            <g className="search-icon">
              <circle 
                cx="45" cy="45" r="20" 
                stroke="currentColor" 
                strokeWidth="3"
              />
              <path 
                d="M75 75L95 95" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
            </g>
            <g className="empty-folder" opacity="0.5">
              <path 
                d="M30 70L35 65H85L90 70" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
              <rect 
                x="30" y="40" width="60" height="25" rx="3" 
                stroke="currentColor" 
                strokeWidth="2"
              />
            </g>
            <circle 
              className="inner-circle" 
              cx="60" cy="60" r="30" 
              stroke="currentColor" 
              strokeWidth="2" 
              opacity="0.2"
            />
          </svg>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="no-data-content">
        <h1 className="no-data-title">{title}</h1>
        
        <p className="no-data-description">
          {message}
        </p>
        
        {/* Stats Section */}
        <div className="no-data-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
        
        {/* Actions Section */}
        <div className="no-data-actions">
          {onShowAll && (
            <button 
              onClick={onShowAll}
              className="action-btn btn-primary"
              aria-label="Show all content"
            >
              <span className="btn-icon" role="img" aria-hidden="true">🔍</span>
              <span className="btn-text">Show All Content</span>
            </button>
          )}
          
          {hasBackButton && (
            <button 
              onClick={onBack}
              className="action-btn btn-secondary"
              aria-label="Back to categories"
            >
              <span className="btn-icon" role="img" aria-hidden="true">↩️</span>
              <span className="btn-text">Back to Categories</span>
            </button>
          )}
          
          {!hasBackButton && onShowAll && (
            <div className="action-hint" role="note">
              <span className="hint-icon" role="img" aria-hidden="true">💡</span>
              <span className="hint-text">Select a different category from the header</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoData;