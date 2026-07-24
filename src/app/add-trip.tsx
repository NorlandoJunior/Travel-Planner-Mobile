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

import {
  getTrips,
  saveTrips,
} from '@/services/StorageService';


// Formats a string of numbers into YYYY-MM-DD format.
function formatDateInput(value: string): string {

  // Remove every character that is not a number.
  const numbersOnly = value.replace(/\D/g, '');


  // Limit the input to eight digits.
  const limitedNumbers = numbersOnly.slice(0, 8);


  // Store the formatted date.
  let formattedDate = limitedNumbers;


  /*
    Add a hyphen after the year.

    Example:
    2026 → 2026-
  */
  if (limitedNumbers.length > 4) {

    formattedDate =
      `${limitedNumbers.slice(0, 4)}-${limitedNumbers.slice(4)}`;
  }


  /*
    Add a hyphen after the month.

    Example:
    202608 → 2026-08-
  */
  if (limitedNumbers.length > 6) {

    formattedDate =
      `${limitedNumbers.slice(0, 4)}-` +
      `${limitedNumbers.slice(4, 6)}-` +
      `${limitedNumbers.slice(6)}`;
  }


  // Return the formatted date.
  return formattedDate;
}


// Checks whether a date follows the YYYY-MM-DD format.
function isValidDate(date: string): boolean {

  // Check whether the date has the correct format.
  const datePattern =
    /^\d{4}-\d{2}-\d{2}$/;


  if (!datePattern.test(date)) {
    return false;
  }


  // Separate the date into year, month, and day.
  const [
    year,
    month,
    day,
  ] = date.split('-').map(Number);


  /*
    JavaScript months start at zero.

    Therefore, one is subtracted from the
    month before creating the Date object.
  */
  const parsedDate = new Date(
    year,
    month - 1,
    day,
  );


  /*
    Compare the generated date with the original values.

    This prevents invalid dates such as:

    2026-02-31
    2026-13-10
    2026-00-20
  */
  return (
    parsedDate.getFullYear() === year &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getDate() === day
  );
}


