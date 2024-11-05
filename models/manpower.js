// Import mongoose
const mongoose = require('mongoose');

// Define a schema for an manpower
const manpowerSchema = new mongoose.Schema({
  april: { type: Number},
  may: { type: Number},
  june: { type: Number},
  july: { type: Number},
  august: { type: Number},
  september: { type: Number},
  october: { type: Number},
  november: { type: Number},
  december: { type: Number},
  january: { type: Number},
  february: { type: Number},
  march: { type: Number},

  
});

// Create a model from the schema and export it
module.exports = mongoose.model('Manpower', manpowerSchema);