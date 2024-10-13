import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

/**
 * MapScreen component shows the user's current location on a map.
 * It receives location and loading status as props from the parent component.
 * 
 * @component
 * @param {Object} props - The props object.
 * @param {Object} props.location - The user's location data.
 * @param {boolean} props.isLoading - Whether the location is still loading.
 * @param {string} props.errorMsg - The error message if location fetching fails.
 * @returns {JSX.Element} - The MapScreen component, with a map displaying the user's location.
 */

export default function MapScreen({ location, isLoading, errorMsg }) {
  
  // Show loading indicator while fetching location
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Show error message if location fetch fails
  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  // Display the map with the user's location marked
  if (location) {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Votre localisation"
          />
        </MapView>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '65%',
    marginTop: 10,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
