//Import mongoose
const mongoose = require('mongoose');

// Define a schema for an item
const userSchema = new mongoose.Schema({
  projectId: {type:mongoose.Schema.Types.ObjectId, ref:'Project'},
  name: { type: String, required: true },
  email: {type:String, required:true, unique: true},
  employeeId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  designation: {
    type: String,
    enum: ['Scientist', 'PI', 'Admin', 'Super Admin'],
    required: true
  }
  
});

// Create a model from the schema and export it
module.exports = mongoose.model('User', userSchema);