import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';


export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
    </Stack>
  );
}
