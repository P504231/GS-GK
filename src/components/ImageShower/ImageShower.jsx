import React, { useState } from "react";
import "./ImageShower.css";

const ImageShower = ({ image }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  if (!image) {
    return (
      <div className="image-placeholder">
        <div className="image-placeholder-icon">🖼️</div>
        <p>No image selected</p>
      </div>
    );
  }

  const imageUrl = image.ImageLink || image.imageLink || null;
  const description = image.Description || image.description || "";

  if (!imageUrl) {
    return (
      <div className="image-placeholder">
        <div className="image-placeholder-icon">⚠️</div>
        <p>Image not available</p>
      </div>
    );
  }

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImageError(true);
  };

  const renderDescription = (text) => {
    if (!text) return null;
    const lines = text.split(/(?:\r\n|\r|\n|----|---)/);
    
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return null;
      
      if (trimmedLine.startsWith('-') || trimmedLine.startsWith('•') || trimmedLine.startsWith('*')) {
        return (
          <div key={index} className="description-line bullet-point">
            <span className="bullet">•</span>
            <span>{trimmedLine.substring(1).trim()}</span>
          </div>
        );
      }
      
      return (
        <div key={index} className="description-line">
          {trimmedLine}
        </div>
      );
    });
  };

  return (
    <div className="image-container">
      {isLoading && (
        <div className="image-loading">
          <div className="loading-spinner"></div>
          <p>Loading image...</p>
        </div>
      )}
      
      {imageError ? (
        <div className="image-error">
          <div className="error-icon">❌</div>
          <h3>Failed to Load Image</h3>
          <p>The image could not be loaded from the provided URL.</p>
          <div className="image-error-info">
            <p><strong>URL:</strong> {imageUrl}</p>
          </div>
          <button 
            onClick={() => window.open(imageUrl, '_blank')}
            className="open-link-btn"
          >
            Open Image in New Tab
          </button>
        </div>
      ) : (
        <>
          <div className="image-wrapper">
            <img
              key={imageUrl}
              src={imageUrl}
              alt={description || "Study Image"}
              className="study-image"
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          </div>
          
          {description && (
            <div className="image-description">
              <h3 className="description-title">📝 Description</h3>
              <div className="description-text">
                {renderDescription(description)}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ImageShower;