import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMovieGenres, getPopularMovies, searchMovies } from "../api/tmdb";

export const fetchGenres = createAsyncThunk("movies/fetchGenres", async () => {
  return await getMovieGenres();
});

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async () => {
    return await getPopularMovies();
  },
);

export const searchMoviesByQuery = createAsyncThunk(
  "movies/searchMoviesByQuery",
  async (query) => {
    return await searchMovies(query);
  },
);

const initialState = {
  query: "",
  mode: "popular", // "popular" | "search"
  movies: [],
  genres: [],
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setMode(state, action) {
      state.mode = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Genres
      .addCase(fetchGenres.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres = action.payload ?? [];
      })
      .addCase(fetchGenres.rejected, (state) => {
        state.error = "Failed to load genres";
      })
      // Popular
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload ?? [];
        state.mode = "popular";
      })
      .addCase(fetchPopularMovies.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load popular movies";
      })
      // Search
      .addCase(searchMoviesByQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMoviesByQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload ?? [];
        state.mode = "search";
      })
      .addCase(searchMoviesByQuery.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to search";
      });
  },
});

export const { setQuery, setMode, clearError } = moviesSlice.actions;

export const selectMoviesState = (state) => state.movies;
export const selectQuery = (state) => state.movies.query;
export const selectMode = (state) => state.movies.mode;
export const selectMovies = (state) => state.movies.movies;
export const selectGenres = (state) => state.movies.genres;
export const selectLoading = (state) => state.movies.loading;
export const selectError = (state) => state.movies.error;

export default moviesSlice.reducer;

