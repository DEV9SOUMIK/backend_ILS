//Import mongoose
const mongoose = require('mongoose');

// Define a schema for an item
const projectsSchema = new mongoose.Schema({
  
  titel: { type: String, required: true },
  projectNo: {type:String, required:true, unique: true},
  capital: { type: Number, required: true,},
  fundBy: { type: String, required: true },
  startDt: {type: String, required: true},
  endDt: {type:String}
  
});

// Create a model from the schema and export it
module.exports = mongoose.model('Project', projectsSchema);