import log from "../utils/logger";
import { getToken } from "../auth/tokenService";


/**
 * Fetches LinkedIn user information using the access token.
 * 
 * @async
 * @function fetchUserInfo
 * @returns {Object} - The user's LinkedIn profile information.
 * @throws {Error} - If the token is missing or the request fails.
 * 
 * @description This function retrieves the LinkedIn user's profile data by making an API request to LinkedIn's userinfo endpoint.
 * It uses the stored access token for authorization and logs the user information or any errors that occur.
 */


export async function fetchUserInfo() {
  try {
    // Retrieve the stored access token.
    const token = await getToken();

    if (!token) {
      // If no token is found, throw an error.
      throw new Error('Authentification requise. Veuillez vous reconnecter.');
    }

    // Fetch the user's profile data from LinkedIn API.
    const userInfoResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      method: 'GET',
      headers: {
        // Pass the access token in the Authorization header.
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is successful, otherwise throw an error.
    if (!userInfoResponse.ok) {
      throw new Error(`Erreur lors de la récupération des informations utilisateur: ${userInfoResponse.statusText}`);
    }

    // Parse the response JSON to extract the user info.
    const userInfo = await userInfoResponse.json();
    log.info('User information retrieved successfully:', userInfo);
    
    // Return the user information.
    return userInfo;

  } catch (error) {
    // Log any errors that occur during the process with full details.
    log.error('Error while fetching user information:', error.message, error.stack);
    throw error;
  }
}