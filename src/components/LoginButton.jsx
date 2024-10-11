import { useRef } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';

// Get the dimensions of the device screen.
const { width, height } = Dimensions.get('window');


/**
 * LoginButton component that displays a sign-in button with scaling animation.
 * 
 * @param {Function} onPress - The function to be called when the button is pressed.
 * @returns {JSX.Element} - A button that scales when pressed, with an image background.
 * 
 * @description This component shows a sign-in button that scales on press. It uses the Animated API 
 * to animate the button size when the user presses it. An image background is used for styling the button.
 */


const LoginButton = ({ onPress }) => {

  // Create a ref for the animated scale value.
 const scaleAnim = useRef(new Animated.Value(1)).current;

 /**
  * Function to handle the press-in effect, scaling down the button.
   */
 const handlePressIn = () => {
   // Start a spring animation to reduce the scale of the button when pressed in
   Animated.spring(scaleAnim, {
     toValue: 0.9,
     useNativeDriver: true,
   }).start();
 };

 /**
  * Function to handle the press-out effect, scaling the button back to normal.
  */

 const handlePressOut = () => {
   // Start a spring animation to return the button scale to normal after pressing out.
   Animated.spring(scaleAnim, {
     toValue: 1,
     useNativeDriver: true,
   }).start();
 };

 return (
   <View style={styles.container}>
     <Text style={styles.signInText}>Sign In</Text>
     <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
       <TouchableOpacity 
         onPress={onPress}
         onPressIn={handlePressIn} 
         onPressOut={handlePressOut}
         activeOpacity={0.7}
       >
         <ImageBackground 
           source={require('../../assets/images/Signin.png')} 
           style={styles.buttonBackground}
           imageStyle={{ borderRadius: 10 }}
           resizeMode="contain" 
         />
       </TouchableOpacity>
     </Animated.View>
   </View>
 );
};


//Style for the button
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontSize: 22, 
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  buttonBackground: {
    width: width * 0.5, 
    height: height * 0.07, 
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginButton;