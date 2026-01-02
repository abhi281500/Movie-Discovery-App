import { useState } from "react";

const STORAGE_KEY = "watchlist";

function getInitialWatchlist() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

export default function useWatchlist() {
  const [watchlist, setWatchlist] = useState(getInitialWatchlist);

  const addMovie = (movie) => {
    const exists = watchlist.some(item => item.id === movie.id);
    if (exists) return false;

    const updated = [...watchlist, movie];
    setWatchlist(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  };

  const removeMovie = (id) => {
    const updated = watchlist.filter(movie => movie.id !== id);
    setWatchlist(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return {
    watchlist,
    addMovie,
    removeMovie,
  };
}
