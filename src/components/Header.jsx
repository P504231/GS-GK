import React from 'react';
// import './Header.css';

const Header = ({
  totalContent,
  categoryFilter,
  setCategoryFilter,
  onPrev,
  onNext,
  hasPrevious,
  hasNext,
}) => {
  const categories = ["All", "Polity", "History", "Geography", "Economics", "Science", "Scheme", "Current Affairs", "Static GK", "Pictorial Notes"];

  return (
    <header className="header">
      <div className="header-row">
        <div className="header-left">
          <h1 className="header-title">GS Revision</h1>
          <div className="small-meta">
            <span className="current-video">Content: {totalContent}</span>
            <span className="category-tag">{categoryFilter || 'All'}</span>
          </div>
        </div>

        <div className="header-nav-buttons">
          <button className="header-arrow" onClick={onPrev} disabled={!hasPrevious} aria-label="Previous">
            ⬆️
          </button>
          <button className="header-arrow" onClick={onNext} disabled={!hasNext} aria-label="Next">
            ⬇️
          </button>
        </div>
      </div>

      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${categoryFilter === (category === "All" ? "" : category) ? 'active' : ''}`}
            onClick={() => setCategoryFilter(category === "All" ? "" : category)}
          >
            {category === "Pictorial Notes" ? "📷 " + category : category}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;