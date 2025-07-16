import { FC } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
export const FullScreenAPOD: FC<{ apod: APOD }> = ({ apod }) => {
  return (
    <View style={styles.contentContainer}>
      <View style={styles.explanationContainer}>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            marginBottom: 10,
            padding: 10,
            textAlign: 'center'
          }}
        >
          {apod.title} - {apod.date}
        </Text>
        <Text style={styles.explanation}>{apod.explanation}</Text>
      </View>
      <Image
        source={{ uri: apod.thumbnail_url ?? apod.hdurl }}
        style={{
          flex: 1,
          width: Dimensions.get('screen').width
        }}
        onError={(e) => {
          console.error('Image load error:', e.nativeEvent.error);
        }}
        resizeMode="cover"
      />
    </View>
  );
};
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
  explanationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    height: '100%'
  },
  explanation: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  controlsContainer: {
    padding: 10
  }
});
