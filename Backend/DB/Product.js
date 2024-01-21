const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image:"String",
    name: String,
    content: String, 
    timestampField: { type: Date, default: Date.now } 
});

module.exports = mongoose.model('products', productSchema);
