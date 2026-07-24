import AsyncStorage from '@react-native-async-storage/async-storage';


// This key identifies where the trips will be stored.
const TRIPS_KEY = '@travel_planner_trips';


// Represents the structure of a trip stored in the application.
export type Trip = {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  notes: string;
};


// Saves the complete list of trips to local storage.
export async function saveTrips(
  trips: Trip[],
): Promise<void> {

  try {

    /*
      JSON.stringify converts the JavaScript array
      into a string so it can be stored in AsyncStorage.
    */
    await AsyncStorage.setItem(
      TRIPS_KEY,
      JSON.stringify(trips),
    );

  } catch (error) {

    // Logs an error if the data cannot be saved.
    console.error(
      'Error saving trips:',
      error,
    );
  }
}


// Loads all saved trips from local storage.
export async function getTrips(): Promise<Trip[]> {

  try {

    /*
      AsyncStorage returns the saved data as a string
      or null if no data has been saved yet.
    */
    const trips = await AsyncStorage.getItem(
      TRIPS_KEY,
    );


    /*
      If saved data exists, JSON.parse converts the
      string back into a JavaScript array.
    */
    if (trips) {
      return JSON.parse(trips);
    }


    /*
      If there are no saved trips yet,
      return an empty array.
    */
    return [];

  } catch (error) {

    /*
      If an error occurs while loading the data,
      log the error and return an empty array.
    */
    console.error(
      'Error loading trips:',
      error,
    );

    return [];
  }
}


// Updates an existing trip in local storage.
export async function updateTrip(
  updatedTrip: Trip,
): Promise<void> {

  try {

    // Load all currently saved trips.
    const trips = await getTrips();


    /*
      Replace the old trip with the updated trip.

      The trip ID is used to identify which trip
      should be replaced.
    */
    const updatedTrips = trips.map((trip) => {

      if (trip.id === updatedTrip.id) {
        return updatedTrip;
      }

      return trip;
    });


    // Save the updated list of trips.
    await saveTrips(updatedTrips);

  } catch (error) {

    // Logs an error if the trip cannot be updated.
    console.error(
      'Error updating trip:',
      error,
    );
  }
}


// Deletes a trip from local storage.
export async function deleteTrip(
  tripId: string,
): Promise<void> {

  try {

    // Load all currently saved trips.
    const trips = await getTrips();


    /*
      Keep every trip except the one
      with the selected ID.
    */
    const updatedTrips = trips.filter(
      (trip) => trip.id !== tripId,
    );


    // Save the list without the deleted trip.
    await saveTrips(updatedTrips);

  } catch (error) {

    // Logs an error if the trip cannot be deleted.
    console.error(
      'Error deleting trip:',
      error,
    );
  }
}