import * as SecureStore from 'expo-secure-store';
import log from '../utils/logger';


// Key to store the authentication state in SecureStore.
const STATE_KEY = 'authState';


/**
 * Stores the authentication state securely.
 * 
 * @async
 * @function storeState
 * @param {string} state - The state string to store.
 * @description This function saves the authentication state to Expo SecureStore and logs the result. 
 * If an error occurs during storage, it logs the error message.
 */

export async function storeState(state) {
  try {
    // Store the provided state securely in SecureStore.
    await SecureStore.setItemAsync(STATE_KEY, state);

    // Log success message
    log.info('State stored successfully:', state);

  } catch (error) {

    // Log any errors that occur during storage
    log.debug('Error storing state:', error.message, error.stack);
  }
}