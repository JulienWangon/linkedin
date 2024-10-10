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
};


/**
 * Retrieves the stored authentication state.
 * 
 * @async
 * @function getStoredState
 * @returns {Promise<string|null>} - Returns the stored state if found, or null if not found or an error occurs.
 * @description This function fetches the authentication state from SecureStore. It logs the retrieved state,
 * or a warning if no state is found. In case of errors, it logs the error and returns null.
 */

export async function getStoredState() {
  try {
    // Retrieve the stored state from SecureStore.
    const storedState = await SecureStore.getItemAsync(STATE_KEY);
    if (storedState) {
      // Log success message 
      log.info('State retrieved successfully:', storedState);

      return storedState;

    } else {
      // If no state is found, log a warning
      log.warn('No state found in SecureStore.');
      return null;
    }

  } catch (error) {
    // Log error if something goes wrong during retrieval
    log.error('Error while retrieving state:', error.message, error.stack);
    return null;
  }
};


/**
 * Removes the stored authentication state.
 * 
 * @async
 * @function removeStoredState
 * @description This function deletes the authentication state from SecureStore. 
 * It logs the result or an error if one occurs during the deletion process.
 */

export async function removeStoredState() {
  try {
    // Delete the stored state from SecureStore.
    await SecureStore.deleteItemAsync(STATE_KEY);
    // Log success message 
    log.info('State deleted successfully:');

  } catch (error) {
    // Log any errors that occur during deletion.
    log.error('Error while deleting state:', error.message, error.stack);
  }
};
