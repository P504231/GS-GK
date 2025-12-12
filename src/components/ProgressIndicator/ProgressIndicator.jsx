import React from 'react';
import './ProgressIndicator.css';

const ProgressIndicator = ({ 
  items, 
  currentDotIndex, 
  onDotClick,
  currentItem
}) => {

  if (!items || items.length === 0) return null;

  // ACTIVE = white dot, INACTIVE = blue dot
  const getDotClass = (index) => {
    return index === currentDotIndex ? "dot active" : "dot";
  };

  const getDotLabel = (item, index) => {
    if (item.type === 'image') return `Pictorial Note ${index + 1}`;
    if (item.type === 'video' && item.isShort) return `Short ${index + 1}`;
    return `Video ${index + 1}`;
  };

  return (
    <div className="progress-indicator">
      
      <div className="progress-bar">
        {items.map((item, index) => (
          <button
            key={item.id}
            className={getDotClass(index)}
            onClick={() => onDotClick(index)}
            aria-label={getDotLabel(item, index)}
            title={item.title || getDotLabel(item, index)}
          />
        ))}
      </div>

      <div className="progress-info">
        <span className="current-position">
          {currentDotIndex + 1} / {items.length}
        </span>

        {currentItem?.type === 'image' && (
          <span className="type-indicator">• Pictorial Note</span>
        )}

        {currentItem?.type === 'video' && currentItem?.isShort && (
          <span className="type-indicator">• Short</span>
        )}
      </div>

    </div>
  );
};

export default ProgressIndicator;
