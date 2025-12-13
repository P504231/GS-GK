import React, { useState, useEffect } from 'react';
import './WelcomePage.css';

const WelcomePage = ({ totalContent, onCategorySelect }) => {
  const [animatedStats, setAnimatedStats] = useState({
    totalContent: 0,
    categoriesCount: 0
  });
  
  const [activeTip, setActiveTip] = useState(0);

  const subjects = [
    { name: "AEDO", icon: "🏢", color: "#2d6a00" },
    { name: "Polity", icon: "⚖️", color: "#dc2626" },
    { name: "History", icon: "🏛️", color: "#059669" },
    { name: "Geography", icon: "🌍", color: "#0891b2" },
    { name: "Economics", icon: "💰", color: "#ea580c" },
    { name: "Science", icon: "🔬", color: "#7c3aed" },
    { name: "Scheme", icon: "📋", color: "#0d9488" },
    { name: "Current Affairs", icon: "📰", color: "#be185d" },
    { name: "Static GK", icon: "🧠", color: "#a16207" },
    { name: "PDF Notes", icon: "📄", color: "#0ea5e9" },
    { name: "Pictorial Notes", icon: "🎨", color: "#db2777" },
    { name: "Extra", icon: "🕺", color: "#fbbf24" }
  ];

  const tips = [
    { emoji: "🎯", text: "Tap subject to start", details: "Instant access to curated content" },
    { emoji: "⚡", text: "Quick navigation", details: "Swipe or use arrow keys" },
    { emoji: "📱", text: "Mobile optimized", details: "Study anywhere, anytime" }
  ];

  // Stats animation
  useEffect(() => {
    const duration = 2000;
    const steps = 80;
    const incrementTotal = totalContent / steps;
    const incrementCategories = subjects.length / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setAnimatedStats(prev => ({
        totalContent: Math.min(Math.round(currentStep * incrementTotal), totalContent),
        categoriesCount: Math.min(Math.round(currentStep * incrementCategories), subjects.length)
      }));
      if (currentStep >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [totalContent, subjects.length]);

  // Tips rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTip(prev => (prev + 1) % tips.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [tips.length]);

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('wgs-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.wgs-animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleCategoryClick = (subjectName) => {
    const btn = document.querySelector(`[data-subject="${subjectName}"]`);
    if (btn) {
      btn.classList.add('wgs-click-feedback');
      setTimeout(() => btn.classList.remove('wgs-click-feedback'), 300);
    }
    setTimeout(() => onCategorySelect(subjectName), 200);
  };

  return (
    <div className="wgs-container">
      {/* Subtle Floating Orbs */}
      <div className="wgs-orb wgs-orb-1" />
      <div className="wgs-orb wgs-orb-2" />

      {/* Hero Section - Minimal Top Space */}
      <section className="wgs-hero wgs-animate-on-scroll">
        <div className="wgs-hero-content">
          <div className="wgs-hero-icon">📚</div>
          <h1 className="wgs-hero-title">
            <span className="wgs-gradient-text">GS Revision Pro</span>
          </h1>
          <p className="wgs-hero-subtitle">
            Master every topic with bite-sized, exam-focused resources.
          </p>
          <button
            className="wgs-primary-btn"
            onClick={() => document.querySelector('.wgs-categories')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}
          >
            <span>Start Revision</span>
            <span className="wgs-btn-arrow">→</span>
          </button>
        </div>

        {/* Mini Card - Visible on larger screens */}
        <div className="wgs-hero-visual">
          <div className="wgs-hero-card">
            <div className="wgs-mini-stat">
              <span className="wgs-mini-label">Resources</span>
              <span className="wgs-mini-value">{animatedStats.totalContent.toLocaleString()}+</span>
            </div>
            <div className="wgs-mini-stat">
              <span className="wgs-mini-label">Subjects</span>
              <span className="wgs-mini-value">{subjects.length}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="wgs-stats wgs-animate-on-scroll">
        <div className="wgs-stats-grid">
          <div className="wgs-stat-card">
            <div className="wgs-stat-icon">📖</div>
            <div className="wgs-stat-number">{animatedStats.totalContent.toLocaleString()}+</div>
            <div className="wgs-stat-label">Curated Resources</div>
          </div>
          <div className="wgs-stat-card">
            <div className="wgs-stat-icon">📂</div>
            <div className="wgs-stat-number">{subjects.length}</div>
            <div className="wgs-stat-label">Subjects Covered</div>
          </div>
          <div className="wgs-stat-card">
            <div className="wgs-stat-icon">⚡</div>
            <div className="wgs-stat-number">24/7</div>
            <div className="wgs-stat-label">Instant Access</div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="wgs-categories wgs-animate-on-scroll">
        <div className="wgs-section-header">
          <h2>Choose Your Subject</h2>
          <p>Select a subject to begin focused revision</p>
        </div>

        <div className="wgs-categories-grid">
          {subjects.map((subject, index) => (
            <button
              key={subject.name}
              className="wgs-category-card"
              onClick={() => handleCategoryClick(subject.name)}
              data-subject={subject.name}
              style={{ '--delay': `${index * 60}ms` }}
            >
              <div className="wgs-card-icon" style={{ backgroundColor: `${subject.color}30` }}>
                <span className="wgs-card-emoji">{subject.icon}</span>
              </div>
              <h3 className="wgs-card-title" style={{ color: subject.color }}>
                {subject.name}
              </h3>
            </button>
          ))}
        </div>
      </section>

      {/* Tips Section */}
      <section className="wgs-tips wgs-animate-on-scroll">
        <div className="wgs-tips-container">
          <h3 className="wgs-tips-title">Quick Tips</h3>
          <div className="wgs-tips-carousel">
            <div className="wgs-tips-track" style={{ transform: `translateX(-${activeTip * 100}%)` }}>
              {tips.map((tip, index) => (
                <div key={index} className="wgs-tip-slide">
                  <div className="wgs-tip-card">
                    <div className="wgs-tip-emoji">{tip.emoji}</div>
                    <div className="wgs-tip-content">
                      <h4>{tip.text}</h4>
                      <p>{tip.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="wgs-tips-dots">
            {tips.map((_, i) => (
              <button
                key={i}
                className={`wgs-tip-dot ${i === activeTip ? 'wgs-active' : ''}`}
                onClick={() => setActiveTip(i)}
                aria-label={`Go to tip ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;