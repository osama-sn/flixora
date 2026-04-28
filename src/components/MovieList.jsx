import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { getPopularMovies } from "../api/tmdb";

function MovieList({ title = "Popular Movies", fetchMovies = getPopularMovies }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMovies();
        setMovies(data);
      } catch (err) {
        setError("Failed to load movies");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchMovies]);

  return (
    <div className="px-0 py-6">
      <h1 className="text-white text-xl font-semibold mb-4">
        {title}
      </h1>

      {/* 🔥 Loading */}
      {loading && (
        <p className="text-white">Loading...</p>
      )}

      {/* ❌ Error */}
      {!loading && error && (
        <p className="text-red-500">{error}</p>
      )}

      {/* 🎬 Movies */}
      {!loading && !error && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieList;