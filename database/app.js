require('dotenv').config();

const express = require('express');

const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('./db');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


require("./Recipe");
require("./Pantry");

const Recipes = mongoose.model("recipe")
const Pantry = mongoose.model("pantry")

// Connect to MongoDB Atlas
mongoose.connect(`${process.env.REACT_APP_MONGODBURI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected",()=>{
    console.log("mongoose connected")
})

mongoose.connection.on("error",(err)=>{
    console.log("error", err)
})

// let db;
// connectToDb((err) => {
//   if (!err) {
//       app.listen(3001, () => {
//           console.log(`Server in mode, Listening on port: 3000`);
//       });
//       db = getDb();
//   }
// })

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

// Example route
app.post('/', async (req, res) => {
  // Query MongoDB and send data as a response
  // res.send("welcome to node")
  let user = new Pantry(req.body);
  let result = await user.save();
  res.send(result);
});

app.get('/recipes', async (req, res) => {
    try {
        // Query MongoDB and send data as a JSON response
        const data = await Recipes.find();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
//    await Recipes.find()
//         .then(p => console.log(p))
//         .catch(error => console.log(error));
    });

app.get('/ingredients', async (req, res) => {
  try {
      // Query MongoDB and send data as a JSON response
      const data = await Pantry.find();
      res.json(data);
  } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
//    await Recipes.find()
//         .then(p => console.log(p))
//         .catch(error => console.log(error));
  });

  app.delete('/deleteOneIngredient/:Name', async (req, res) => {
    const ingredientName = req.params.Name;
  
    try {
      const currentIngredient = await Pantry.findOne({ Name: ingredientName });
  
      // Declare updatedIngredient outside the if block
      let updatedIngredient;
  
      // Check if the Amount is greater than 0
      if (currentIngredient.Amount > 1) {
        // If so, decrement the Amount by 1
        updatedIngredient = await Pantry.findOneAndUpdate(
          { Name: ingredientName },
          { $inc: { Amount: -1 } },
          { new: true }
        );
  
        res.json(updatedIngredient);
      } else {
        // If Amount is 0 or less, delete the entire ingredient
        updatedIngredient = await Pantry.findOneAndDelete({ Name: ingredientName });
        res.json({ message: 'Ingredient deleted successfully' });
      }
  
      // Note: This check is moved outside of the if block
      if (!updatedIngredient) {
        return res.status(404).json({ error: 'Ingredient not found' });
      }
  
      // This line is not needed since res.json() is called inside the if blocks
      // res.json(updatedIngredient);
    } catch (error) {
      console.error('Error updating/deleting ingredient in MongoDB:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.post('/updateCount', async (req, res) => {
  const { id, change } = req.body;
  console.log(id);
  console.log(change);

  try {
    const updatedIngredient = await Pantry.findByIdAndUpdate(
      id,
      { $inc: { Amount: change } },
      { new: true }
    );
  
    res.send(updatedIngredient);
  } catch (err) {
    console.error('Error updating count:', err);
    res.status(500).send('Error updating count');
  }
});

app.post('/postPantry', async (req, res) => {
  const newIngredient = new Pantry({
    'Name': req.body.name,
    'Amount': req.body.amount, 
    'Calories': req.body.calories, 
    'Fat Total': req.body.totalFat,  
    'Cholesterol': req.body.cholesterol, 
    'Sodium': req.body.sodium, 
    'Total Carbohydrates': req.body.totalCarbohydrate, 
    'Protein': req.body.protein
  })

    // Save the new ingredient to the database
    await newIngredient.save();

    // Send a success response back to the client
    res.status(201).json({ message: 'Ingredient added successfully' });

});

app.post('/postRecipe', async (req, res) => {
  const newRecipe = new Recipes({
    'Name': req.body.mealName,
    'Ingredients': req.body.ingredients, 
    'Instructions': req.body.instructions, 
    'MealType': req.body.selectedMealType
  })

    // Save the new ingredient to the database
    await newRecipe.save();

    // Send a success response back to the client
    res.status(201).json({ message: 'Recipe added successfully' });

});

// Express route for deleting an ingredient by ID
app.delete('/deleteIngredient/:id', async (req, res) => {
  const ingredientId = req.params.id;
  console.log(ingredientId);


  try {
    // Use MongoDB driver or an ORM to delete the ingredient by ID

    const result = await Pantry.findByIdAndDelete(ingredientId);

    if (result) {
      res.status(200).json({ success: true, message: 'Ingredient deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Ingredient not found' });
    }
  } catch (error) {
    console.error('Error deleting ingredient:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`)
});
