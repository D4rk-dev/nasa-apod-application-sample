import { Placeholder } from '@/lib/components/Placeholder';
import { AppDispatch, RootState } from '@/lib/redux';
import { loadFavorites } from '@/lib/redux/favorites/favoritesThunks';
import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Index() {
  const favorites = useSelector((state: RootState) => state.favorites);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    console.log('Loading favorites...');
    dispatch(loadFavorites());
  }, []);

  if (favorites.loading) {
    return <Placeholder />;
  }
  return <Redirect href="/(tabs)" />;
}
