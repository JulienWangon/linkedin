/**
 * Extracts query parameters from a given URL string.
 * 
 * @function getParamsFromUrl
 * @param {string} url - The URL string from which to extract the parameters.
 * @returns {Object} - An object containing key-value pairs of the query parameters.
 */

export const getParamsFromUrl = (url) => {

  // Object to hold the extracted parameters
  const params = {};
  // Extract the part of the URL after the "?"
  const queryString = url.split('?')[1];
  
   // Check if there is a query string
  if (queryString) {
    // Split the string into individual parameters
    const queryArray = queryString.split('&'); 

     // Loop through each parameter and split it into key-value pairs
    queryArray.forEach(param => {
      // Handle cases where "=" might be missing
      const [key, value = ''] = param.split('='); 
      // Ensure the key exists
      if (key) {  
        // Decode the parameter value and add to the params object
        params[key] = decodeURIComponent(value);
      }
    });
  }
  
  // Return the extracted parameters
  return params;
};
