import { NASA_API_KEY } from '@/lib/config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';

const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const fetchAPOD = createAsyncThunk<APOD, string | undefined>(
  'apod/fetch',
  async (date, { signal }) => {
    const endpoint = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}${date ? `&date=${date}` : ''}&thumbs=true`;
    const res = await fetch(endpoint, { signal });
    const json = await res.json();
    return json as APOD;
  },
  {
    condition: (arg, { getState }) => {
      const date = arg || new Date().toISOString().split('T')[0];

      const { apod } = getState() as RootState;
      let shouldFetch = true;

      if (apod.data.find((item) => item.date === date)) {
        shouldFetch = false;
      }
      return shouldFetch;
    }
  }
);
