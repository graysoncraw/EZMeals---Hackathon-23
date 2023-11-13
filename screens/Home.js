import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');
const scale = PixelRatio.get();

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./logo.png')}
        style={styles.logo}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MainMenu')}
      >
        <Text style={styles.buttonText}>GO</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#FED9b7',
    padding: 10 * scale,
    borderRadius: 8 * scale,
    marginTop: 8 * scale,
  },
  buttonText: {
    color: '#f07167',
    fontSize: 20 * scale,
  },
  title: {
    fontSize: 18 * scale,
  },
  largeTitle: {
    fontSize: 22 * scale,
  },
  logo: {
    width: 500, // Adjust the width and height to fit your image size
    height: 350,
    aspectRatio: 1, 
    resizeMode: 'contain',
  },
});

export default Home;
