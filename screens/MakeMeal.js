import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
require('dotenv').config();

const MakeMeal = ({ navigation }) => {
  return (
    <View style={styles.container}>
    <Image
        source={require('./logo.png')}
        style={styles.logo}
      />
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Snack')}
        >
          <Text style={styles.buttonText}>Snack</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Entree')}
        >
          <Text style={styles.buttonText}>Entrée</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Side')}
        >
          <Text style={styles.buttonText}>Side</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Dessert')}
        >
          <Text style={styles.buttonText}>Dessert</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFCDC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FED9B7',
    width: 150, // Adjusted width
    height: 150, // Adjusted height
    borderRadius: 75, // Adjusted borderRadius to make it a circle
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#F07167',
    fontSize: 30, // Adjusted fontSize
    fontWeight: 'bold',
  },
  logo: {
    width: 500, // Adjust the width and height to fit your image size
    height: 250,
    aspectRatio: 1.5, 
    resizeMode: 'contain',
  },
});

export default MakeMeal;
