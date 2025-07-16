import { _imgWidth, BackdropPhoto, Photo } from '@/lib/components/apod';
import { AppDispatch, RootState } from '@/lib/redux';
import { fetchAPOD } from '@/lib/redux/apod/apodThunks';
import { useEffect } from 'react';
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

  useEffect(() => {
    const date = new Date();
    dispatch(fetchAPOD(date.toISOString().split('T')[0]));
    date.setDate(date.getDate() - 1);
    dispatch(fetchAPOD(date.toISOString().split('T')[0]));
    date.setDate(date.getDate() - 1);
    dispatch(fetchAPOD(date.toISOString().split('T')[0]));
  }, [dispatch]);

  useEffect(() => {
    if (apod.data) {
      console.log('APOD data loaded:', apod.data);
    }
  }, [apod.data]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <View style={StyleSheet.absoluteFillObject}>
        {apod.data
          ? apod.data.map((item, index) => (
              <BackdropPhoto
                key={item.date}
                apod={item}
                index={index}
                scrollX={scrollX}
              />
            ))
          : null}
      </View>
      <Animated.FlatList
        horizontal
        data={apod.data || []}
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
      />
    </View>
  );
}
