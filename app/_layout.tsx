import { store } from '@/lib/redux';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="fullscreen/apod"
          options={{
            headerShown: false,
            animation: 'slide_from_bottom',
            animationDuration: 300,
            presentation: 'modal'
          }}
          singular
        />
        <Stack.Screen
          name="fullscreen/favorite/[date]"
          options={{
            headerShown: false,
            animation: 'slide_from_bottom',
            animationDuration: 300,
            presentation: 'modal'
          }}
          singular
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
