const mongoose = require('mongoose');

const consumablesSchema = new mongoose.Schema({
  expenditureMonth: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unitCost: {
    type: Number,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  remarks: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Consumables', consumablesSchema);