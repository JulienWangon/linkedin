import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { handleLogout } from '../auth/authService';


/**
 * LogoutButton component that triggers the logout function.
 * 
 * @returns {JSX.Element} - A button with a logout icon.
 * 
 * @description This component renders a button with a "power" icon. 
 * When pressed, it calls the `handleLogout` function to log the user out and navigate to the login screen.
 */

const LogoutButton = () => {
  // Get the navigation object from React Navigation.
  const navigation = useNavigation();  

  return (
    // calls handleLogout when pressed.
    <TouchableOpacity onPress={() => handleLogout(navigation)} style={{ padding: 10, alignSelf: 'flex-end' }}>
      <MaterialIcons name="power-settings-new" size={30} color="#ff0000" />
    </TouchableOpacity>
  );
};

export default LogoutButton;