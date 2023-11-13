import React from 'react';
import { View,Image, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet,PixelRatio, KeyboardAvoidingView, Alert} from 'react-native';
require('dotenv').config();

const scale = PixelRatio.get();



const AddRecipe = ({ navigation }) => {
    const [ingredients, setIngredients] = React.useState('');
    const [mealName, onChangeMealName] = React.useState('');
    const [selectedMealType, setSelectedMealType] = React.useState('');
    const [instructions, onChangeInstructions] = React.useState('');
    

    const handlePress = () => {
      // Function 1
      handleAddRecipe();
  
      // Function 2
      Alert.alert(
        'Success',
        'Your new recipe has successfully been added.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );

      handleNavigation();
  
    };

    const handleNavigation = () => {
      // Navigate to the "AnotherPage" screen
      navigation.navigate('MainMenu');
    };
  
    const handleAddRecipe = () => {

      const ingredientsArray = ingredients.split(',').map(item => item.trim());

      const recipeData = {
        mealName,
        selectedMealType, 
        instructions, 
        ingredients: ingredientsArray
      };

      console.log(recipeData);
  
      fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:3000/postRecipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
        
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
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}
    >
  <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
    <View>
    <Image
        source={require('./logo.png')}
        style={styles.logo}
      />
            <View style={styles.inputContainer}>
            <View style={styles.radioContainer}>
              {['Entree', 'Side', 'Dessert', 'Snack'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.radio,
                    selectedMealType === type && styles.selectedRadio,
                  ]}
                  onPress={() => setSelectedMealType(type)}
                >
                  <Text style={{ textAlign: 'center' }}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
    </View>
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeMealName}
          value={mealName}
          placeholder="Recipe Name"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeInstructions}
          value={instructions}
          placeholder="Instructions Description"
        />
      </View>
        <View style={styles.inputContainer}>
        {/* <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
            <Text style={styles.addbuttonText}>Add</Text>
        </TouchableOpacity> */}
        <TextInput
            style={styles.inputIngredients}
            multiline
            numberOfLines={10} // You can adjust the number of lines
            onChangeText={(text) => setIngredients(text)}
            value={ingredients}
            placeholder="Enter Ingredients, Separating W/ Comma"
        />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Add Recipe</Text>
        </TouchableOpacity>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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
    input: {
        flex: 0,
        height: 40,
        width: 250,
        borderColor: '#fed9b7',
        borderWidth: 3,
        paddingHorizontal: 4,
        textAlign: 'center',
      },

      inputIngredients: {
        flex: 0,
        height: 60,
        width: 250,
        borderColor: '#fed9b7',
        borderWidth: 3,
        paddingHorizontal: 4,
        textAlign: 'center',
      },
    
    addButton: {
        backgroundColor: '#fed9b7',
        padding: 6 * scale, // Adjusted responsive padding for smaller buttons
        borderRadius: 6 * scale, // Adjusted responsive borderRadius for smaller buttons
        marginTop: -2 * scale, // Adjusted responsive margin for smaller buttons
      },
      addbuttonText: {
        color: '#f07167',
        fontSize: 10 * scale, // Adjusted responsive fontSize for smaller buttons
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
    ingredientsContainer: {
        marginTop: 16,
    },
    ingredientBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        padding: 8,
        borderColor: '#0081a7',
        borderWidth: 3,
        borderRadius: 5,
    },
    ingredientText: {
        flex: 1,
        marginRight: 8,
    },
    removeButton: {
        color: 'red',
        fontSize: 18,
    },
    inputInstructions: {
        flex: 0,
        height: 40,
        borderColor: '#fed9b7',
        borderWidth: 3,
        paddingHorizontal: 4,
    },
    logo: {
        width: 400, // Adjust the width and height to fit your image size
        height: 250,
        aspectRatio: 1.3, 
        resizeMode: 'contain',
      },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15
  },
  radio: {
    backgroundColor: '#fed9b7',
    padding: 7,
    marginHorizontal: 5,
    borderRadius: 6,
    width:65,
    
  },
  selectedRadio: {
    backgroundColor: '#f07167',
  },
});

export default AddRecipe;
