import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, PixelRatio, Alert, ActivityIndicator, ScrollView, Modal, } from 'react-native';
require('dotenv').config();

const scale = PixelRatio.get();

const Dessert = ({ navigation }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [pantryIngredients, setPantryIngredients] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [missingIngredients, setMissingIngredients] = useState([]);

  const toggleModal = (item) => {
    setModalVisible(!isModalVisible);
    setSelectedItem(item);
  
    // Check if Ingredients are defined
    if (item.Ingredients) {
      // Calculate missing ingredients if necessary
      const missing = item.Ingredients.filter(
        (recipeIngredient) =>
          !pantryIngredients.some(
            (pantryIngredient) => pantryIngredient.Name === recipeIngredient
          )
      );
  
      // Store the missing ingredients in a state variable
      setMissingIngredients(missing);
    } else {
      // If Ingredients are undefined, set missingIngredients as an empty array
      setMissingIngredients([]);
    }
  };

  const meetsCondition = (box) => {
    return box.someCondition;
  };

  const handleNavigation = () => {
    // Navigate to the "AnotherPage" screen
    navigation.navigate('MainMenu');
  };

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:3000/ingredients`)
      .then((response) => response.json())
      .then((data) => setPantryIngredients(data))
      .catch((error) => console.error('Error fetching pantry ingredients:', error));

    fetchData('Dessert'); 
  }, []);

  const fetchData = (mealType) => {
   /*fetch('http://10.129.36.217:3000/recipes')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });*/
      fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:3000/recipes?mealType=${mealType}`)
      .then(response => response.json())
      .then(data => {
        const filteredData = [];
        
        for (const recipe of data) {
          // Check if the recipe has the correct meal type
          if (recipe.MealType === mealType) {
            // Check if all recipe ingredients are in the pantry
            const hasAllIngredients = recipe.Ingredients.every(recipeIngredient =>
              pantryIngredients.some(pantryIngredient => pantryIngredient.Name === recipeIngredient)
            );
            // Add a property to the recipe indicating completeness
            const recipeWithCompleteness = { ...recipe, isComplete: hasAllIngredients };
            filteredData.push(recipeWithCompleteness);
          }
        }
  
        // Sort recipes based on the isComplete property
        const sortedData = filteredData.sort((a, b) => (a.isComplete === b.isComplete ? 0 : a.isComplete ? -1 : 1));
  
        setData(sortedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  };
  
  /*useEffect(() => {
    if (pantryIngredients.length > 0) {
      fetchData('Entree');
    }
  }, [pantryIngredients]);*/

  useEffect(() => {
        fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:3000/ingredients`)
          .then(response => response.json())
          .then(data => setPantryIngredients(data))
          .catch(error => console.error('Error fetching pantry ingredients:', error));
      
        // Call fetchData with the specific meal type (e.g., 'Entree')
        fetchData('Dessert');
      }, []); // Make sure to add any necessary dependencies
      
      // Call fetchData only if pantryIngredients is available
      useEffect(() => {
        if (pantryIngredients.length > 0) {
          fetchData('Dessert'); // You can replace 'Entree' with any other meal type
        }
      }, [pantryIngredients]);
      
      
    
      const completeRecipes = data.filter((item) => meetsCondition(item));
      const incompleteRecipes = data.filter((item) => !meetsCondition(item));


  

  const renderRecipeItem = (recipe) => {
    // Compare ingredients of the recipe with pantry ingredients
    const hasAllIngredients = recipe.Ingredients.every((recipeIngredient) =>
      pantryIngredients.some(
        (pantryIngredient) => pantryIngredient.Name === recipeIngredient
      )
    );

    // Apply conditional styling based on ingredient comparison
    const itemStyle = hasAllIngredients
      ? styles.itemContainer
      : [styles.itemContainer, { backgroundColor: '#ccc' }];

    return (
      <TouchableOpacity key={recipe._id} onPress={() => toggleModal(recipe)}>
        <View style={itemStyle}>
          <Text style={styles.itemText}>{recipe.Name}</Text>
          {/* Add any other content if needed */}
        </View>
      </TouchableOpacity>
    );
  }

  const makeRecipe = async (ingredientsToRemove) => {
    for (const element of ingredientsToRemove) {
      if (element) {
        console.log(element);
        try {
          const response = await fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:3000/deleteOneIngredient/${element}`, {
            method: 'DELETE',
          });
  
          const data = await response.json();
          console.log(data); // handle the response
          
        } catch (error) {
          console.error('Error deleting ingredient:', error);
        }
      }
    }
    Alert.alert('Success', 'Ingredients have been removed from your pantry!');
    handleNavigation();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Dessert Recipes</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#F07167" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.gridContainer}>
          {completeRecipes.map(renderRecipeItem)}
            <View style={styles.horizontalLine} />
            {incompleteRecipes.map(renderRecipeItem)}
        </View>
      </ScrollView>
      )}
      {selectedItem && (
  <Modal
    animationType="fade"
    transparent={true}
    visible={isModalVisible}
    onRequestClose={toggleModal}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.headers}>Name</Text><Text style={styles.data}>{selectedItem.Name}</Text>
        <Text style={styles.headers}>{'\n'}Instructions</Text><Text style={styles.data}>{selectedItem.Instructions}</Text>
        <Text style={styles.headers}>{'\n'}Ingredients</Text><Text style={styles.data}>{selectedItem.Ingredients}</Text>

        {/* Display missing ingredients if they exist */}
        {missingIngredients.length > 0 && (
          <View>
            <Text style={styles.data}>Missing Ingredients:</Text>
            {missingIngredients.map((ingredient, index) => (
              <Text key={index} style={styles.data}>
                {ingredient}
              </Text>
              
            ))}
            <Text style={styles.headers}>Cannot Make this Recipe</Text>
          </View>
        )}

        {/* Conditionally render the "Make Recipe" button */}
        {missingIngredients.length <= 0 ? (
        <TouchableOpacity style={styles.button} onPress={() => makeRecipe(selectedItem.Ingredients)}>
          <Text style={styles.makeRecipeButtonText}>Make this Recipe!</Text>
        </TouchableOpacity>
        ) : null}

        <TouchableOpacity onPress={toggleModal}>
          <Text style={styles.cancelButton}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
)}


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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF5733',
    marginBottom: 20,
    marginTop: 30,
  },
  headers: {
    textAlign: 'center',
    fontSize: 24, // Change the font size for the first text
    color: '#FF5733',
  },
  scrollView: {
    height: '80%', // Adjust the height as needed
  },
  scrollViewContainer: {
    alignItems: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '95%',
    paddingHorizontal: 10,
  },
  itemContainer: {
    width: 120 * scale,
    height: 20 * scale,
    backgroundColor: '#fed9b7',
    borderRadius: 12,
    padding: 8,
    marginVertical: 10,
    marginLeft: -20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    color: '#f07167',
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  countButton: {
    color: '#00afb9',
    fontSize: 24,
    marginHorizontal: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fdfcdc',
    padding: 50,
    borderRadius: 10,
    elevation: 5,
  },
  button: {
    backgroundColor:'#0081a7',
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
  },
  makeRecipeButtonText: {
    color: '#fdfcdc',
    textAlign: 'center',
    fontWeight: 'bold',
    padding:12,
  },
  button: {
    backgroundColor: '#0081a7',
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: '#f07167',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#7fe2ff',
    borderRadius: 12,
    marginTop: 10,
    color: '#fdfcdc',
    textAlign: 'center',
    fontWeight: 'bold',
    padding:12,
  },
  data: {
    textAlign: 'center',
    fontSize: 18, // Change the font size for the first text
    color: '#0081a7',
  },
  headers: {
    textAlign: 'center',
    fontSize: 24, // Change the font size for the first text
    color: '#FF5733',
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '100%', 
    marginVertical: 10,
  },
});

export default Dessert;
