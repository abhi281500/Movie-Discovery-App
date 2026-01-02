import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieDetails } from '../services/api'
import {getMovieCast} from '../services/api'
import useWatchlist from "../hooks/useWatchlist";


function MovieDetails() {
 const { id } = useParams()
 const [movie, setMovie] = useState(null)
 const [loading, setLoading] = useState(true)
const [cast, setCast] = useState([]);
 const [error, setError] = useState(null);
 const { watchlist, addMovie, removeMovie } = useWatchlist();

const isInWatchlist = watchlist.some(item => item.id === movie?.id);



useEffect(() => {
const fetchMovieData = async () => {
try {
 setLoading(true);
setError(null);

const movieData = await getMovieDetails(id);
const castData = await getMovieCast(id);

setMovie(movieData);
setCast(castData);
 } catch (err) {
 setError("Failed to load movie details",err);
 } finally {
 setLoading(false);
 }
 };

fetchMovieData();
}, [id]);

 if (loading) return <p>Loading...</p>
 if (!movie) return <p>No movie found</p>
 if (error) return <p className="status-message">{error}</p>;
 


  return (
    <div>
      <div className='Moviedtails'>
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/no-image.png"}
          alt={movie.title}
        />
        <div>
          <h2>{movie.title}</h2>
          <p>⭐ {movie.vote_average?.toFixed(1)}</p>
          <p>{movie.overview}</p>
          <p>Release Date: {movie.release_date}</p>
          <p>Runtime: {movie.runtime} mins</p>
          <button
        onClick={() => {
    if (isInWatchlist) {
      removeMovie(movie.id);
    } else {
      addMovie(movie);
    }
  }}
>
  {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
</button>

        </div>
      </div>

      <div className='Cast'>
        <h3>Cast</h3>
        <ul>
          {cast?.slice(0, 8).map((actor) => (
            <li key={actor.id}>
              
              <img 
                src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : "/no-avatar.png"} 
                alt={actor.name} 
              />
              <p><strong>{actor.name}</strong></p>
              <span>{actor.character}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MovieDetails
  