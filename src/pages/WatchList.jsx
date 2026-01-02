  import React, { useState } from 'react';

function WatchList() {
  const [watchlist, setWatchlist] = useState(() => {
    return JSON.parse(localStorage.getItem('watchlist') || '[]');
  });

  const removeMovie = (id) => {
    const updated = watchlist.filter(movie => movie.id !== id);
    setWatchlist(updated);
    localStorage.setItem('watchlist', JSON.stringify(updated));
  };

  if (watchlist.length === 0) {
    return <p>Watchlist is empty</p>;
  }

  return (
    <div>

    <div className="movies-grid">
      {watchlist.map(movie => (

        <div key={movie.id}> <div className="movie-card">
          <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          />
         <h3>{movie.title}</h3>
        <p>⭐ {movie.vote_average.toFixed(1)}</p>
          <button onClick={() => removeMovie(movie.id)}>
            Remove
          </button>
          </div>
        </div>
        
      ))}

    </div>

    </div>
  );
}

export default WatchList;   