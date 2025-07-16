import { _imgWidth, BackdropPhoto, Photo } from '@/lib/components/apod';
import { AppDispatch, RootState } from '@/lib/redux';
import { setCurrent } from '@/lib/redux/apod/apodSlice';
import { fetchAPOD } from '@/lib/redux/apod/apodThunks';
import { useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';

const _spacing = 12;
export default function Index() {
  const dispatch = useDispatch<AppDispatch>();
  const apod = useSelector((state: RootState) => state.apod);
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x / (_imgWidth + _spacing);
  });
  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50
  });

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any[] }) => {
      if (viewableItems.length > 0) {
        const first = viewableItems[0];
        dispatch(setCurrent(first.item));
      }
    }
  );

  const fetchData = async () => {
    const date = new Date();
    dispatch(fetchAPOD());
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <View style={StyleSheet.absoluteFillObject}>
        {Array.from(apod.data.values()).map((item, index) => (
          <BackdropPhoto
            key={item.date}
            apod={item}
            index={index}
            scrollX={scrollX}
          />
        ))}
      </View>
      <Animated.FlatList
        horizontal
        data={Array.from(apod.data.values())}
        contentContainerStyle={{
          gap: _spacing,
          paddingHorizontal: (Dimensions.get('screen').width - _imgWidth) / 2
        }}
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60}
        style={{ flexGrow: 0 }}
        decelerationRate="fast"
        snapToInterval={_imgWidth + _spacing}
        keyExtractor={(item) => item.date}
        renderItem={({ item, index }) => (
          <Photo apod={item} index={index} scrollX={scrollX} />
        )}
        showsHorizontalScrollIndicator={false}
        inverted
        ListEmptyComponent={<Text>No APOD data available</Text>}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  );
}
