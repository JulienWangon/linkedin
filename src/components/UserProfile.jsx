import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

/**
 * UserProfile component displays the user's profile information.
 * 
 * @component
 * @param {Object} user - The user object containing profile data.
 * @param {boolean} loading - Whether the user information is still loading.
 * @param {string} error - The error message, if any.
 * @returns {JSX.Element} - A component that displays the user's profile picture, name, and email.
 */

const UserProfile = ({ user, loading, error }) => {
  // Display loading indicator if loading state is true
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Display error message if there's an error
  if (error) {
    return <Text>Erreur: {error}</Text>;
  }

  // Display the user profile once loading is complete and there's no error
  if (!user) {
    return <Text>Les informations utilisateur sont indisponibles.</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user.picture }} 
        style={styles.profileImage}
      />
      <Text style={styles.name}>
        {user.given_name} {user.family_name}
      </Text>
      <Text style={styles.email}>{user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#555',
  },
});

export default UserProfile;
