import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadFavorites } from './favoritesThunks';

/*
export const saveFavorites = createAsyncThunk<void, FavoriteItem[]>(
  'favorites/save',
  async (items) => {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
  }
);
*/

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [] as FavoriteItem[],
    loading: true
  },
  reducers: {
    addFavorite(state, action: PayloadAction<FavoriteItem>) {
      state.items.push(action.payload);
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadFavorites.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
  }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
