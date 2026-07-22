import AsyncStorage from '@react-native-async-storage/async-storage';

const TRIPS_KEY = '@travel_planner_trips';

export async function saveTrips(trips: any[]) {
  try {
    await AsyncStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
  } catch (error) {
    console.error('Error saving trips:', error);
  }
}

export async function getTrips() {
  try {
    const trips = await AsyncStorage.getItem(TRIPS_KEY);

    if (trips) {
      return JSON.parse(trips);
    }

    return [];
  } catch (error) {
    console.error('Error loading trips:', error);
    return [];
  }
}
