import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import gsVideosRaw from './data/videos';
import pictorialNotesRaw from './data/images';
import Header from './components/Header';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import ImageShower from './components/ImageShower/ImageShower';
import ProgressIndicator from './components/ProgressIndicator';
import NoData from './components/NoData/NoData'; // Import NoData component
import { extractYouTubeID, isYouTubeShort } from './utils/youtube';
import './App.css';

function App() {
  const [, setVideos] = useState([]);
  const [pictorialNotes, setPictorialNotes] = useState([]);
  const [allContent, setAllContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [showProgressForNotes, setShowProgressForNotes] = useState(false);
  const [dotsReady, setDotsReady] = useState(true);
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

    const combined = [...enrichedVideos, ...enrichedNotes];

    setVideos(enrichedVideos);
    setPictorialNotes(enrichedNotes);
    setAllContent(combined);
    setFilteredContent(combined);
    setLoading(false);
  }, []);

  // Category filter
  useEffect(() => {
    if (!allContent.length) return;

    let filtered;

    if (categoryFilter === '') {
      filtered = allContent;
    } else if (categoryFilter === 'Pictorial Notes') {
      filtered = pictorialNotes;
    } else {
      filtered = allContent.filter(item => item.category === categoryFilter);
    }

    setFilteredContent(filtered);
    setCurrentIndex(0);
  }, [categoryFilter, allContent, pictorialNotes]);

  // Prevent double-dot rendering when category changes
  useEffect(() => {
    setDotsReady(false);
    setCurrentIndex(0);
    setShowProgressForNotes(false);

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
    setCurrentIndex(i => Math.min(i + 1, filteredContent.length - 1));
  }, [filteredContent.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex(i => Math.max(i - 1, 0));
  }, []);

  // Reset to show all content
  const handleShowAllContent = useCallback(() => {
    setCategoryFilter('');
  }, []);

  // Handle back to categories
  const handleBackToCategories = useCallback(() => {
    setCategoryFilter('');
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = e => {
      if (filteredContent.length === 0) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev, filteredContent.length]);

  const currentItem = filteredContent[currentIndex];

  // Progress for notes
  useEffect(() => {
    if (!currentItem) return;
    
    if (currentItem.type === 'image') {
      if (progressTimerRef.current) {
        clearTimeout(progressTimerRef.current);
      }

      setShowProgressForNotes(true);

      progressTimerRef.current = setTimeout(() => {
        setShowProgressForNotes(false);
        progressTimerRef.current = null;
      }, 1500);
    } else {
      setShowProgressForNotes(false);
    }

    return () => {
      if (progressTimerRef.current) clearTimeout(progressTimerRef.current);
    };
  }, [currentItem]);

  // Items counted for dots
  const itemsWithDots = useMemo(() => {
    return filteredContent.filter(
      item => item.type === 'video' || item.type === 'image'
    );
  }, [filteredContent]);

  const currentDotIndex = useMemo(() => {
    if (!currentItem || !dotsReady) return -1;
    return itemsWithDots.findIndex(item => item.id === currentItem.id);
  }, [currentItem, itemsWithDots, dotsReady]);

  const handleDotClick = useCallback(
    index => {
      const selectedItem = itemsWithDots[index];
      const actual = filteredContent.findIndex(i => i.id === selectedItem.id);
      if (actual !== -1) setCurrentIndex(actual);
    },
    [filteredContent, itemsWithDots]
  );

  // Calculate stats for NoData component
  const videoCount = useMemo(() => 
    allContent.filter(item => item.type === 'video').length, 
    [allContent]
  );

  const pictorialNotesCount = useMemo(() => 
    allContent.filter(item => item.type === 'image').length, 
    [allContent]
  );

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Loading content...</p>
      </div>
    );
  }

  const shouldShowProgress =
    filteredContent.length > 0 && (
      currentItem?.type === 'video' ||
      (currentItem?.type === 'image' && showProgressForNotes)
    );

  return (
    <div className="app">
      <Header
        totalContent={filteredContent.length}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        onPrev={goPrev}
        onNext={goNext}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
      />

      <main className="main-content">
        {filteredContent.length === 0 ? (
          <NoData
            categoryFilter={categoryFilter}
            totalItems={allContent.length}
            pictorialNotesCount={pictorialNotesCount}
            videosCount={videoCount}
            onShowAll={handleShowAllContent}
            onBack={categoryFilter ? handleBackToCategories : null}
          />
        ) : (
          <>
            {currentItem?.type === 'image' ? (
              <ImageShower image={currentItem} />
            ) : (
              <VideoPlayer video={currentItem} />
            )}

            {dotsReady && shouldShowProgress && itemsWithDots.length > 0 && (
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

      {/* <footer className="app-footer">
        <div className="footer-info">
          {filteredContent.length === 0 ? (
            <span className="no-content-footer">
              <span className="footer-icon">📭</span>
              No content in selected category
            </span>
          ) : (
            <>
              {currentItem?.type === 'image' ? '📷 ' : '🎬 '}
              {currentIndex + 1}/{filteredContent.length}
              {currentItem?.type === 'image' && ' • Pictorial Note'}
              {currentItem?.type === 'video' && currentItem?.isShort && ' • Short'}
            </>
          )}
        </div>
      </footer> */}
    </div>
  );
}

export default App;