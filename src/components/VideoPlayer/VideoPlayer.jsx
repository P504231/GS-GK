import React, { useState } from "react";
import "./VideoPlayer.css";

const VideoPlayer = ({ video }) => {
  const [isLoading, setIsLoading] = useState(true);

  if (!video) {
    return (
      <div className="video-placeholder">
        <div className="video-placeholder-icon">🎬</div>
      </div>
    );
  }

  const youtubeId = video.youtubeId || null;

  if (!youtubeId) {
    return (
      <div className="video-placeholder">
        <div className="video-placeholder-icon">⚠️</div>
      </div>
    );
  }

  const embedSrc = `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1&autoplay=1&enablejsapi=1&origin=${window.location.origin}&controls=1&showinfo=0`;

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`video-container ${video.isShort ? "short" : "full"}`}>
      {isLoading && (
        <div className="video-loading">
          <div className="loading-spinner"></div>
        </div>
      )}
      
      <div className="video-wrapper">
        <iframe
          key={youtubeId}
          src={embedSrc}
          title="GS Video"
          className="youtube-iframe"
          style={{ border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          playsInline
          webkit-playsinline="true"
          onLoad={handleIframeLoad}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;