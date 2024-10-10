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

const handleDeepLink = useCallback(async (event) => {
  
  // Extract the URL from the deep link event.
 const { url } = event;

 if (url) {
    // Extract parameters (like code and state) from the URL.
   const params = getParamsFromUrl(url);
   // The authorization code from the URL.
   const code = params.code;
   // The state value returned by LinkedIn.
   const returnedState = params.state;

   // Check if both the code and state exist.
   if (code && returnedState) {
      // Log success message
      log.info('Authorization code and state received successfully.');
      // Show a loading indicator while processing.
      setIsLoading(true);

     try {
       // Retrieve the previously stored state for CSRF validation.
       const storedState = await getStoredState();

        // Check if the returned state matches the stored state (CSRF protection).
       if (returnedState !== storedState) {
         log.error('State mismatch detected', error.message, error.stack);
         throw new Error('An error occurred during the login process. Please try again.');
       }

       // Exchange the authorization code for an access token.
       await exchangeCodeForToken(code, clientId, clientSecret, redirectUri);

       // Check if the token was successfully stored.
       const tokenStored = await getToken();
       if (tokenStored) {
         navigation.navigate('Home');

       } else {
         // Log any errors that occur during the process.
         log.error('Aucun token stocké après l\'échange de code.', error.message, error.stack);
       }

     } catch (error) {
       log.error('Error details:', error.message, error.stack);
       return error.message;

     } finally {
       // Stop the loading indicator once the process is complete.
       setIsLoading(false);
     }
   } 
 }
}, [navigation]);