import React from 'react'
import { useNavigate } from 'react-router-dom';

function MovieCard({movie}) {
  
  const navigate = useNavigate();
  

  
  const handler =() =>{
     navigate(`/movie/${movie.id}`);
  }
  


  return (
    <div className="movie-card"
    onClick={handler}
     style={{ cursor: "pointer" }}>
  <img
    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    alt={movie.title}
  />
  <h3>{movie.title}</h3>
  <p>⭐ {movie?.vote_average?.toFixed(1) ?? "N/A"}</p>

</div>

  )
}

export default MovieCard