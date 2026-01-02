const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';




export const  getTrendingMovies = async() =>{
   try {
     if (!API_KEY) {
    throw new Error("TMDB API key is missing");
  }

   const response = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
    )

    if (!response.ok) {
      throw new Error(`TMDB error: ${response.status}`);
    }
   const data =await response.json()
   return data.results
    
   } catch (error) {
    console.log("Error fetching movies:",error)
    throw error;
    
   }


}


export const getMovieDetails = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return await response.json();
};


export const searchMovies = async (query) => {
  if (!query || !query.trim()) return [];

  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error(`TMDB search error: ${response.status}`);
  }

  const data = await response.json();
  return data.results || [];
};


export const getMovieCast = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
    if (!response.ok) throw new Error("Failed");
    const data = await response.json();
    
    // Yaha confirm karein ki hum data.cast bhej rahe hain (jo ki ek array hai)
    return data.cast || []; 
  } catch (error) {
    console.error(error);
    return []; // Error case mein khali array bhejein
  }
};


