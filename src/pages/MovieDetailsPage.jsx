import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  fetchMovieDetails,
  selectMovieDetails,
  selectMovieDetailsError,
  selectMovieDetailsLoading,
} from "../store/movieDetailsSlice";
import MovieDetailsHero from "../components/movie-details/MovieDetailsHero";
import MovieDetailsMeta from "../components/movie-details/MovieDetailsMeta";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const movieId = Number(id);

  const dispatch = useDispatch();
  const movie = useSelector(selectMovieDetails);
  const loading = useSelector(selectMovieDetailsLoading);
  const error = useSelector(selectMovieDetailsError);

  useEffect(() => {
    if (!Number.isFinite(movieId)) return;
    dispatch(fetchMovieDetails(movieId));
  }, [dispatch, movieId]);

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <div className="mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <span aria-hidden="true">←</span>
          Back
        </Link>
      </div>

      {loading && <p className="text-white">Loading details...</p>}
      {!loading && error && <p className="text-red-500">{error}</p>}

      {!loading && !error && movie && (
        <div className="flex flex-col gap-6">
          <MovieDetailsHero movie={movie} />
          <MovieDetailsMeta movie={movie} />
        </div>
      )}

      {!loading && !error && !movie && (
        <p className="text-gray-300">Movie not found.</p>
      )}
    </div>
  );
}

