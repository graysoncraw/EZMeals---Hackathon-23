import React from 'react';
import { View, Text,Image, TouchableOpacity, StyleSheet, PixelRatio } from 'react-native';

const scale = PixelRatio.get();

const MainMenu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./logo.png')}
        style={styles.logo}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MakeMeal')}
      >
        <Text style={styles.buttonText}>Make A Meal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddIngredients')}
      >
        <Text style={styles.buttonText}>Add Ingredients</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddRecipe')}
      >
        <Text style={styles.buttonText}>Add A Recipe</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Pantry')}
      >
        <Text style={styles.buttonText}>Pantry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFCDC',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: '#FED9b7',
    padding: 8 * scale, // Adjusted responsive padding for smaller buttons
    borderRadius: 6 * scale, // Adjusted responsive borderRadius for smaller buttons
    marginTop: -10 * scale, // Adjusted responsive margin for smaller buttons
  },
  buttonText: {
    color: '#f07167',
    fontSize: 12 * scale, // Adjusted responsive fontSize for smaller buttons
  },
  logo: {
    width: 600, // Adjust the width and height to fit your image size
    height: 170,
    aspectRatio: 1.6, 
    resizeMode: 'contain',


  },
});

export default MainMenu;
