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
}