import { createSlice } from '@reduxjs/toolkit';
import { fetchAPOD } from './apodThunks';

const apodSlice = createSlice({
  name: 'apod',
  initialState: {
    data: null as APOD[] | null,
    loading: false,
    error: null as string | null,
    current: null as APOD | null
  },
  reducers: {
    setCurrent(state, action) {
      state.current = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAPOD.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAPOD.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data
          ? [...state.data, action.payload]
          : [action.payload];
      })
      .addCase(fetchAPOD.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar APOD';
      });
  }
});

export const { setCurrent } = apodSlice.actions;
export default apodSlice.reducer;
