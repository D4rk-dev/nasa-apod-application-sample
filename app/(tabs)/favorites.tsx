import { Favorite } from '@/lib/components/favorites/Favorite';
import { RootState } from '@/lib/redux';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function Favorites() {
  const favorites = useSelector((state: RootState) => state.favorites.items);

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => <Favorite key={item.date} favorite={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
    paddingTop: 70,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
