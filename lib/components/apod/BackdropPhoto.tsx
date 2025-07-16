import { FC } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

export const BackdropPhoto: FC<{
  apod: APOD;
  index: number;
  scrollX: SharedValue<number>;
}> = ({ apod, index, scrollX }) => {
  const styles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [index - 1, index, index + 1],
        [0, 1, 0]
      )
    };
  });
  return (
    <Animated.Image
      source={{ uri: apod.url }}
      style={[StyleSheet.absoluteFillObject, styles]}
      blurRadius={50}
    />
  );
};
