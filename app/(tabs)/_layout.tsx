
import Fontisto from '@expo/vector-icons/Fontisto';
import { Tabs } from 'expo-router';
import React from 'react';
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
           <Fontisto name="day-haze" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => (
            <Fontisto name="heart" size={20} color={color} />
          )
        }}
      />
    </Tabs>
  );
}
