import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 MOST IMPORTANT GUARD
    if (!searchTerm || searchTerm.trim().length < 2) return;

    onSearch(searchTerm.trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="movie-search"
        name="movie-search"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search movies"
      />
    </form>
  );
}

export default SearchBar;
