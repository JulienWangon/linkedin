import { useState, useEffect } from 'react';
import { fetchUserInfo } from '../services/fetchUserInfo';
import log from '../utils/logger';


/**
 * Custom hook to fetch and manage LinkedIn user information.
 * 
 * @returns {Object} - Returns an object containing userInfo, loading state, and error state.
 * 
 * @description This hook retrieves the user's information from LinkedIn using the fetchUserInfo service. 
 * It handles the loading state while fetching data, and catches any errors that occur. 
 * The result is stored in the userInfo state, while loading and error states are used for handling UI changes.
 */

export default function useLinkedInUserInfo() {
  // Store the user information.
  const [userInfo, setUserInfo] = useState(null);
  // Track the loading state.
  const [loading, setLoading] = useState(true);
  // Track any error that occurs during fetching.
  const [error, setError] = useState(null);

  useEffect(() => {
     // Function to fetch user information.
    const getUserInfo = async () => {
      try {
        log.info('Fetching user information from LinkedIn...');

        // Fetch user information from LinkedIn.
        const user = await fetchUserInfo();

        // Set the user info in the state.
        setUserInfo(user);
        log.info('User information retrieved successfully:', user);
        
      } catch (error) {
        // If an error occurs, set the error message in the state.
        setError(error.message);
        
        // Log the error with full details (message and stack).
        log.error('Error fetching user information:', error.message, error.stack);

      } finally {
        // Stop the loading indicator after fetching is complete (success or error).
        setLoading(false);
      }
    };

    // Call the function to fetch user info when the component mounts.
    getUserInfo();

    // Empty dependency array means this effect runs once after the initial render.
  }, []);

  // Return the user info, loading state, and error state.
  return { userInfo, loading, error };
}