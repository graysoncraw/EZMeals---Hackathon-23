const mongoose = require('mongoose');

const PantrySchema = new mongoose.Schema({
  Name: String,
  Amount: Number,
  Calories: Number,
  'Fat Total': Number,
  Cholesterol: Number,
  Sodium: Number,
  'Total Carbohydrates': Number,
  Protein: Number
});

mongoose.model("pantry", PantrySchema, "Pantry");

