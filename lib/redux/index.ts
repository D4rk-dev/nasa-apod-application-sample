import { configureStore } from '@reduxjs/toolkit';
import apodReducer from './apod/apodSlice';
import favoritesReducer from './favorites/favoritesSlice';
import roverReducer from './rover/roverSlice';

export const store = configureStore({
  reducer: {
    apod: apodReducer,
    rovers: roverReducer,
    favorites: favoritesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;