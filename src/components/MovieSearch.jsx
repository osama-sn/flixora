import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import {
  fetchGenres,
  fetchPopularMovies,
  searchMoviesByQuery,
  selectError,
  selectGenres,
  selectLoading,
  selectMode,
  selectMovies,
  selectQuery,
  setMode,
  setQuery,
} from "../store/moviesSlice";

function getYear(dateString) {
  if (!dateString) return "";
  return String(dateString).slice(0, 4);
}

function MovieSearch() {
  const dispatch = useDispatch();
  const query = useSelector(selectQuery);
  const movies = useSelector(selectMovies);
  const mode = useSelector(selectMode);
  const genres = useSelector(selectGenres);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [minRating, setMinRating] = useState(0);
  const [year, setYear] = useState("");
  const [genreId, setGenreId] = useState("");

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      dispatch(setMode("popular"));
      return;
    }

    const t = setTimeout(async () => {
      dispatch(searchMoviesByQuery(q));
    }, 400);

    return () => {
      clearTimeout(t);
    };
  }, [dispatch, query]);

  const filteredMovies = useMemo(() => {
    const y = year.trim();
    const gid = genreId ? Number(genreId) : null;
    return movies.filter((m) => {
      const okRating = (m.vote_average ?? 0) >= Number(minRating);
      const okYear = !y || getYear(m.release_date) === y;
      const okGenre = !gid || (Array.isArray(m.genre_ids) && m.genre_ids.includes(gid));
      return okRating && okYear && okGenre;
    });
  }, [movies, minRating, year, genreId]);

  return (
    <section className="py-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <h2 className="text-white text-xl font-semibold mb-2">Search</h2>
          <input
            value={query}
            onChange={(e) => dispatch(setQuery(e.target.value))}
            placeholder="Search for a movie..."
            className="w-full h-12 bg-gray-900 text-white rounded-lg px-4 outline-none focus:ring-2 focus:ring-red-600"
          />
          <p className="text-gray-400 text-xs mt-2">
            Tip: type at least 2 characters.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 md:items-center">
          <div className="flex flex-col">
            <label className="text-xs text-gray-400 mb-1">Min rating</label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="h-12 bg-gray-900 text-white rounded-lg px-3 outline-none focus:ring-2 focus:ring-red-600"
            >
              {[0, 2, 4, 6, 7, 8, 9].map((n) => (
                <option key={n} value={n}>
                  {n}+
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-gray-400 mb-1">Genre</label>
            <select
              value={genreId}
              onChange={(e) => setGenreId(e.target.value)}
              className="h-12 bg-gray-900 text-white rounded-lg px-3 outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="">All</option>
              {genres.map((g) => (
                <option key={g.id} value={String(g.id)}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-gray-400 mb-1">Year</label>
            <input
              value={year}
              onChange={(e) => setYear(e.target.value.replace(/[^\d]/g, "").slice(0, 4))}
              placeholder="e.g. 2024"
              className="w-28 h-12 bg-gray-900 text-white rounded-lg px-3 outline-none focus:ring-2 focus:ring-red-600"
              inputMode="numeric"
            />
          </div>
        </div>
      </div>

      {loading && <p className="text-white mt-4">Searching...</p>}
      {!loading && error && <p className="text-red-500 mt-4">{error}</p>}

      {!loading && !error && (
        <div className="mt-5">
          <p className="text-gray-400 text-sm mb-3">
            {mode === "search" ? "Results" : "Popular"}: {filteredMovies.length}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                image={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default MovieSearch;

