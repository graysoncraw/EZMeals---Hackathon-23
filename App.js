import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import Home from './screens/Home'; 
import MainMenu from './screens/MainMenu';  
import MakeMeal from './screens/MakeMeal';  
import AddIngredients from './screens/AddIngredients';  
import AddRecipe from './screens/AddRecipe';  
import Pantry from './screens/Pantry';  
import Snack from './screens/Snack';  
import Entree from './screens/Entree';  
import Side from './screens/Side';  
import Dessert from './screens/Dessert';  

// Stack navigator
const Stack = createStackNavigator();

// Main App component
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MainMenu" component={MainMenu} />
        <Stack.Screen name="MakeMeal" component={MakeMeal} />
        <Stack.Screen name="AddIngredients" component={AddIngredients} />
        <Stack.Screen name="AddRecipe" component={AddRecipe} />
        <Stack.Screen name="Pantry" component={Pantry} />
        <Stack.Screen name="Snack" component={Snack} />
        <Stack.Screen name="Entree" component={Entree} />
        <Stack.Screen name="Side" component={Side} />
        <Stack.Screen name="Dessert" component={Dessert} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default App;
