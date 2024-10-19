const Recipe = require('../models/Recipe');

// get all recipes
const getAllRecipes = async (req, res) => {
  console.log('Received request for all recipes'); // Log statement to indicate a request for all recipes
   const searchQuery = req.query.search_query;
   try {
    if (searchQuery){
      const recipes = await Recipe.find({ 
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } },       // case-insensitive search in title
          { ingredients: { $regex: searchQuery, $options: 'i' } } , // Search in ingredients
          { level: { $regex: searchQuery, $options: 'i' } } , // Search in level
          { type: { $regex: searchQuery, $options: 'i' } } , // Search in type
          // { instructions: { $regex: searchQuery, $options: 'i' } } , // Search in instructions
          // { tags: { $regex: searchQuery, $options: 'i' } } , // Search in tags
          { userName: { $regex: searchQuery, $options: 'i' } } , // Search in userName
        ]
      });

      res.status(200).json(recipes);
      console.log(recipes)
      return;
    }
     const recipes = await Recipe.find(); // Fetch all recipes from the database
     res.status(200).json(recipes); // Respond with the recipes and a 200 OK status
   } catch (error) {
     console.error('Error fetching recipes:', error); // Log any errors encountered during the fetch
     res.status(500).json({ message: 'Failed to fetch recipes', error }); // Respond with a 500 Internal Server Error status and error details
   }
 };

// Get recipes by name (search query)
const getRecipeByID = async (req, res) => {
  console.log(`Received request for recipe with ID: ${req.params.id}`); // Log statement indicating a request for a specific recipe by ID
  try {
    const recipe = await Recipe.findById(req.params.id); // Fetch the recipe by ID from the database
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' }); // Respond with a 404 Not Found status if no recipe is found
    }
    res.status(200).json(recipe); // Respond with the found recipe and a 200 OK status
  } catch (error) {
    console.error('Error fetching recipe:', error); // Log any errors encountered during the fetch
    res.status(500).json({ message: 'Failed to fetch recipe', error }); // Respond with a 500 Internal Server Error status and error details
  }
};


module.exports = {
  getAllRecipes,
  getRecipeByID,
}