import { createListenerMiddleware } from '@reduxjs/toolkit';

import { setCurrent } from './apodSlice';



export const listenerMiddleware = createListenerMiddleware()

// Registrar listeners
listenerMiddleware.startListening({
  actionCreator: setCurrent,
  effect: async (action, { getState }) => {
    const currentAPOD = action.payload;

   // const items = (getState() as RootState).favorites.items as FavoriteItem[]
   // await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(items))
  },
})

