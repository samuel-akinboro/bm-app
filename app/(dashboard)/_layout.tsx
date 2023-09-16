import { Stack, useNavigation } from 'expo-router';
import { Image, TouchableOpacity, useColorScheme } from 'react-native';
import { backIcon, cartEmptyIcon } from '../../constants/Icons';
import Colors from '../../constants/Colors';


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="product-detail" 
        options={{
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={backIcon} style={{width: 24, height: 24, objectFit: 'contain'}} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <Image source={cartEmptyIcon} style={{width: 24, height: 24, objectFit: 'contain'}} />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        }}
      />
      {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
    </Stack>
  );
}
