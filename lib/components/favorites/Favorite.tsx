import { AppDispatch } from '@/lib/redux';
import { removeFavorite } from '@/lib/redux/favorites/favoritesSlice';
import { Link } from 'expo-router';
import { FC } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

export const Favorite: FC<{ favorite: APOD }> = ({ favorite }) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#222',
        padding: 10,
        borderRadius: 8
      }}
    >
      <View>
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: favorite.thumbnail_url ?? favorite.url }}
        />
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text style={{ color: '#fff', fontSize: 16 }}>{favorite.title}</Text>
        <Text style={{ color: '#aaa', fontSize: 12 }}>{favorite.date}</Text>
        <View style={{ flexDirection: 'row', marginTop: 10, gap: 10 }}>
          <Link
            href={`/fullscreen/favorite/${favorite.date}` as never}
            asChild
            style={style.viewButton}
          >
            <Text style={style.btnText}>View Details</Text>
          </Link>
          <Pressable
            style={style.removeButton}
            onPress={() => dispatch(removeFavorite(favorite.date))}
          >
            <Text style={style.btnText}>Remove</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  viewButton: { padding: 5, backgroundColor: '#1e90ff', borderRadius: 5 },
  removeButton: { padding: 5, backgroundColor: '#ff6347', borderRadius: 5 },
  btnText: { color: 'white', fontSize: 14 }
});
function useAppDispatch<T>() {
  throw new Error('Function not implemented.');
}
