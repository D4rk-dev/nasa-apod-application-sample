import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: '#000'
  }
});

export const Placeholder = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={'#000'} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};
