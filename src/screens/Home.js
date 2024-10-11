import { Text, View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import UserProfile from '../components/UserProfile';
import useLinkedInUserInfo from '../hooks/useFetchUserInfo';


const Home = () => {

  const { userInfo, loading: userLoading, error } = useLinkedInUserInfo();

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenue</Text>
      </View>
        {userLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <UserProfile user={userInfo} />
          </ScrollView>
        )}
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