import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMovieDetails } from "../api/tmdb";

export const fetchMovieDetails = createAsyncThunk(
  "movieDetails/fetchMovieDetails",
  async (movieId) => {
    return await getMovieDetails(movieId);
  },
);

const initialState = {
  currentId: null,
  movie: null,
  loading: false,
  error: null,
};

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState,
  reducers: {
    clearMovieDetails(state) {
      state.currentId = null;
      state.movie = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state, action) => {
        state.currentId = action.meta.arg ?? null;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload ?? null;
      })
      .addCase(fetchMovieDetails.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load movie details";
      });
  },
});

export const { clearMovieDetails } = movieDetailsSlice.actions;

export const selectMovieDetails = (state) => state.movieDetails.movie;
export const selectMovieDetailsLoading = (state) =>
  state.movieDetails.loading;
export const selectMovieDetailsError = (state) => state.movieDetails.error;

export default movieDetailsSlice.reducer;

