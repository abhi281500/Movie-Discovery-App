import React, { useState, memo } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = memo(() => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔒 GUARD (VERY IMPORTANT)
    if (!searchTerm || searchTerm.trim().length < 2) return;

    navigate(`/search?q=${searchTerm.trim()}`);
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
      <h2 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        MovieApp
      </h2>

      <div className="watchlist-button">
      <button onClick={() => navigate("/watchlist")}>
    Watchlist
    </button>
    </div>

      <form onSubmit={handleSubmit}>
        <input
          id="movie-search"
          name="movie-search"
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </nav>
  );
});

export default Navbar;
