import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from 'react-native';

import { useCallback, useState } from 'react';

import {
  useFocusEffect,
  router,
} from 'expo-router';

import {
  getTrips,
  deleteTrip,
  Trip,
} from '@/services/StorageService';


// This is the main screen of the Travel Planner application.
export default function HomeScreen() {

  // Stores all trips loaded from local storage.
  const [trips, setTrips] = useState<Trip[]>([]);


  /*
    This function loads all saved trips from AsyncStorage.

    It runs whenever the Home screen becomes active.
  */
  const loadTrips = async () => {

    // Retrieve all saved trips.
    const savedTrips = await getTrips();


    // Update the screen with the saved trips.
    setTrips(savedTrips);


    // Display the loaded trips in the terminal.
    console.log(
      'Trips loaded on Home screen:',
      savedTrips,
    );
  };


  /*
    useFocusEffect runs whenever the Home screen
    becomes active again.

    This ensures that newly created or edited trips
    are displayed correctly.
  */
  useFocusEffect(
    useCallback(() => {

      // Load trips from local storage.
      loadTrips();

    }, [])
  );


  /*
    Deletes a selected trip.

    The selected trip is removed from local storage,
    and the Home screen is updated afterward.
  */
  const handleDeleteTrip = async (
    tripId: string,
  ) => {

    // Delete the selected trip from local storage.
    await deleteTrip(tripId);


    // Reload the trips displayed on the Home screen.
    await loadTrips();


    // Display a message in the terminal.
    console.log(
      'Trip deleted successfully:',
      tripId,
    );
  };


  /*
    Opens the Edit Trip screen.

    The trip ID is passed as a route parameter
    so the Edit screen knows which trip to load.
  */
  const handleEditTrip = (
    tripId: string,
  ) => {

    router.push({
      pathname: '/edit-trip',
      params: {
        id: tripId,
      },
    });
  };


  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >

      {/* Main application title */}
      <Text style={styles.title}>
        Travel Planner
      </Text>


      {/* Application subtitle */}
      <Text style={styles.subtitle}>
        Plan your next adventure
      </Text>


      {/* Section containing the user's trips */}
      <View style={styles.section}>

        {/* Section title */}
        <Text style={styles.sectionTitle}>
          My Trips
        </Text>


        {/*
          If there are no saved trips,
          display the empty state message.
        */}
        {trips.length === 0 ? (

          <Text style={styles.emptyMessage}>
            You don't have any trips yet.
          </Text>

        ) : (

          /*
            If trips exist, display each trip
            inside its own card.
          */
          trips.map((trip) => (

            <View
              key={trip.id}
              style={styles.tripCard}
            >

              {/* Trip destination */}
              <Text style={styles.tripDestination}>
                {trip.destination}
              </Text>


              {/* Trip dates */}
              <Text style={styles.tripDetails}>
                {trip.startDate} → {trip.endDate}
              </Text>


              {/* Trip budget */}
              <Text style={styles.tripDetails}>
                Budget: {trip.budget}
              </Text>


              {/* Trip notes */}
              {trip.notes !== '' && (
                <Text style={styles.tripNotes}>
                  {trip.notes}
                </Text>
              )}


              {/* Container for the Edit and Delete buttons */}
              <View style={styles.actionsContainer}>

                {/* Edit button */}
                <Pressable
                  style={styles.editButton}
                  onPress={() => handleEditTrip(trip.id)}
                >

                  <Text style={styles.actionButtonText}>
                    Edit
                  </Text>

                </Pressable>


                {/* Delete button */}
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => handleDeleteTrip(trip.id)}
                >

                  <Text style={styles.actionButtonText}>
                    Delete
                  </Text>

                </Pressable>

              </View>

            </View>

          ))

        )}


        {/* Button used to navigate to the Add Trip screen */}
        <Pressable
          style={styles.button}
          onPress={() => router.push('/add-trip')}
        >

          {/* Button text */}
          <Text style={styles.buttonText}>
            + Add New Trip
          </Text>

        </Pressable>

      </View>

    </ScrollView>
  );
}


// Styles used by the HomeScreen component.
const styles = StyleSheet.create({

  // Main screen container.
  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 80,
    backgroundColor: '#FFFFFF',
  },


  // Main application title.
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },


  // Application subtitle.
  subtitle: {
    fontSize: 18,
    marginTop: 8,
  },


  // My Trips section.
  section: {
    marginTop: 50,
  },


  // Section title.
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },


  // Message shown when there are no trips.
  emptyMessage: {
    fontSize: 16,
    marginTop: 20,
  },


  // Individual trip card.
  tripCard: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#F9FAFB',
  },


  // Trip destination text.
  tripDestination: {
    fontSize: 20,
    fontWeight: 'bold',
  },


  // General trip information.
  tripDetails: {
    fontSize: 16,
    marginTop: 8,
  },


  // Trip notes.
  tripNotes: {
    fontSize: 15,
    marginTop: 8,
  },


  // Container for the action buttons.
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },


  // Edit button styling.
  editButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#2563EB',
  },


  // Delete button styling.
  deleteButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#DC2626',
  },


  // Text displayed inside action buttons.
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },


  // Add New Trip button.
  button: {
    marginTop: 30,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#2563EB',
  },


  // Add New Trip button text.
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

});