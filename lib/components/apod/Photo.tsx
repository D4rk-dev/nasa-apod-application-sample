import { FC } from 'react';
import { Dimensions, Text, View } from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle
} from 'react-native-reanimated';

export const _imgWidth = Dimensions.get('screen').width * 0.7;
export const _imgHeight = _imgWidth * 1.8;
export const Photo: FC<{
  apod: APOD;
  index: number;
  scrollX: SharedValue<number>;
}> = ({ apod, index, scrollX }) => {
  const styles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [1.4, 1, 1.4]
          )
        },
        {
          rotate: `${interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [15, 0, 15]
          )}deg`
        }
      ]
    };
  });
  return (
    <View
      style={{
        width: _imgWidth,
        height: _imgHeight,
        overflow: 'hidden',
        borderRadius: 16,
        position: 'relative'
      }}
    >
      <Text
        style={{
          position: 'absolute',
          top: 10,
          left: 0,
          right: 0,
          padding: 12,
          color: 'white',
          textAlign: 'center'
        }}
      >
        {apod.title}
      </Text>
      <Animated.Image
        source={{ uri: apod.url }}
        style={[{ flex: 1 }, styles]}
        resizeMode="cover"
      />
    </View>
  );
};
