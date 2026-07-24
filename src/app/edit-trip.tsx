import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Pressable,
} from 'react-native';

import {
  useEffect,
  useState,
} from 'react';

import {
  router,
  useLocalSearchParams,
} from 'expo-router';

import {
  getTrips,
  updateTrip,
  Trip,
} from '@/services/StorageService';


// This screen allows the user to edit an existing trip.
export default function EditTripScreen() {

  /*
    Retrieves the trip ID passed from the Home screen.

    The Home screen sends the ID through the route:
    /edit-trip?id=tripId
  */
  const { id } = useLocalSearchParams<{
    id: string;
  }>();


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


  // Stores validation and error messages.
  const [
    errorMessage,
    setErrorMessage,
  ] = useState('');


  /*
    This function loads the selected trip
    from local storage.
  */
  async function loadTrip() {

    // Get all saved trips.
    const trips = await getTrips();


    // Find the trip with the selected ID.
    const selectedTrip = trips.find(
      (trip) => trip.id === id,
    );


    /*
      If the trip is found, populate the form
      with its current information.
    */
    if (selectedTrip) {

      setDestination(
        selectedTrip.destination,
      );

      setStartDate(
        selectedTrip.startDate,
      );

      setEndDate(
        selectedTrip.endDate,
      );

      setBudget(
        selectedTrip.budget,
      );

      setNotes(
        selectedTrip.notes,
      );
    }
  }


  /*
    Load the selected trip when the screen
    is opened.
  */
  useEffect(() => {

    loadTrip();

  }, [id]);


  /*
    This function validates the form,
    creates the updated trip object,
    and saves the changes.
  */
  async function handleUpdateTrip() {

    /*
      Check whether all required fields
      have been filled in.
    */
    if (
      !destination ||
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


    // Clear any previous error message.
    setErrorMessage('');


    /*
      Create an updated trip object.

      The original ID is preserved so the
      StorageService knows which trip to update.
    */
    const updatedTrip: Trip = {

      id: id,

      destination,

      startDate,

      endDate,

      budget,

      notes,
    };


    /*
      Update the trip in local storage.
    */
    await updateTrip(
      updatedTrip,
    );


    // Display a message in the terminal.
    console.log(
      'Trip updated successfully:',
      updatedTrip,
    );


    /*
      Return to the Home screen.

      The Home screen will reload the updated
      trip when it becomes active again.
    */
    router.back();
  }


  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >

      {/* Main screen title */}
      <Text style={styles.title}>
        Edit Trip
      </Text>


      {/* Screen description */}
      <Text style={styles.subtitle}>
        Update your travel plan
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
          onChangeText={setDestination}
        />


        {/* Start date field */}
        <Text style={styles.label}>
          Start Date *
        </Text>


        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#6B7280"
          value={startDate}
          onChangeText={setStartDate}
        />


        {/* End date field */}
        <Text style={styles.label}>
          End Date *
        </Text>


        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#6B7280"
          value={endDate}
          onChangeText={setEndDate}
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
          onChangeText={setBudget}
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
          textAlignVertical="top"
          value={notes}
          onChangeText={setNotes}
        />


        {/* Display the error message when validation fails */}
        {errorMessage !== '' && (
          <Text style={styles.errorMessage}>
            {errorMessage}
          </Text>
        )}


        {/* Button used to save the changes */}
        <Pressable
          style={styles.button}
          onPress={handleUpdateTrip}
        >

          <Text style={styles.buttonText}>
            Save Changes
          </Text>

        </Pressable>


        {/* Button used to cancel the editing process */}
        <Pressable
          style={styles.cancelButton}
          onPress={() => router.back()}
        >

          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>

        </Pressable>

      </View>

    </ScrollView>
  );
}


// Styles used by the EditTripScreen component.
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


  // Save Changes button styling.
  button: {
    marginTop: 32,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#2563EB',
  },


  // Save Changes button text.
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },


  // Cancel button styling.
  cancelButton: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6B7280',
  },


  // Cancel button text.
  cancelButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: 'bold',
  },

});