// This screen allows the user to create a new trip.
export default function AddTripScreen() {

  // Stores the destination entered by the user.
  const [
    destination,
    setDestination,
  ] = useState('');


  // Stores the trip start date.
  const [
    startDate,
    setStartDate,
  ] = useState('');


  // Stores the trip end date.
  const [
    endDate,
    setEndDate,
  ] = useState('');


  // Stores the trip budget.
  const [
    budget,
    setBudget,
  ] = useState('');


  // Stores optional notes about the trip.
  const [
    notes,
    setNotes,
  ] = useState('');


  // Stores validation messages.
  const [
    errorMessage,
    setErrorMessage,
  ] = useState('');


  /*
    This function validates the form,
    creates a new trip,
    and saves it to local storage.
  */
  async function handleSaveTrip() {

    /*
      Check whether all required fields
      have been filled in.
    */
    if (
      !destination.trim() ||
      !startDate ||
      !endDate ||
      !budget
    ) {

      // Display an error message to the user.
      setErrorMessage(
        'Please fill in all required fields.',
      );

      return;
    }


    /*
      Check whether the start date
      is a valid calendar date.
    */
    if (!isValidDate(startDate)) {

      setErrorMessage(
        'Please enter a valid start date.',
      );

      return;
    }


    /*
      Check whether the end date
      is a valid calendar date.
    */
    if (!isValidDate(endDate)) {

      setErrorMessage(
        'Please enter a valid end date.',
      );

      return;
    }


    /*
      Check whether the end date occurs
      after the start date.
    */
    if (
      new Date(endDate) <
      new Date(startDate)
    ) {

      setErrorMessage(
        'End date cannot be before the start date.',
      );

      return;
    }


    // Clear any previous error message.
    setErrorMessage('');


    // Create a new trip object.
    const newTrip = {

      // Generate a unique ID for the trip.
      id: Date.now().toString(),

      // Remove unnecessary spaces from the destination.
      destination: destination.trim(),

      // Store the formatted start date.
      startDate,

      // Store the formatted end date.
      endDate,

      // Store the budget value.
      budget,

      // Store the optional notes.
      notes: notes.trim(),
    };


    /*
      Load all trips that are already
      saved in local storage.
    */
    const existingTrips = await getTrips();


    /*
      Create a new array containing
      the existing trips and the new trip.
    */
    const updatedTrips = [
      ...existingTrips,
      newTrip,
    ];


    /*
      Save the updated list of trips
      to AsyncStorage.
    */
    await saveTrips(updatedTrips);


    // Display a success message in the terminal.
    console.log(
      'Trip saved successfully:',
      newTrip,
    );


    /*
      Return to the previous screen.

      The Home screen will reload the saved
      trips when it becomes active again.
    */
    router.back();
  }


  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >

      {/* Main screen title */}
      <Text style={styles.title}>
        Add New Trip
      </Text>


      {/* Screen description */}
      <Text style={styles.subtitle}>
        Create a new travel plan
      </Text>


      {/* Form container */}
      <View style={styles.form}>


        {/* Destination field */}
        <Text style={styles.label}>
          Destination *
        </Text>


        <TextInput
          style={styles.input}
          placeholder="Where are you going?"
          placeholderTextColor="#6B7280"
          value={destination}
          maxLength={20}
          onChangeText={setDestination}
        />


        {/* Character counter for the destination */}
        <Text style={styles.characterCounter}>
          {destination.length}/20 characters
        </Text>


        {/* Start date field */}
        <Text style={styles.label}>
          Start Date *
        </Text>


        <TextInput
          style={styles.input}
          placeholder="YYYYMMDD"
          placeholderTextColor="#6B7280"
          keyboardType="numeric"
          maxLength={10}
          value={startDate}
          onChangeText={(value) => {

            // Automatically format the date.
            const formattedDate =
              formatDateInput(value);

            // Update the start date.
            setStartDate(formattedDate);
          }}
        />


        {/* End date field */}
        <Text style={styles.label}>
          End Date *
        </Text>


        <TextInput
          style={styles.input}
          placeholder="YYYYMMDD"
          placeholderTextColor="#6B7280"
          keyboardType="numeric"
          maxLength={10}
          value={endDate}
          onChangeText={(value) => {

            // Automatically format the date.
            const formattedDate =
              formatDateInput(value);

            // Update the end date.
            setEndDate(formattedDate);
          }}
        />


        {/* Budget field */}
        <Text style={styles.label}>
          Budget *
        </Text>


        <TextInput
          style={styles.input}
          placeholder="Enter your budget"
          placeholderTextColor="#6B7280"
          keyboardType="numeric"
          value={budget}
          onChangeText={(value) => {

            /*
              Remove every character that is not
              a number or decimal separator.
            */
            const numbersOnly =
              value.replace(/[^0-9.,]/g, '');


            // Update the budget value.
            setBudget(numbersOnly);
          }}
        />


        {/* Optional notes field */}
        <Text style={styles.label}>
          Notes
        </Text>


        <TextInput
          style={[
            styles.input,
            styles.notesInput,
          ]}
          placeholder="Add notes about your trip"
          placeholderTextColor="#6B7280"
          multiline
          numberOfLines={5}
          maxLength={200}
          textAlignVertical="top"
          value={notes}
          onChangeText={setNotes}
        />


        {/* Character counter for the notes */}
        <Text style={styles.characterCounter}>
          {notes.length}/200 characters
        </Text>


        {/* Display the error message when validation fails */}
        {errorMessage !== '' && (

          <Text style={styles.errorMessage}>
            {errorMessage}
          </Text>

        )}


        {/* Save trip button */}
        <Pressable
          style={styles.button}
          onPress={handleSaveTrip}
        >

          <Text style={styles.buttonText}>
            Save Trip
          </Text>

        </Pressable>

      </View>

    </ScrollView>
  );
}


// Styles used by the AddTripScreen component.
const styles = StyleSheet.create({

  // Main screen container.
  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
  },


  // Main screen title.
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },


  // Screen subtitle.
  subtitle: {
    fontSize: 18,
    marginTop: 8,
    color: '#4B5563',
  },


  // Form container.
  form: {
    marginTop: 32,
  },


  // Input labels.
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 20,
    color: '#111827',
  },


  // Standard input styling.
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },


  // Character counter styling.
  characterCounter: {
    marginTop: 4,
    textAlign: 'right',
    fontSize: 12,
    color: '#6B7280',
  },


  // Notes input styling.
  notesInput: {
    minHeight: 120,
  },


  // Error message styling.
  errorMessage: {
    marginTop: 16,
    color: '#DC2626',
    fontSize: 15,
    fontWeight: 'bold',
  },


  // Save button styling.
  button: {
    marginTop: 32,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#2563EB',
  },


  // Save button text.
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

});