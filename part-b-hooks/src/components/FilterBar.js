import React from 'react';

function FilterBar({ categories, activeFilter, onFilterChange }) {
  const allFilters = ['Tất cả', ...categories];

  return (
    <div className="filter-bar">
      {allFilters.map((cat) => (
        <button
          key={cat}
          className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
          onClick={() => onFilterChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;

