import { createSlice } from '@reduxjs/toolkit';
import { fetchRoverPhotos } from './roverThunks';



const roverSlice = createSlice({
  name: 'rover',
  initialState: {
    photos: [] as RoverPhoto[],
    loading: false,
    error: null as string | null,
    params: { date: '', camera: undefined as string | undefined },
  },
  reducers: {
    setParams(state, action) {
      state.params = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoverPhotos.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRoverPhotos.fulfilled, (state, action) => {
        state.loading = false
        state.photos = action.payload
      })
      .addCase(fetchRoverPhotos.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error al cargar fotos del rover'
      })
  },
})

export const { setParams } = roverSlice.actions
export default roverSlice.reducer