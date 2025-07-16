import { createListenerMiddleware } from '@reduxjs/toolkit'

import { addFavorite, removeFavorite } from './favoritesSlice'


const FAVORITES_KEY = 'FAVORITES'

export const listenerMiddleware = createListenerMiddleware()

// Registrar listeners
listenerMiddleware.startListening({
  actionCreator: addFavorite,
  effect: async (action, { getState }) => {
   // const items = (getState() as RootState).favorites.items as FavoriteItem[]
   // await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(items))
  },
})

listenerMiddleware.startListening({
  actionCreator: removeFavorite,
  effect: async (action, { getState }) => {
    //const items = (getState() as RootState).favorites.items as FavoriteItem[]
    //await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(items))
  },
})