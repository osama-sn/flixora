import { useEffect, useState } from "react";
import { getPopularMovies } from "../api/tmdb";

function Hero() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const movies = await getPopularMovies();
      const randomMovie =
        movies[Math.floor(Math.random() * movies.length)];
      setMovie(randomMovie);
    };

    fetchData();
  }, []);

  if (!movie) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="relative h-[60vh] flex items-center justify-center px-0 text-center">
      
      {/* الخلفية */}
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />

      {/* المحتوى */}
      <div className="relative z-10 max-w-xl">
        <h2 className="text-4xl font-bold mb-4">
          {movie.title}
        </h2>

        <p className="text-gray-300 mb-4">
          {movie.overview}
        </p>

        <button className="bg-red-600 px-6 py-2 rounded hover:bg-red-700">
          Watch Now
        </button>
      </div>
    </div>
  );
}

export default Hero;