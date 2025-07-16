import { FullScreenAPOD } from '@/lib/components/FullscreenApod';
import { RootState } from '@/lib/redux';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function CurrentApod() {
  const apod = useSelector((state: RootState) => state.apod.current);

  if (!apod) {
    return (
      <View style={styles.contentContainer}>
        <Text style={{ color: 'white', fontSize: 16 }}>
          No APOD data available
        </Text>
      </View>
    );
  }

  return <FullScreenAPOD apod={apod} />;
}
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
    backgroundColor: 'black',
    position: 'relative'
  },
  video: {
    width: 350,
    height: 275
  },
  controlsContainer: {
    padding: 10
  }
});
