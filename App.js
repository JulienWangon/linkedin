import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@reduxjs/toolkit";
import LinkedinLoginScreen from "./src/screens/LinkedinLoginScreen";
import { Home } from "./src/screens/Home";



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


