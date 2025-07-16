import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";

const FAVORITES_KEY = 'FAVORITES';

export const loadFavorites = createAsyncThunk<FavoriteItem[]>(
  'favorites/load',
  async () => {
    const json = await AsyncStorage.getItem(FAVORITES_KEY);
    return json ? JSON.parse(json) : [];
  }
);
