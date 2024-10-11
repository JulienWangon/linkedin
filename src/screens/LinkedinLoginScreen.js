import React, { useState } from 'react';
import Constants from 'expo-constants';
import { SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import { useNavigation } from '@react-navigation/native';
import { handleLogin } from '../auth/authService';
import { discovery } from '../auth/linkedinAuthService';
import { generateRandomState } from '../utils/stateGenerator';
import { getToken } from '../auth/tokenService';
import useLinkedInDeepLink from '../hooks/useLinkedinDeepLink';
import  LoginButton  from '../components/LoginButton';
import log from '../utils/logger';


/**
 * LinkedinLoginScreen component handles the login process with LinkedIn.
 * It displays a login button and handles authentication when the button is pressed.
 * 
 * @component
 * @returns {JSX.Element} The LinkedIn login screen with a button.
 */

const LinkedinLoginScreen  = () => {
  // Get navigation object to handle redirection.
  const navigation = useNavigation();
  // Generate a random state for security (CSRF protection).
  const [randomState] = useState(generateRandomState());
  // Track the loading state.
  const [loading, setLoading] = useState(false);
  // Hook to handle deep links for LinkedIn authentication.
  const { isLoading } = useLinkedInDeepLink(navigation);

  // Create an authentication request using expo-auth-session.
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    { 
      clientId: Constants.expoConfig.extra.LINKEDIN_CLIENT_ID, // LinkedIn client ID from environment variables.
      redirectUri: Constants.expoConfig.extra.LINKEDIN_REDIRECT_URI, // Redirect URI for LinkedIn authentication.
      scopes: ['openid', 'email', 'profile'],  // Permissions requested from LinkedIn.
      state: randomState, // Pass the randomly generated state to ensure security.
      responseType: 'code', // Response type is 'code' for authorization code flow.
    },
    discovery // LinkedIn discovery configuration for OAuth.
  );

  /**
   * Handle the login button press.
   * It checks if a token is already stored and, if not, initiates the login process.
   */

  const handleLoginPress = async () => {
    try {
      // Check if the user is already authenticated by retrieving the token.
      const token = await getToken();
  
      if (token) {
        // Log success message for token presence
        log.info('Token found. Navigating to Home.');

        // If a token is found, navigate directly to the Home screen.
        navigation.navigate('Home');

      } else {
        // Log the start of the login process
        log.info('No token found. Starting login process.');

        // If no token, show loading spinner and start the login process.
        setLoading(true); 
        await handleLogin(promptAsync, randomState, navigation); 
      }

    } catch (error) {
      // Log any errors that occur during the login process.
      log.error('Error during login process:', error.message, error.stack);

    } finally {
      // Stop the loading spinner once the process is complete.
      setLoading(false);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0072b1" />
      ) : (
        <LoginButton onPress={handleLoginPress} /> 
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default LinkedinLoginScreen;