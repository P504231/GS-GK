import React, { useState } from 'react';
import './GoogleDrivePdfViewer.css';

const GoogleDrivePdfViewer = ({ 
  fileId, 
  title = "PDF Document",
  width = "100%", 
  height = "600px",
  isFullscreen = false
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const extractFileId = (input) => {
    if (!input) return null;
    
    if (input.length === 33 || input.length === 19) {
      return input;
    }
    
    const patterns = [
      /\/d\/([^/]+)/,
      /id=([^&]+)/,
      /view\?usp=sharing&id=([^&]+)/
    ];
    
    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match) return match[1];
    }
    
    return input;
  };
  
  const cleanFileId = extractFileId(fileId);
  
  if (!cleanFileId) {
    return (
      <div className="gd-pdf-placeholder">
        <p>📄 No PDF file ID provided</p>
        <p className="placeholder-help">
          Please provide a valid Google Drive file ID
        </p>
      </div>
    );
  }
  
  const embedUrl = `https://drive.google.com/file/d/${cleanFileId}/preview`;
  
  const handleIframeLoad = () => {
    setLoading(false);
    setError(null);
  };
  
  const handleIframeError = () => {
    setLoading(false);
    setError('Failed to load PDF. Please check the file ID and sharing permissions.');
  };

  // If in fullscreen mode, return simplified container
  if (isFullscreen) {
    return (
      <div className="gd-pdf-fullscreen-container">
        {loading && (
          <div className="gd-pdf-loading">
            <div className="spinner"></div>
            <p>Loading PDF...</p>
          </div>
        )}
        
        {error && (
          <div className="gd-pdf-error">
            <p>⚠️ {error}</p>
            <p className="error-help">
              Make sure the file is shared with "Anyone with the link can view" permission.
            </p>
          </div>
        )}
        
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          title={`${title} - PDF Viewer`}
          style={{ border: 'none' }}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          className="gd-pdf-fullscreen-iframe"
          allowFullScreen
          allow="autoplay"
        />
      </div>
    );
  }

  // Normal mode
  return (
    <div className="gd-pdf-container">
      <div className="pdf-title-bar">
        <h3 className="pdf-title">{title}</h3>
        <span className="pdf-source">Google Drive</span>
      </div>
      
      {loading && (
        <div className="gd-pdf-loading">
          <div className="spinner"></div>
          <p>Loading Google Drive PDF viewer...</p>
        </div>
      )}
      
      {error && (
        <div className="gd-pdf-error">
          <p>⚠️ {error}</p>
          <p className="error-help">
            Make sure the file is shared with "Anyone with the link can view" permission.
          </p>
        </div>
      )}
      
      <div className="iframe-wrapper">
        <iframe
          src={embedUrl}
          width={width}
          height={height}
          title={`Google Drive PDF: ${title}`}
          style={{ border: 'none' }}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          className="gd-pdf-iframe"
          allowFullScreen
          allow="autoplay"
        />
      </div>
      
      {/* <div className="gd-pdf-controls">
        <a
          href={`https://drive.google.com/uc?export=download&id=${cleanFileId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="download-btn"
          download={`${title.replace(/\s+/g, '_')}.pdf`}
        >
          ⬇ Download PDF
        </a>
        <a
          href={`https://drive.google.com/file/d/${cleanFileId}/view`}
          target="_blank"
          rel="noopener noreferrer"
          className="open-btn"
        >
          ↗ Open in New Tab
        </a>
        <button
          onClick={() => window.location.reload()}
          className="refresh-btn"
          title="Refresh Viewer"
        >
          ↻ Refresh
        </button>
      </div> */}
      
      <div className="gd-pdf-help">
        <p className="help-text">
          <strong>Tip:</strong> Use the toolbar in the PDF viewer for zoom, print, and search.
        </p>
      </div>
    </div>
  );
};

export default GoogleDrivePdfViewer;