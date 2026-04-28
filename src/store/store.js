
import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";
import movieDetailsReducer from "./movieDetailsSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movieDetails: movieDetailsReducer,
  },
});

