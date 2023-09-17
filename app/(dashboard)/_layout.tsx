import { Stack, useNavigation } from 'expo-router';
import { Image, TouchableOpacity, useColorScheme } from 'react-native';
import { StarIcon, backIcon, cartEmptyIcon } from '../../constants/Icons';
import Colors from '../../constants/Colors';
import { Text, View } from '../../components/Themed';

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
          headerStyle: {
            backgroundColor: '#fff'
          }
        }}
      />
      <Stack.Screen 
        name="product-review" 
        options={{
          headerTitle: 'Review',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={backIcon} style={{width: 24, height: 24, objectFit: 'contain'}} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Image source={StarIcon} style={{width: 20, height: 20, objectFit: 'contain'}} />
              <Text style={{fontFamily: 'bold'}}>4.5</Text>
            </View>
          ),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#fff'
          }
        }}
      />
      <Stack.Screen 
        name="order-summary" 
        options={{
          headerTitle: 'Order Summary',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={backIcon} style={{width: 24, height: 24, objectFit: 'contain'}} />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#fff'
          }
        }}
      />
      {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
    </Stack>
  );
}
