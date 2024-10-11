import { View, Text, Image, StyleSheet } from 'react-native';


/**
 * UserProfile component displays the user's profile information.
 * 
 * @component
 * @param {Object} user - The user object containing profile data.
 * @param {string} user.picture - The URL of the user's profile picture.
 * @param {string} user.given_name - The user's given name.
 * @param {string} user.family_name - The user's family name.
 * @param {string} user.email - The user's email address.
 * @returns {JSX.Element} - A component that displays the user's profile picture, name, and email.
 */

const UserProfile = ({ user }) => {
  if (!user) {
   
    return <Text>Chargement des informations utilisateur...</Text>;
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