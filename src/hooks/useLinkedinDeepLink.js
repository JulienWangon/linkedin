import { useEffect, useState, useCallback } from 'react';
import { Linking } from 'react-native';
import { exchangeCodeForToken } from '../auth/linkedinAuthService';
import { getStoredState } from '../auth/stateService';
import { getToken } from '../auth/tokenService';
import { getParamsFromUrl } from '../services/deepLinkService';
import log from '../utils/logger';

// Retrieving environment variables 
const clientId = process.env.LINKEDIN_CLIENT_ID;
const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
const redirectUri = process.env.LINKEDIN_REDIRECT_URI;


/**
 * Hook to handle LinkedIn OAuth Deep Links.
 * 
 * @function useLinkedInDeepLink
 * @returns {Object} - An object containing the loading state { isLoading }.
 */

export default function useLinkedInDeepLink(navigation) {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles incoming deep links and processes the OAuth flow.
   * 
   * @async
   * @function handleDeepLink
   * @param {Object} event - The event object containing the URL from the deep link.
   * @returns {Promise<void>} - A promise that resolves after processing the deep link.
   */
  const handleDeepLink = useCallback(async (event) => {
  
    // Extract the URL from the deep link event.
    const { url } = event;

    if (url) {
      // Extract parameters (like code and state) from the URL.
      const params = getParamsFromUrl(url);
      const code = params.code;
      const returnedState = params.state;

      // Check if both the code and state exist.
      if (code && returnedState) {
        log.info('Authorization code and state received successfully.');

        // Show a loading indicator while processing.
        setIsLoading(true);

        try {
          // Retrieve the previously stored state for CSRF validation.
          const storedState = await getStoredState();

          // Check if the returned state matches the stored state (CSRF protection).
          if (returnedState !== storedState) {
            log.error('State mismatch detected. Possible CSRF attack.');
            throw new Error('An error occurred.');
          }

          // Exchange the authorization code for an access token.
          await exchangeCodeForToken(code, clientId, clientSecret, redirectUri);
          log.info('Authorization code successfully exchanged for access token.');

          // Check if the token was successfully stored.
          const tokenStored = await getToken();
          if (tokenStored) {
            navigation.navigate('Home');

          } else {
            // Log a warning if no token was stored.
            log.warn('No token stored after code exchange.');
          }

        } catch (error) {
          // Log detailed error information for debugging purposes.
          log.error('Error during the token exchange process:', error.message, error.stack);
          return error.message;

        } finally {
          // Stop the loading indicator once the process is complete.
          setIsLoading(false);
        }
      } else {
        // Log a warning if code or state are missing from the URL.
        log.warn('Missing code or state in the deep link URL.');
      }
    }
  }, [navigation]);


  /**
   * useEffect hook to listen for deep links and handle them.
   * 
   * @function useEffect
   * @description Adds an event listener to process deep links when they are received.
   */
  useEffect(() => {
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Check if the app was opened directly via a deep link.
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    // Clean up the event listener when the component unmounts.
    return () => {
      subscription.remove();
    };
  }, [handleDeepLink]);

  // Return the loading state for UI updates.
  return { isLoading };
}