import React from 'react';
import { View,Image, Text, TextInput, StyleSheet,TouchableOpacity, SafeAreaView,PixelRatio, Alert } from 'react-native';
require('dotenv').config();

const scale = PixelRatio.get();

const AddIngredients = ({ navigation }) => {
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');
  const [name, onChangeName] = React.useState('');
  const [amount, onChangeAmount] = React.useState('');
  const [calories, onChangeCalories] = React.useState('');
  const [totalFat, onChangeTotalFat] = React.useState('');
  const [cholesterol, onChangeCholesterol] = React.useState('');
  const [sodium, onChangeSodium] = React.useState('');
  const [totalCarbohydrate, onChangeTotalCarbohydrate] = React.useState('');
  const [protein, onChangeProtein] = React.useState('');

  const handlePress = () => {
    // Function 1
    handleAddIngredient();

    // Function 2
    Alert.alert(
      'Success',
      'Your ingredient has successfully been added.',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );

    handleNavigation();

  };

  const handleNavigation = () => {
    // Navigate to the "AnotherPage" screen
    navigation.navigate('MainMenu');
  };

  const handleAddIngredient = () => {
    const ingredientData = {
      name,
      amount: parseInt(amount, 10), 
      calories: parseInt(calories, 10), 
      totalFat: parseInt(totalFat, 10),  
      cholesterol: parseInt(cholesterol, 10), 
      sodium: parseInt(sodium, 10), 
      totalCarbohydrate: parseInt(totalCarbohydrate, 10), 
      protein: parseInt(protein, 10),
    };

    fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:3000/postPantry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingredientData),
      
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        // Handle success, navigate to another screen, show a success message, etc.
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error, show an error message, etc.
      });
  };

  return (
    <SafeAreaView style={styles.container}>
    <View>
    <Image
        source={require('./logo.png')}
        style={styles.logo}
      />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder="Ingredient Name"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeAmount}
          value={amount}
          keyboardType="numeric"
          placeholder="Amount You Have"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeCalories}
          value={calories}
          keyboardType="numeric"
          placeholder="Calories Contained"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTotalFat}
          value={totalFat}
          keyboardType="numeric"
          placeholder="Total Fat"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeCholesterol}
          value={cholesterol}
          keyboardType="numeric"
          placeholder="Cholesterol"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeSodium}
          value={sodium}
          keyboardType="numeric"
          placeholder="Sodium"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTotalCarbohydrate}
          value={totalCarbohydrate}
          keyboardType="numeric"
          placeholder="Total Carbs"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeProtein}
          value={protein}
          keyboardType="numeric"
          placeholder="Protein"
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Add Ingredient</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFCDC',
    padding: 16,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    color: '#f07167',
    marginRight: 8,
    fontSize: 18,
  },
  buttonText: {
    color: '#fed9b7',
    fontSize: 10 * scale, // Adjusted responsive fontSize for smaller buttons
  },
  button: {
    backgroundColor: '#f07167',
    padding: 8 * scale, // Adjusted responsive padding for smaller buttons
    borderRadius: 6 * scale, // Adjusted responsive borderRadius for smaller buttons
     // Adjusted responsive margin for smaller buttons
  },
  input: {
    flex: 0,
    width: 250,
    height: 40,
    borderColor: '#fed9b7',
    borderWidth: 3,
    paddingHorizontal: 4,
    textAlign: 'center',
  },
  logo: {
    width: 400, // Adjust the width and height to fit your image size
    height: 180,
    aspectRatio: 1.5, 
    resizeMode: 'contain',
  },
  
});

export default AddIngredients;
