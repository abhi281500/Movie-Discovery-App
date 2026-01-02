import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";

function Search() {
  const [params] = useSearchParams();
  const query = params.get("q");

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 🔒 GUARD (CORB KILLER)
    if (!query || query.trim().length < 2) return;

    const fetchSearch = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await searchMovies(query);
        setResults(data);
      } catch (err) {
        setError("Search failed",err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [query]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!loading && results.length === 0) {
    return <p>No movies found</p>;
  }

  return (
    <div className="movies-grid">
      {results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default Search;
