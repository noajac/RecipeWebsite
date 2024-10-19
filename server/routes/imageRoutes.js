const express = require('express');
const multer = require('multer');
const Image = require('../models/Image'); // Import the Image model

const router = express.Router();

// Configure multer to store images in memory
const upload = multer({ storage: multer.memoryStorage() });

// Route to upload an image
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ error: 'No image provided' });
        }

        const image = new Image({
            image: req.file.buffer,
            contentType: req.file.mimetype,
            creatorId: req.user ? req.user._id : null
        });

        await image.save();
        res.send({ id: image._id });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Route to serve an image
router.get('/share/:imageId', async (req, res) => {
    try {
        const image = await Image.findById(req.params.imageId);

        if (!image || !image.image) {
            throw new Error('Image not found');
        }

        res.set('Content-Type', image.contentType);
        res.send(image.image);
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
});

module.exports = router;
