import React from 'react';
import './Header.css';

const Header = ({
  totalContent,
  categoryFilter,
  setCategoryFilter,
  onPrev,
  onNext,
  hasPrevious,
  hasNext,
}) => {
  const categories = [
  { name: "Welcome", icon: "🏠", color: "#6d28d9" },
  { name: "AEDO", icon: "🏢", color: "#113300" },
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
  {name: "Extra", icon: "🕺", color: "#ffff0add" },
];


  // Get current category color
  const currentCategory = categories.find(cat => 
    cat.name === (categoryFilter || "Welcome")
  );
  const activeColor = currentCategory?.color || "#6d28d9";

  return (
    <header className="header" style={{ '--active-color': activeColor }}>
      {/* Top Gradient Bar */}
      <div className="gradient-bar"></div>
      
      <div className="header-container">
        {/* Main Header Row */}
        <div className="header-main-row">
          {/* Logo and Title Section */}
          <div className="header-brand">
            <div className="logo-container">
              <div className="logo-icon">📖</div>
              <div className="logo-glow"></div>
            </div>
            <div className="brand-text">
              <h1 className="header-title">
                <span className="title-gs">GS</span>
                <span className="title-revision">Revision Pro</span>
              </h1>
              <div className="subtitle">Master Your Preparation • Ace Every Exam</div>
            </div>
          </div>

          {/* Stats and Navigation */}
          <div className="header-right-section">
            {/* Content Stats */}
            <div className="stats-badge">
              <div className="stats-icon">📊</div>
              <div className="stats-content">
                <span className="stats-count">{totalContent}</span>
                <span className="stats-label">Resources</span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="nav-controls">
              <button 
                className={`nav-btn prev-btn ${!hasPrevious ? 'disabled' : ''}`}
                onClick={onPrev} 
                disabled={!hasPrevious}
                aria-label="Previous"
              >
                <span className="nav-btn-icon">◀</span>
                <span className="nav-btn-text">Prev</span>
              </button>
              
              <div className="nav-counter">
                <span className="counter-label">Navigate</span>
                <div className="counter-arrows">
                  <span className="arrow-up">↑</span>
                  <span className="arrow-down">↓</span>
                </div>
              </div>
              
              <button 
                className={`nav-btn next-btn ${!hasNext ? 'disabled' : ''}`}
                onClick={onNext} 
                disabled={!hasNext}
                aria-label="Next"
              >
                <span className="nav-btn-text">Next</span>
                <span className="nav-btn-icon">▶</span>
              </button>
            </div>

            {/* Active Category Badge */}
            <div className="active-category-badge" style={{ backgroundColor: activeColor }}>
              <span className="badge-icon">{currentCategory?.icon || "🏠"}</span>
              <span className="badge-text">{categoryFilter || "Welcome"}</span>
            </div>
          </div>
        </div>

        {/* Category Filter Bar */}
        <div className="category-filters-container">
          <div className="category-filters-label">
            <span className="filter-icon">🎯</span>
            <span>Filter by Category:</span>
          </div>
          
          <div className="category-filters-scroll">
            {categories.map(category => {
              const isActive = categoryFilter === (category.name === "Welcome" ? "" : category.name);
              return (
                <button
                  key={category.name}
                  className={`category-filter-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setCategoryFilter(category.name === "Welcome" ? "" : category.name)}
                  style={{
                    '--category-color': category.color,
                    backgroundColor: isActive ? category.color : 'transparent'
                  }}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-name">{category.name}</span>
                  {isActive && <span className="active-indicator"></span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;