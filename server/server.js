require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs'); // To check if 'uploads' directory exists
const Recipe = require('./models/Recipe'); // Assuming you have a Recipe model
const userRoutes = require('./routes/user'); // Import user routes
const recipesRoutes = require('./routes/recipes'); // Import recipes routes
const imageRoutes = require('./routes/imageRoutes'); // Import the image routes

// Constants
const PORT = process.env.PORT || 8082; // Fallback to port 8082 if not set

// Create Express server
const app = express();

// Middleware to handle JSON requests
app.use(express.json());

// Enable CORS for specific origin
app.use(cors({
  origin: process.env.CLIENT_URL, // Allow requests only from this origin
  credentials: true,              // Allow credentials if needed
}));

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static('server/uploads')); // Allows images to be accessed at /uploads

// Use image routes
app.use('/memos/image', imageRoutes);

// Logging middleware to track incoming requests
app.use((req, res, next) => {
  console.log(req.path, req.method); // Log the request method and path
  next();
});

// Ensure 'uploads' directory exists
if (!fs.existsSync('server/uploads')) {
  fs.mkdirSync('server/uploads', { recursive: true });
}

// MongoDB connection without deprecated options
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // Added options to avoid deprecation warnings
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Set up multer for file handling (uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/uploads'); // Save files in 'server/uploads' to match the static path
  },
  filename: (req, file, cb) => {
    const sanitizedFilename = Date.now() + '-' + file.originalname.replace(/\s+/g, '_'); // Replace spaces with underscores
    cb(null, sanitizedFilename); // Save sanitized filename
  }
});

const upload = multer({ storage: storage });

// Route to handle recipe upload
app.post('/upload-recipe', upload.single('imageFile'), async (req, res) => {
  console.log('Request received'); // Log when request reaches the server
  console.log(req.body); // Log the form data
  console.log(req.file); // Log the uploaded file details

  try {
    const { title, level, type, ingredients, instructions, tags, videoLink, publicationDate, userName } = req.body;

    // Create a new recipe with the data received
    const recipe = new Recipe({
      title,
      level,
      type,
      ingredients: ingredients.split(','), // Split comma-separated string into an array
      instructions,
      tags: tags.split(','), // Split comma-separated string into an array
      imageFile: req.file ? req.file.filename : null, // Save file name if uploaded
      videoLink,
      publicationDate,
      userName
    });

    // Save the recipe to the database
    await recipe.save();
    res.status(201).json({ message: 'Recipe uploaded successfully!' });
  } catch (error) {
    console.error('Error saving recipe:', error);
    res.status(500).json({ error: 'Failed to upload recipe' });
  }
});

// User routes
app.use('/api/user', userRoutes);

// Recipes routes
app.use('/api/recipes', recipesRoutes); // Recipes routes will be under /api/recipes

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
