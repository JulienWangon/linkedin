import React from "react";
import { enableScreens } from 'react-native-screens'; // Import enableScreens
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LinkedinLoginScreen from "./src/screens/LinkedinLoginScreen";
import Home from "./src/screens/Home";


enableScreens();
// Create a stack navigator.
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // The NavigationContainer manages the navigation structure of the app.
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LinkedinLoginScreen" component={LinkedinLoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


