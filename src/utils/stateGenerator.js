
/**
 * Generates a random string used as the state parameter in OAuth authentication.
 * This helps prevent CSRF (Cross-Site Request Forgery) attacks.
 * @returns {string} A random state string consisting of alphanumeric characters.
 */

export function generateRandomState() {
  // Generate two random strings and concatenate them
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}