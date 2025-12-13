import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import gsVideosRaw from './data/videos';
import pictorialNotesRaw from './data/images';
import pdfData from './data/pdfData';
import Header from './components/Header/Header';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import ImageShower from './components/ImageShower/ImageShower';
import GoogleDrivePdfViewer from './components/PdfViewer/GoogleDrivePdfViewer';
import ProgressIndicator from './components/ProgressIndicator/ProgressIndicator';
import NoData from './components/NoData/NoData';
import WelcomePage from './components/WelcomePage/WelcomePage'; // You'll need to create this
import { extractYouTubeID, isYouTubeShort } from './utils/youtube';
import { Maximize2, Minimize2, Home } from 'lucide-react';
import './App.css';

function App() {
  const [, setVideos] = useState([]);
  const [pictorialNotes, setPictorialNotes] = useState([]);
  const [pdfNotes, setPdfNotes] = useState([]);
  const [allContent, setAllContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState(''); // Empty means Welcome page
  const [loading, setLoading] = useState(true);
  const [dotsReady, setDotsReady] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const progressTimerRef = useRef(null);

  // Load data
  useEffect(() => {
    const enrichedVideos = Array.isArray(gsVideosRaw)
      ? gsVideosRaw.map((v, i) => ({
          ...v,
          id: v.id || `video-${i + 1}`,
          youtubeId: extractYouTubeID(v.youtubeLink),
          isShort: isYouTubeShort(v.youtubeLink),
          type: 'video',
        }))
      : [];

    const enrichedNotes = Array.isArray(pictorialNotesRaw)
      ? pictorialNotesRaw.map((note, i) => ({
          ...note,
          id: note.id || `note-${i + 1}`,
          type: 'image',
        }))
      : [];

    // Extract fileId from pdfLink for Google Drive integration
    const enrichedPdfNotes = pdfData.map((pdf, i) => {
      let fileId = pdf.fileId;
      if (!fileId && pdf.pdfLink) {
        const match = pdf.pdfLink.match(/\/d\/([^/]+)/);
        if (match) {
          fileId = match[1];
        }
      }
      
      return {
        ...pdf,
        id: pdf.id || `pdf-${i + 1}`,
        type: "pdf",
        fileId: fileId || pdf.pdfLink,
      };
    });

    // COMBINE ALL CONTENT
    const combined = [...enrichedVideos, ...enrichedNotes, ...enrichedPdfNotes];

    setVideos(enrichedVideos);
    setPictorialNotes(enrichedNotes);
    setPdfNotes(enrichedPdfNotes);
    setAllContent(combined);
    setFilteredContent([]); // Start with empty for Welcome page
    setLoading(false);
  }, []);

  // Category filter
  useEffect(() => {
    if (!allContent.length) return;

    let filtered;

    if (categoryFilter === '') {
      filtered = []; // Empty array means show Welcome page
    } else if (categoryFilter === 'Pictorial Notes') {
      filtered = pictorialNotes;
    } else if (categoryFilter === 'PDF Notes') {
      filtered = pdfNotes;
    } else {
      filtered = allContent.filter(item => item.category === categoryFilter);
    }

    setFilteredContent(filtered);
    setCurrentIndex(0);
  }, [categoryFilter, allContent, pictorialNotes, pdfNotes]);

  // Reset to Welcome page when no category filter
  useEffect(() => {
    if (categoryFilter === '') {
      setFilteredContent([]);
      setCurrentIndex(0);
    }
  }, [categoryFilter]);

  // Prevent double-dot rendering when category changes
  useEffect(() => {
    setDotsReady(false);
    setCurrentIndex(0);
    if (progressTimerRef.current) {
      clearTimeout(progressTimerRef.current);
      progressTimerRef.current = null;
    }

    const timer = setTimeout(() => {
      setDotsReady(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [categoryFilter]);

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < filteredContent.length - 1;

  const goNext = useCallback(() => {
    if (filteredContent.length === 0) return; // Don't navigate on Welcome page
    setCurrentIndex(i => Math.min(i + 1, filteredContent.length - 1));
  }, [filteredContent.length]);

  const goPrev = useCallback(() => {
    if (filteredContent.length === 0) return; // Don't navigate on Welcome page
    setCurrentIndex(i => Math.max(i - 1, 0));
  }, [filteredContent.length]);

  // Go to Welcome page
  const goToWelcome = useCallback(() => {
    setCategoryFilter('');
    setCurrentIndex(0);
  }, []);

  // Toggle fullscreen mode
  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      // Enter fullscreen
      setIsFullscreen(true);
      document.body.style.overflow = 'hidden';
      
      // Trigger fullscreen on the root element if supported
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(e => {
          console.log("Fullscreen error:", e);
        });
      }
    } else {
      // Exit fullscreen
      setIsFullscreen(false);
      document.body.style.overflow = 'auto';
      
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, [isFullscreen]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
        document.body.style.overflow = 'auto';
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = e => {
      // Disable navigation shortcuts on Welcome page
      if (filteredContent.length === 0) {
        if (e.key === 'Escape' && isFullscreen) {
          toggleFullscreen();
        }
        return;
      }
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
      
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
      
      if (e.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
      }
      
      // Home key to go to Welcome page
      if (e.key === 'Home' || e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        goToWelcome();
      }
    };
    
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev, filteredContent.length, toggleFullscreen, isFullscreen, goToWelcome]);

  const currentItem = filteredContent[currentIndex];
  const isWelcomePage = categoryFilter === '';

  // Progress for notes - SIMPLIFIED (no timer to hide progress)
  useEffect(() => {
    if (!currentItem) return;
    
    // Cleanup any existing timer
    if (progressTimerRef.current) {
      clearTimeout(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  }, [currentItem]);

  // Items counted for dots
  const itemsWithDots = useMemo(() => {
    return filteredContent.filter(
      item => item.type === 'video' || item.type === 'image' || item.type === "pdf"
    );
  }, [filteredContent]);

  const currentDotIndex = useMemo(() => {
    if (!currentItem || !dotsReady || isWelcomePage) return -1;
    return itemsWithDots.findIndex(item => item.id === currentItem.id);
  }, [currentItem, itemsWithDots, dotsReady, isWelcomePage]);

  const handleDotClick = useCallback(
    index => {
      if (isWelcomePage) return;
      const selectedItem = itemsWithDots[index];
      const actual = filteredContent.findIndex(i => i.id === selectedItem.id);
      if (actual !== -1) setCurrentIndex(actual);
    },
    [filteredContent, itemsWithDots, isWelcomePage]
  );

  // Check if current content type supports maximize button
  const shouldShowMaximizeButton = useMemo(() => {
    if (!currentItem || isWelcomePage) return false;
    // Show maximize button for images and PDFs, hide for videos
    return currentItem.type === 'image' || currentItem.type === 'pdf';
  }, [currentItem, isWelcomePage]);

  // Check if we should show exit button in fullscreen
  const shouldShowExitButtonInFullscreen = useMemo(() => {
    if (!currentItem || isWelcomePage) return false;
    // Show exit button for images and PDFs in fullscreen, hide for videos
    return isFullscreen && (currentItem.type === 'image' || currentItem.type === 'pdf');
  }, [currentItem, isFullscreen, isWelcomePage]);

  if (loading) {
    return (
      <div className="loading-screen theme-dark-1">
        <div className="spinner theme-dark-1" />
        <p>Loading content...</p>
      </div>
    );
  }

  const shouldShowProgress =
    !isWelcomePage &&
    filteredContent.length > 0 &&
    (currentItem?.type === "video" ||
      currentItem?.type === "pdf" ||
      currentItem?.type === "image");

  return (
    <div className={`app ${isFullscreen ? 'app--fullscreen' : ''}`}>
      {/* Header - Hidden in Fullscreen */}
      {!isFullscreen && (
        <Header
          totalContent={isWelcomePage ? 0 : filteredContent.length}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          onPrev={goPrev}
          onNext={goNext}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
        />
      )}

      <main className="main-content">
        {isWelcomePage ? (
          <WelcomePage 
            totalContent={allContent.length}
            categories={[
              "AEDO", "Polity", "History", "Geography", "Economics", 
              "Science", "Scheme", "Current Affairs", "Static GK", 
              "PDF Notes", "Pictorial Notes", "Extra"
            ]}
            onCategorySelect={setCategoryFilter}
          />
        ) : filteredContent.length === 0 ? (
          <NoData />
        ) : (
          <>
            {/* Content Display */}
            {currentItem.type === "image" && (
              <ImageShower image={currentItem} isFullscreen={isFullscreen} />
            )}

            {currentItem.type === "video" && (
              <VideoPlayer video={currentItem} isFullscreen={isFullscreen} />
            )}

            {currentItem.type === "pdf" && (
              <GoogleDrivePdfViewer 
                fileId={currentItem.fileId || currentItem.pdfLink}
                height="700px"
                title={currentItem.title || "PDF Document"}
                isFullscreen={isFullscreen}
              />
            )}

            {/* Show dots for ALL content types - hidden in fullscreen */}
            {!isFullscreen && dotsReady && itemsWithDots.length > 0 && shouldShowProgress && (
              <div className="bottom-row">
                <ProgressIndicator
                  items={itemsWithDots}
                  currentDotIndex={currentDotIndex}
                  onDotClick={handleDotClick}
                  currentItem={currentItem}
                />
              </div>
            )}
          </>
        )}
      </main>

      {/* Home Button - Show when not on Welcome page and not in fullscreen */}
      {!isFullscreen && !isWelcomePage && (
        <button
          className="home-button"
          onClick={goToWelcome}
          title="Go to Home (H)"
          aria-label="Go to home page"
        >
          <Home size={20} />
          <span className="btn-tooltip">Home</span>
        </button>
      )}

      {/* Floating Fullscreen Button - Only show for images and PDFs when NOT in fullscreen */}
      {!isWelcomePage && filteredContent.length > 0 && !isFullscreen && shouldShowMaximizeButton && (
        <button
          className="fullscreen-toggle-btn"
          onClick={toggleFullscreen}
          title="Enter Fullscreen (F)"
          aria-label="Enter fullscreen mode"
        >
          <Maximize2 size={20} />
          <span className="btn-tooltip">Fullscreen</span>
        </button>
      )}

      {/* Exit Fullscreen Button - Shown ONLY inside fullscreen mode for images and PDFs */}
      {shouldShowExitButtonInFullscreen && (
        <button
          className="fullscreen-exit-btn"
          onClick={toggleFullscreen}
          title="Exit Fullscreen (ESC)"
          aria-label="Exit fullscreen mode"
        >
          <Minimize2 size={20} />
          <span className="exit-tooltip">Exit Fullscreen</span>
        </button>
      )}
    </div>
  );
}

export default App;