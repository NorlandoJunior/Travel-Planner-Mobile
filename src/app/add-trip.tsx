import { StyleSheet, Text, View } from 'react-native';

export default function AddTripScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Trip</Text>

      <Text style={styles.subtitle}>
        Create a new travel plan
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 80,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 18,
    marginTop: 8,
  },
});