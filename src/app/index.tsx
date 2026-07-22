import { StyleSheet, Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Travel Planner</Text>

      <Text style={styles.subtitle}>
        Plan your next adventure
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Trips</Text>

        <Text style={styles.emptyMessage}>
          You don't have any trips yet.
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => router.push('/add-trip' as any)}
        >
          <Text style={styles.buttonText}>
            + Add New Trip
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 80,
    backgroundColor: '#FFFFFF',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 18,
    marginTop: 8,
  },

  section: {
    marginTop: 50,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  emptyMessage: {
    fontSize: 16,
    marginTop: 20,
  },

  button: {
    marginTop: 30,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#2563EB',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});