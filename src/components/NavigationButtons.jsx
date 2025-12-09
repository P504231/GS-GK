import React from 'react';
import './NavigationButtons.css';

const NavigationButtons = ({ onPrevious, onNext, hasPrevious, hasNext }) => {
  return (
    <div className="navigation-container">
      <button className="nav-btn prev-btn" onClick={onPrevious} disabled={!hasPrevious} aria-label="Previous">
        <div className="nav-arrow">⬆️</div>
        <div className="nav-text">Previous</div>
      </button>

      <div className="nav-instruction">
        <div className="key-hint">
          <span className="key-icon">↑</span>
          <span>Use arrow keys or buttons</span>
          <span className="key-icon">↓</span>
        </div>
      </div>

      <button className="nav-btn next-btn" onClick={onNext} disabled={!hasNext} aria-label="Next">
        <div className="nav-arrow">⬇️</div>
        <div className="nav-text">Next</div>
      </button>
    </div>
  );
};

export default NavigationButtons;