import * as SecureStore from 'expo-secure-store';
import log from '../utils/logger';

// Key used to store the access token securely.
const TOKEN_KEY = 'accessToken';


/**
 * Stores the access token securely.
 * 
 * @async
 * @function storeToken
 * @param {string} token - The access token to store.
 * @description This function stores the provided access token in Expo SecureStore. 
 * It logs success or errors if the token fails to store.
 */

export async function storeToken(token) {
  try {
    // Store the token in SecureStore using the TOKEN_KEY.
    await SecureStore.setItemAsync(TOKEN_KEY, token);

    // Log success message
    log.info('Token stored successfully:');
   
  } catch (error) {
    // Log any errors that occur during storage
    log.error('Error storing token:', error.message, error.stack);
    return null;
  }
};


/**
 * Retrieves the stored access token.
 * 
 * @async
 * @function getToken
 * @returns {Promise<string|null>} - Returns the stored token if found, or null if no token is found.
 * @description This function retrieves the access token from SecureStore. 
 * It logs the result or warns if no token is found. If an error occurs, it logs the error and returns null.
 */

export async function getToken() {
  try {
    // Retrieve the token from SecureStore using TOKEN_KEY.
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    if (token) {
      // Log success message 
      log.info('Token retrieved successfully:', token);

      // return stored token
      return token;

    } else {
       // If token is not found, log a warning
       log.warn('No token found in SecureStore.');
      return null;
    }

  } catch (error) {
    // Log error if something goes wrong during retrieval
    log.error('Error while retrieving token:', error.message, error.stack);
    return null;
  }
};


/**
 * Removes the stored access token.
 * 
 * @async
 * @function removeToken
 * @description This function deletes the access token from SecureStore. 
 * It logs success if the token is removed or an error if the removal fails.
 */

export async function removeToken() {
  try {
     // Delete the token from SecureStore.
    await SecureStore.deleteItemAsync(TOKEN_KEY);
     // Log success message 
     log.info('Token deleted successfully:');
   
  } catch (error) {
    // Log any errors that occur during token removal.
    log.error('Error while deleting token:', error.message, error.stack);
    return null;
  }
};


/**
 * Checks if the token exists and redirects accordingly.
 * 
 * @async
 * @function checkTokenAndRedirect
 * @param {Object} navigation - React Navigation object for handling navigation.
 * @returns {Promise<boolean>} - Returns true if the token is found and redirects to the Home page, otherwise false.
 * @description This function checks for the existence of the access token. If the token is found,
 * it redirects the user to the home page. Logs any errors or warnings and returns false if no token is found.
 */

export async function checkTokenAndRedirect(navigation) {
  try {
    // Check if the token exists by retrieving it from SecureStore.
    const storedToken = await getToken();

    if (storedToken) {
      // If the token is found, navigate to the Home screen.
      navigation.navigate('Home');
      return true;
    } 

      return null;
    
  } catch (error) {
    // Log any errors that occur during the token check.
    log.error('Error while verifying the token:', error.message, error.stack);
    return null;
  }
}