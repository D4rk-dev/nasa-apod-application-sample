import { configureStore } from '@reduxjs/toolkit';
import { apodListenerMiddleware } from './apod/apodListeners';
import apodReducer from './apod/apodSlice';
import { favoritesListenerMiddleware } from './favorites/favoritesListeners';
import favoritesReducer from './favorites/favoritesSlice';
export const store = configureStore({
  reducer: {
    apod: apodReducer,
    favorites: favoritesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apodListenerMiddleware.middleware,
      favoritesListenerMiddleware.middleware
    )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
