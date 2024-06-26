import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { enableScreens } from 'react-native-screens';

// Import your screen components here
import Body from './screens/Body';
import Services from './screens/Services';
import Contact from './screens/Contact';
import Card1 from './screens/Card1';
import Card2 from './screens/Card2';
import Card3 from './screens/Card3';
import Card4 from './screens/Card4';
import Card5 from './screens/Card5';

enableScreens(); // Activate native screens

const Stack = createStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Your application initialization logic goes here

        // Example: Simulate async tasks like data loading, etc.
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('App prepared');
      } catch (error) {
        console.error('Error preparing app:', error);
      } finally {
        await SplashScreen.hideAsync();
        setAppIsReady(true);
        console.log('Splash screen hidden');
      }
    };

    prepareApp();
  }, []);

  if (!appIsReady) {
    return null; // You can display a loading screen here if needed
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Body"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name="Body" component={Body} />
        <Stack.Screen name="Services" component={Services} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="Card1">
          {props => <Card1 {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Card2">
          {props => <Card2 {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Card3">
          {props => <Card3 {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Card4">
          {props => <Card4 {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Card5">
          {props => <Card5 {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
