import React from 'react';

const ProgressIndicator = ({ videos, currentIndex, categoryFilter, onDotClick }) => {
  const filteredVideos = categoryFilter ? videos.filter(v => v.category === categoryFilter) : videos;

  return (
    <div className="progress-indicator">
      <div className="progress-bar">
        {filteredVideos.map((video, index) => (
          <button
            key={video.id}
            className={`progress-dot ${index === currentIndex ? 'active' : ''} ${video.isShort ? 'shorts' : 'full'}`}
            title={`${video.title || 'Video'} (${video.category})`}
            aria-label={`Jump to ${video.title || 'video'}`}
            onClick={() => onDotClick && onDotClick(index)}
          />
        ))}
      </div>
      <div className="progress-text">
        {currentIndex + 1} of {filteredVideos.length} {categoryFilter ? `in ${categoryFilter}` : 'videos'}
      </div>
    </div>
  );
};

export default ProgressIndicator;