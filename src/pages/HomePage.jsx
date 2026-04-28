import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MovieList from "../components/MovieList";
import MovieSearch from "../components/MovieSearch";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
} from "../api/tmdb";

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen text-white p-6">
      <Navbar />
      <Hero />
      <MovieSearch />
      <MovieList title="Popular Movies" fetchMovies={getPopularMovies} />
      <MovieList title="Top Rated Movies" fetchMovies={getTopRatedMovies} />
      <MovieList title="Now Playing" fetchMovies={getNowPlayingMovies} />
    </div>
  );
}

