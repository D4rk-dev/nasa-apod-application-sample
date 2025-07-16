import { createListenerMiddleware } from '@reduxjs/toolkit';

import { setCurrent } from './apodSlice';
import { fetchAPOD } from './apodThunks';

export const apodListenerMiddleware = createListenerMiddleware();

// Registrar listeners
apodListenerMiddleware.startListening({
  actionCreator: setCurrent,
  effect: async (action, { getState, dispatch }) => {
    const currentAPOD = action.payload as APOD;
    if (currentAPOD.loading) {
      console.log('Current APOD is loading:', currentAPOD);
    } else {
      console.log('Current APOD set:', currentAPOD.title);
      const date = new Date(currentAPOD.date);
      date.setDate(date.getDate() - 1);
      dispatch(fetchAPOD(date.toISOString().split('T')[0]));
    }

    // const items = (getState() as RootState).favorites.items as FavoriteItem[]
    // await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(items))
  }
});
