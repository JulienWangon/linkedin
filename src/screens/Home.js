import { Text, View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import UserProfile from '../components/UserProfile';
import MapScreen from '../components/MapScreen';
import LogoutButton from '../components/LogoutButton';
import useLinkedInUserInfo from '../hooks/useFetchUserInfo';
import { useLocation } from '../hooks/useLocation';


const Home = () => {

  // Fetch the user's current location and loading state from useLocation hook.
  const { location, isLoading: locationLoading, errorMsg } = useLocation();

  // Fetch the LinkedIn user information and loading state from useLinkedInUserInfo hook.
  const { userInfo, loading: userLoading, error } = useLinkedInUserInfo();

  return (

    <View style={styles.container}> 

      <View style={styles.header}>
        <Text style={styles.title}>Bienvenue</Text>
        <LogoutButton/>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <UserProfile user={userInfo} loading={userLoading} error={error} />
        <MapScreen location={location} isLoading={locationLoading} errorMsg={errorMsg} />
      </ScrollView>

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginTop: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
});

export default Home;