import React, { useState, useEffect } from "react";
import "./Aside.css";

function Aside({
  selectedCategory,
  onSelectCategory,
  maxPrice,
  setMaxPrice,
  minPrice,
  setMinPrice,
  minRating,
  setMinRating,
  searchQuery,
  setSearchQuery,
  clearSearch,
}) {
  const categories = ["all", "beauty", "fragrances", "furniture", "groceries"];

  const [tempMinPrice, setTempMinPrice] = useState(minPrice);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);
  const [tempMinRating, setTempMinRating] = useState(minRating);

  const [localSearch, setLocalSearch] = useState(searchQuery);

  const applyFilters = (e) => {
    e.preventDefault();
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
    setMinRating(tempMinRating);
  };

  const resetFilters = () => {
    setTempMinPrice(0);
    setTempMaxPrice(10000);
    setTempMinRating(0);
    setMinPrice(0);
    setMaxPrice(10000);
    setMinRating(0);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(localSearch);
  };

  const handleClearSearch = () => {
    setLocalSearch("");
    clearSearch();
  };

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  return (
    <>
      <div className="categories">
        <h3>Categories</h3>
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => onSelectCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="search-in-sidebar">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search products..."
          />
          <button type="submit">🔍</button>
          {localSearch && (
            <button type="button" onClick={handleClearSearch}>
              ✖
            </button>
          )}
        </form>
      </div>

      <div className="filters">
        <form className="filterForm" onSubmit={applyFilters}>
          <div className="price-row">
            <div className="price-field">
              <label>Min Price</label>
              <input
                type="text"
                value={tempMinPrice}
                onChange={(e) => setTempMinPrice(Number(e.target.value))}
                placeholder="Min price"
              />
            </div>
            <div className="price-field">
              <label>Max Price</label>
              <input
                type="text"
                value={tempMaxPrice}
                onChange={(e) => setTempMaxPrice(Number(e.target.value))}
                placeholder="Max price"
              />
            </div>
          </div>

          <div className="rating-row">
            <label>Min Rate</label>
            <input
              type="text"
              step="0.5"
              value={tempMinRating}
              onChange={(e) => setTempMinRating(Number(e.target.value))}
              placeholder="Min rating (0-5)"
            />
          </div>

          <div className="filter-buttons">
            <button type="submit">Apply Filters</button>
            <button type="button" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
          <p className="warning">Filters apply only to the current page.</p>
        </form>
      </div>
    </>
  );
}

export default Aside;
