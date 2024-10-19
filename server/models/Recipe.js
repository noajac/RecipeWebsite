const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Recipe schema
const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  tags: [String],  // Array of strings for tags
  imageFile: {
    type: String,  // Store the image file name or path
  },
  videoLink: {
    type: String,  // Optional video link
  },
  publicationDate: {
    type: Date,
    default: Date.now,  // Default to the current date
  },
  userName: {
    type: String,  // Username of the person who uploaded the recipe
  }
}, 
{ 
  timestamps: true,  // Automatically add `createdAt` and `updatedAt`
  collection: 'recipes'  // Explicitly set the collection name
});

// Create and export the Recipe model
module.exports = mongoose.model('Recipe', recipeSchema);
