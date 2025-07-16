import { createListenerMiddleware } from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '..';
import { addFavorite, removeFavorite } from './favoritesSlice';

const FAVORITES_KEY = 'FAVORITES';

export const favoritesListenerMiddleware = createListenerMiddleware();

// Registrar listeners
favoritesListenerMiddleware.startListening({
  actionCreator: addFavorite,
  effect: async (_, { getState }) => {
    console.log("Saving favorites...");
    const items = (getState() as RootState).favorites.items as APODFull[];
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
  }
});

favoritesListenerMiddleware.startListening({
  actionCreator: removeFavorite,
  effect: async (_, { getState }) => {
    console.log("Removing favorite...");
    const items = (getState() as RootState).favorites.items as APODFull[];
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
  }
});
