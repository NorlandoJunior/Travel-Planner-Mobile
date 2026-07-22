import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

import { getTrips, saveTrips } from '@/services/StorageService';

export default function AddTripScreen() {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [notes, setNotes] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  async function handleSaveTrip() {
    if (!destination || !startDate || !endDate || !budget) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setErrorMessage('');

    const newTrip = {
      id: Date.now().toString(),
      destination,
      startDate,
      endDate,
      budget,
      notes,
    };

    const existingTrips = await getTrips();

    const updatedTrips = [...existingTrips, newTrip];

    await saveTrips(updatedTrips);

    console.log('Trip saved successfully:', newTrip);

    router.back();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Trip</Text>

      <Text style={styles.subtitle}>
        Create a new travel plan
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>Destination *</Text>

        <TextInput
          style={styles.input}
          placeholder="Where are you going?"
          placeholderTextColor="#6B7280"
          value={destination}
          onChangeText={setDestination}
        />

        <Text style={styles.label}>Start Date *</Text>

        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#6B7280"
          value={startDate}
          onChangeText={setStartDate}
        />

        <Text style={styles.label}>End Date *</Text>

        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#6B7280"
          value={endDate}
          onChangeText={setEndDate}
        />

        <Text style={styles.label}>Budget *</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your budget"
          placeholderTextColor="#6B7280"
          keyboardType="numeric"
          value={budget}
          onChangeText={setBudget}
        />

        <Text style={styles.label}>Notes</Text>

        <TextInput
          style={[styles.input, styles.notesInput]}
          placeholder="Add notes about your trip"
          placeholderTextColor="#6B7280"
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          value={notes}
          onChangeText={setNotes}
        />

        {errorMessage !== '' && (
          <Text style={styles.errorMessage}>
            {errorMessage}
          </Text>
        )}

        <Pressable
          style={styles.button}
          onPress={handleSaveTrip}
        >
          <Text style={styles.buttonText}>Save Trip</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },

  subtitle: {
    fontSize: 18,
    marginTop: 8,
    color: '#4B5563',
  },

  form: {
    marginTop: 32,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 20,
    color: '#111827',
  },

  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },

  notesInput: {
    minHeight: 120,
  },

  errorMessage: {
    marginTop: 16,
    color: '#DC2626',
    fontSize: 15,
    fontWeight: 'bold',
  },

  button: {
    marginTop: 32,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#2563EB',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});