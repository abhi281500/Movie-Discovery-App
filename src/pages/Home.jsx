import React, { useEffect, useState } from 'react'
import { getTrendingMovies } from '../services/api'
import MovieCard from '../components/MovieCard';


function Home() {
  const [loading,setLoading] =useState(true)
  const [movies, setMovies] =useState([])
  const [error,setError] =useState(false)

  useEffect(() => {
   const fetchMovie = async ()=>{
    try {
      setLoading(true);
    const data =  await getTrendingMovies()
    setMovies(data);
    setLoading(false)
    }
     catch (error) {
      setError(true)
      console.log("failed" ,error)
      
    }
    finally{
      setLoading(false)
    }
    
   }
    
  
   fetchMovie()

    
  }, []);

  if (loading) return <p>Loading movies...</p>;
  if(error) return <p>error </p>
  

  return (
    <div className="movies-grid">
  {movies.map((movie) => (
    <MovieCard movie={movie} key={movie.id} />
  ))}
</div>

  );
}

export default Home;
