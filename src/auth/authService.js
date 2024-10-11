import { storeState } from './stateService';
import { checkTokenAndRedirect } from './tokenService';
import log from '../utils/logger';


/**
 * Handles the login process with LinkedIn.
 * 
 * @async
 * @function handleLogin
 * @param {Function} promptAsync - A function that triggers the LinkedIn login prompt.
 * @param {string} randomState - A randomly generated string for state validation.
 * @param {Object} navigation - React Navigation object for handling navigation.
 * @throws {Error} If an error occurs during the login process.
 * 
 * @description This function stores a random state, attempts LinkedIn login via the promptAsync function,
 * logs the result, and redirects based on the result type (success, dismiss, or cancel).
 */

export const handleLogin = async (promptAsync, randomState, navigation) => {
  try {
    // Store the randomly generated state for security checks.
    await storeState(randomState);

    // Check if the login was successful.
    const result = await promptAsync();

    if (result.type === 'success') {
      // Log success message
      log.info('LinkedIn authentication successful.');

      // Check the token and redirect
      await checkTokenAndRedirect(navigation);
     
    }else if (result.type === 'dismiss') {
      log.warn('Login closed by the user, but the process may have succeeded.');
      // After a successful login, check if the token is valid and handle redirection based on the token.
      await checkTokenAndRedirect(navigation);

    } else if (result.type === 'cancel') {
      log.error('Login canceled by the user.');
      return null;

    } else {
      // If an unknown result type occurs, throw an error.
      throw new Error(`Échec de la connexion: ${result.type}`);
      return null;
    }

  } catch (error) {
    // Log any errors and throw a new error.
    log.error('Erreur lors de la connexion:', error.message, error.stack);
    throw new Error('Erreur pendant le processus de connexion.');
    return null;
  } 
};
