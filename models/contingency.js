const mongoose = require('mongoose');

const contingencySchema = new mongoose.Schema({
  expenditureMonth: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  remarks: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Contingency', contingencySchema);