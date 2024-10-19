const express = require('express');
const multer = require('multer');
const { getAllRecipes, getRecipeByID } = require('../controllers/RecipeController');
const Recipe = require('../models/Recipe'); // Import the Recipe model

const router = express.Router();

// Configure multer storage for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/uploads'); // Ensure this path is correct based on your project structure
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_')); // Unique filename, replacing spaces with underscores
  }
});

const upload = multer({ storage: storage });

// GET routes (Read-only)
router.get('/', getAllRecipes);
router.get('/:id', getRecipeByID);

// POST route to upload a new recipe with an image
router.post('/upload-recipe', upload.single('imageFile'), async (req, res) => {
  const { title, level, type, ingredients, instructions, tags, videoLink, userName } = req.body;
  const imageFile = req.file ? req.file.filename : null; // Get filename if file exists

  // Create a new recipe object with all fields, including image file name
  const newRecipe = new Recipe({
    title,
    level,
    type,
    ingredients: ingredients.split(',').map(item => item.trim()), // Convert ingredients to array
    instructions,
    tags: tags.split(',').map(item => item.trim()), // Convert tags to array
    imageFile, // Save filename of uploaded image
    videoLink,
    userName
  });

  try {
    const savedRecipe = await newRecipe.save(); // Save recipe to the database
    res.status(201).json(savedRecipe); // Respond with saved recipe
  } catch (error) {
    res.status(400).json({ error: error.message }); // Error handling
  }
});

module.exports = router; // Export the router
