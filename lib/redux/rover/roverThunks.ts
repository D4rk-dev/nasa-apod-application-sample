import { NASA_API_KEY } from "@/lib/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRoverPhotos = createAsyncThunk<RoverPhoto[], { date: string; camera?: string }>(
  'rover/fetch',
  async ({ date, camera }) => {
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${NASA_API_KEY}${camera ? `&camera=${camera}` : ''}`
    const res = await fetch(url)
    const json = await res.json()
    return json.photos as RoverPhoto[]
  }
)