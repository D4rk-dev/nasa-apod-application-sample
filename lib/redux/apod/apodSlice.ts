import { createSlice } from '@reduxjs/toolkit';
import { fetchAPOD } from './apodThunks';

const apodSlice = createSlice({
  name: 'apod',
  initialState: {
    data: [] as APOD[],
    current: null as APODFull | null
  },
  reducers: {
    setCurrent(state, action) {
      state.current = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAPOD.pending, (state, action) => {
        const date = action.meta.arg || new Date().toISOString().split('T')[0];
        const apods = new Map();
        state.data.forEach((item) => {
          apods.set(item.date, item);
        });
        if (!apods.has(date)) {
          apods.set(date, {
            date: date,
            loading: true
          });
        }
        state.data = Array.from(apods.values());
      })
      .addCase(fetchAPOD.fulfilled, (state, action) => {
        const apods = new Map();
        state.data.forEach((item) => {
          apods.set(item.date, item);
        });
        apods.set(action.payload.date, action.payload);
        state.data = Array.from(apods.values());
      })
      .addCase(fetchAPOD.rejected, (state, action) => {
        const apods = new Map();
        const date = action.meta.arg || new Date().toISOString().split('T')[0];
        state.data.forEach((item) => {
          apods.set(item.date, item);
        });
        const item = {
          ...apods.get(date),
          loading: false,
          error: action.error.message || 'Failed to fetch APOD'
        };

        apods.set(date, item);

        state.data = Array.from(apods.values());
      });
  }
});

export const { setCurrent } = apodSlice.actions;
export default apodSlice.reducer;
