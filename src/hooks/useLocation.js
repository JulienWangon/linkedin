import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import log from '../utils/logger';


/**
 * Custom hook to request location permissions and get the user's current location.
 * 
 * @function useLocation
 * @returns {Object} - The current location, loading state, and any error messages.
 */

export function useLocation() {

  // State to store the user's location.
  const [location, setLocation] = useState(null);
  // State to store any error message.
  const [errorMsg, setErrorMsg] = useState(null);
  // State to track if the location is still loading.
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to request location permission and get the current location
    const requestLocation = async () => {
      try {
        // Request location permissions from the user.
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          // If permission is denied, set an error message.
          setErrorMsg('Permission to access location was denied');

          log.warn('Location permission denied by the user.');
          // Exit if permissions are not granted.
          return;
        }

        // Get the current position
        // Set loading state to true while fetching location.
        setIsLoading(true);
        log.info('Fetching user location...');
        
        const location = await Location.getCurrentPositionAsync({});
        // Store the user's location in the state.
        setLocation(location);
        log.info('User location retrieved successfully:', location);
      
      } catch (error) {
        // Set an error message if there is a problem fetching the location.
        setErrorMsg('Error fetching location');
        log.error('Error fetching location:', error.message, error.stack);
      
      } finally {
        // Set loading to false when the location request is done (success or error).
        setIsLoading(false);
        log.info('Location request finished.');
       
      }
    };
    // Call the function to request location when the component mounts.
    requestLocation();

  // Empty dependency array means this effect runs once after the initial render.
  }, []);

  // Return the location, loading status, and any error message.
  return { location, isLoading, errorMsg };

}