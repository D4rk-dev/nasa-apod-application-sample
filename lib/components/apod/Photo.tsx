import { AppDispatch, RootState } from '@/lib/redux';
import { setCurrent } from '@/lib/redux/apod/apodSlice';
import {
  addFavorite,
  removeFavorite
} from '@/lib/redux/favorites/favoritesSlice';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, useRouter } from 'expo-router';
import { FC, useEffect, useMemo } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';

export const _imgWidth = Dimensions.get('screen').width * 0.7;
export const _imgHeight = _imgWidth * 1.8;

export const Photo: FC<{
  apod: APOD;
  index: number;
  scrollX: SharedValue<number>;
}> = ({ apod, index, scrollX }) => {
  const apods = useSelector((state: RootState) => state.apod);
  const favorites = useSelector((state: RootState) => state.favorites);

  const dispatch = useDispatch<AppDispatch>();
  const isCurrent = useMemo(
    () =>
      !apod.loading &&
      !apod.error &&
      apods.current &&
      apods.current.date === apod.date,
    [apod, apods.current]
  );

  const isFavorite = useMemo(() => {
    return favorites.items.some((item) => item.date === apod.date);
  }, [favorites.items, apod.date]);
  const router = useRouter();
  const stylez = useAnimatedStyle(() => {
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

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(apod.date));
    } else {
      dispatch(addFavorite(apod as APOD));
    }
  };

  useEffect(() => {
    if (isCurrent) {
      dispatch(setCurrent(apod));
    }
  }, [isCurrent]);
  if (apod.loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (apod.error) {
    return (
      <View style={styles.error}>
        <Text style={{ color: 'red' }}>{apod.error}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.date}>
        {new Date(
          new Date(apod.date).setDate(new Date(apod.date).getDate() + 1)
        ).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })}
      </Text>
      <View style={styles.imageContainer}>
        <View style={styles.header}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center'
            }}
          >
            {
              //Show only the first 15 characters of the title
              apod.title.length > 30
                ? `${apod.title.substring(0, 30)}...`
                : apod.title
            }
          </Text>
          {isCurrent && (
            <Link href={'/fullscreen/apod' as never} asChild>
              <FontAwesome name="expand" size={20} color="white" />
            </Link>
          )}
        </View>
        <View style={styles.footer}>
          <Pressable onPress={handleFavorite}>
            <AntDesign
              name={isFavorite ? 'heart' : 'hearto'}
              size={24}
              color="white"
            />
          </Pressable>
          <Text style={{ color: 'white', fontSize: 16, marginTop: 5 }}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Text>
        </View>
        <Animated.Image
          source={{ uri: apod.url }}
          style={[{ flex: 1 }, stylez]}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  error: {
    width: _imgWidth,
    height: _imgHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    width: _imgWidth,
    height: _imgHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: _imgWidth,
    height: _imgHeight,
    overflow: 'hidden',
    borderRadius: 16,
    position: 'relative',
    backgroundColor: 'black'
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  date: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    marginBottom: 8
  }
});
