const mongoose = require('mongoose');
const connection = require('../config/mongodb');

const pizzaSchema = connection.Schema({
    name: {
        type: String
    },
    size: {
        type: String,
    },
    price: {
        type: Number
    },
    img_path: {
        type: String
    }
});
const collecion = mongoose.model('pizza_detail', pizzaSchema);

module.exports = collecion;