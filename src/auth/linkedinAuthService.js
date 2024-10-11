import { storeToken, removeToken, getToken } from "./tokenService";
import log from '../utils/logger';


/**
 * LinkedIn OAuth 2.0 endpoints for authorization, token, and revocation.
 */

export const discovery = {
  authorizationEndpoint: 'https://www.linkedin.com/oauth/v2/authorization',
  tokenEndpoint: 'https://www.linkedin.com/oauth/v2/accessToken',
  revokeEndpoint: 'https://www.linkedin.com/oauth/v2/revoke',
};


/**
 * Exchanges an authorization code for an access token.
 * 
 * @async
 * @function exchangeCodeForToken
 * @param {string} code - The authorization code received after successful login.
 * @param {string} clientId - LinkedIn app client ID.
 * @param {string} clientSecret - LinkedIn app client secret.
 * @param {string} redirectUri - The redirect URI used during login.
 * @returns {Promise<void|null>} - Returns void if successful or null if an error occurs.
 * 
 * @description This function sends the authorization code to LinkedIn's token endpoint,
 * retrieves the access token, and stores it locally. Logs any errors that occur during the process.
 */

export async function exchangeCodeForToken(code, clientId, clientSecret, redirectUri) {
  const tokenUrl = discovery.tokenEndpoint;

  try {
    // Set up the request parameters to exchange the code for an access token.
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    });

    // Send a POST request to LinkedIn to get the access token.
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = await response.json();

    // Check if the access token was successfully received.
    if (data.access_token) {
      // Log success message
      log.info('Access token successfully obtained from LinkedIn.');
      // Store the access token locally.
      await storeToken(data.access_token);
  
    } else {
      // Log the failure and return an error message directly
      log.warn('Failed to obtain access token.', data);
      return null;
    }
  } catch (error) {
    // Log the error and return a user-friendly message
    log.error('Error during the token exchange process:', error.message, error.stack);
    return null;
  }
}
