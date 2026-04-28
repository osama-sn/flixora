import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

// 🎬 Popular
export const getPopularMovies = async () => {
  const res = await api.get("/movie/popular");
  return res.data.results;
};

// ⭐ Top Rated
export const getTopRatedMovies = async () => {
  const res = await api.get("/movie/top_rated");
  return res.data.results;
};

// 🔥 Now Playing
export const getNowPlayingMovies = async () => {
  const res = await api.get("/movie/now_playing");
  return res.data.results;
};

// 🔍 Search
export const searchMovies = async (query) => {
  const res = await api.get("/search/movie", {
    params: { query },
  });
  return res.data.results;
};

// 🏷️ Genres
export const getMovieGenres = async () => {
  const res = await api.get("/genre/movie/list");
  return res.data.genres;
};

// 🎥 Details
export const getMovieDetails = async (id) => {
  const res = await api.get(`/movie/${id}`);
  return res.data;
};