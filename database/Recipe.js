const mongoose = require('mongoose');

const RecipesSchema = new mongoose.Schema({
  Name: String,
  Ingredients: Array,
  Instructions: String,
  MealType: String
});

mongoose.model("recipe", RecipesSchema, "Recipes");

