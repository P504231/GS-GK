import React, { useState, useEffect, useCallback } from 'react';
import gsVideosRaw from './data/videos';
import pictorialNotesRaw from './data/images';
import Header from './components/Header';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import ImageShower from './components/ImageShower/ImageShower';
import ProgressIndicator from './components/ProgressIndicator';
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

  // Load all content (videos + pictorial notes)
useEffect(() => {
 
  // Process videos
  const enrichedVideos = Array.isArray(gsVideosRaw) ? gsVideosRaw.map((v, index) => {
    const youtubeId = extractYouTubeID(v.youtubeLink);
    const isShort = isYouTubeShort(v.youtubeLink);

    return { 
      ...v, 
      id: v.id || `video-${index + 1}`,
      youtubeId, 
      isShort,
      type: 'video'
    };
  }) : [];

  // Process pictorial notes - with debugging
  let enrichedNotes = [];
  if (Array.isArray(pictorialNotesRaw)) {
    enrichedNotes = pictorialNotesRaw.map((note, index) => {
      return {
        ...note,
        id: note.id || `note-${index + 1}`,
        type: 'image'
      };
    });
  } else {
    console.error('pictorialNotesRaw is not an array:', pictorialNotesRaw);
  }

  // Combine both
  const combinedContent = [...enrichedVideos, ...enrichedNotes];
  
  console.log('All content:', combinedContent);
  
  setVideos(enrichedVideos);
  setPictorialNotes(enrichedNotes);
  setAllContent(combinedContent);
  setFilteredContent(combinedContent);
  setLoading(false);
}, []);

  // Apply category filter
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

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < filteredContent.length - 1;

  const goNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, filteredContent.length - 1));
  }, [filteredContent.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        goNext();
        e.preventDefault();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        goPrev();
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  const currentItem = filteredContent[currentIndex];

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Loading content...</p>
      </div>
    );
  }

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
          <div className="no-videos">
            <h2>No content in this category</h2>
            <button onClick={() => setCategoryFilter('')} className="reset-btn">
              Show All Content
            </button>
          </div>
        ) : (
          <>
            {/* Show either VideoPlayer or ImageShower based on type */}
            {currentItem?.type === 'image' ? (
              <ImageShower image={currentItem} />
            ) : (
              <VideoPlayer video={currentItem} />
            )}

            {/* Show progress indicator only for videos (not for pictorial notes) */}
            {currentItem?.type === 'video' && !currentItem?.isShort && (
              <div className="bottom-row">
                <ProgressIndicator
                  videos={filteredContent.filter(item => item.type === 'video')}
                  currentIndex={filteredContent
                    .slice(0, currentIndex + 1)
                    .filter(item => item.type === 'video').length - 1}
                  categoryFilter={categoryFilter}
                  onDotClick={(index) => {
                    const videoItems = filteredContent.filter(item => item.type === 'video');
                    if (videoItems[index]) {
                      const actualIndex = filteredContent.findIndex(item => item.id === videoItems[index].id);
                      setCurrentIndex(actualIndex);
                    }
                  }}
                />
              </div>
            )}
          </>
        )}
      </main>

      <footer className="app-footer">
        <div className="footer-info">
          {currentItem?.type === 'image' ? '📷 ' : '🎬 '}
          {currentIndex + 1}/{filteredContent.length}
          {currentItem?.type === 'image' && ' • Pictorial Note'}
          {currentItem?.type === 'video' && currentItem?.isShort && ' • Short'}
        </div>
      </footer>
    </div>
  );
}

export default App;