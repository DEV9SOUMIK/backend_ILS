
const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
  expenditureMonth: String,
  indent: String,
  indentAmount: Number,
  indentDate: Date,
  poNumber: String,
  poDate: Date,
  poAmount: Number,
  invoiceAmount: Number,
  invoiceNumber: String,
  paymentStatus: String,
  remarks: String,
  paymentAmount: Number,
  monthwiseExpenditure: String,
});

module.exports = mongoose.model('Equipment', EquipmentSchema);