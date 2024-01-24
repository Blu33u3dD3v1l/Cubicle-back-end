const mongoose = require('mongoose');

const cubeScheme = new mongoose.Schema({
         name: String,
         description: String,
         imageUrl: String,
         difficultyLevel: Number,
         accessories: [{
            type: mongoose.Types.ObjectId,
            ref: 'Accessory',
         }]
});

const Cube = mongoose.model('Cube', cubeScheme);

module.exports = Cube;