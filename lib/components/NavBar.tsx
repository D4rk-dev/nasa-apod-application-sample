import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { FC, useEffect, useMemo, useState } from 'react';

import {
  Dimensions,
  PixelRatio,
  Pressable,
  StyleSheet,
  View
} from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

const _indicatorSize = 35;
const _initialLeft = 20; // Initial left position of the animated view
export const NavBar: FC<BottomTabBarProps> = ({
  descriptors,
  state,
  navigation
}) => {
  const left = useSharedValue(_initialLeft); // Shared value for the left position of the animated view
  const animViewWidth = useSharedValue(0); // Width of the animated view
  const animViewHeight = useSharedValue(0); // Height of the animated view
  const animatedProps = useAnimatedProps(() => ({
    bottom: withTiming(6, { duration: 200 }),
    left: withTiming(left.value, { duration: 200 }),
    width: withTiming(animViewWidth.value, { duration: 200 }),
    height: withTiming(animViewHeight.value, { duration: 200 })
  }));
  const [itemDimensions, setItemDimensions] = useState<Record<string, any>>({});
  const nDescrriptors = useMemo(() => {
    const keys = Object.keys(descriptors);
    return keys;
  }, [descriptors]);

  useEffect(() => {
    if (Object.keys(itemDimensions).length === nDescrriptors.length) {
      const activeItem = itemDimensions[state.index];
      // Update the left position and size of the animated view based
      left.value = activeItem.x ; // (state.index + 1) * activeItem.width - 50 + state.index * 15;
      animViewHeight.value = _indicatorSize;
      animViewWidth.value = _indicatorSize;
    }
  }, [itemDimensions, state]);

  return (
    <View
      style={{
        width: Dimensions.get('window').width,
        position: 'absolute',
        bottom: 0,
        zIndex: 50,
        paddingRight: 16,
        paddingLeft: 16,
        height: 100
      }}
    >
      <View
        style={{
          backgroundColor: '#000',
          height: 65,
          borderRadius: 50,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}
      >
        <Animated.Image
          source={require('@/assets/images/luna-creciente.png')}
          style={{
            position: 'absolute',
            height: _indicatorSize,
            width: _indicatorSize,
            borderRadius: _indicatorSize / 2,
            zIndex: 0,
            left: _initialLeft
          }}
          animatedProps={animatedProps as any}
        />
        {/*
          <Animated.View
          style={{
            position: 'absolute',
            height: 50,
            width: 50,
            backgroundColor: 'red',
            borderRadius: 25,
            zIndex: 0,
            left: 10
          }}
        />

        */}
        {nDescrriptors.map((key, i) => {
          const { options, route } = descriptors[key];
          const active = state.index === i;
          return (
            <Pressable
              key={key}
              onPress={() => {
                animViewHeight.value = 0;
                animViewWidth.value = 0;
                navigation.navigate(route.name);
              }}
              onLayout={(e) => {
                const { width, height, x, y } = e.nativeEvent.layout;
                setItemDimensions((prev) => ({
                  ...prev,
                  [i]: {
                    name: route.name,
                    width,
                    height,
                    x: PixelRatio.roundToNearestPixel(x),
                    y: PixelRatio.roundToNearestPixel(y)
                  }
                }));
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 40,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {options.tabBarIcon &&
                  options.tabBarIcon({
                    color: 'white',
                    focused: active,
                    size: 0
                  })}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    zIndex: 50,
    width: Dimensions.get('window').width,
    paddingRight: 16,
    paddingLeft: 16
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 10
  },
  tabItem: {
    flex: 1,
    alignItems: 'center'
  },
  tabIcon: {
    width: 24,
    height: 24
  }
});
