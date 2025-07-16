import { NASA_API_KEY } from '@/lib/config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';

export const fetchAPOD = createAsyncThunk<APOD, string | undefined>(
  'apod/fetch',
  async (date, { signal }) => {
    const endpoint = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}${date ? `&date=${date}` : ''}&thumbs=true`;
    const res = await fetch(endpoint, { signal });
    const json = await res.json();
    return json as APOD;
  },
  {
    condition: (date, { getState }) => {
      const { apod } = getState() as RootState;
      let shouldFetch = true;
      if (apod.data && apod.data.find((item) => item.date === date)) {
        shouldFetch = false;
      }
      return shouldFetch;
    }
  }
);
