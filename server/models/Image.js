const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    image: {
        type: Buffer,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    creatorId: {
        type: String
    }
});

module.exports = mongoose.model('Image', ImageSchema);
