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
      log.info('Token retrieved successfully:', storedState);

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