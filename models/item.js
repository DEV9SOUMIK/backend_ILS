// Import mongoose
const mongoose = require('mongoose');

// Define a schema for an item
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
});

// Create a model from the schema and export it
module.exports = mongoose.model('Item', itemSchema);
