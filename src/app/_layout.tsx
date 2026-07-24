import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Travel Planner',
        }}
      />

      <Stack.Screen
        name="add-trip"
        options={{
          title: 'Add Trip',
        }}
      />

      <Stack.Screen
        name="edit-trip"
        options={{
          title: 'Edit Trip',
        }}
      />
    </Stack>
  );
}