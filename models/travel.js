
const mongoose = require('mongoose');

const TravelSchema = new mongoose.Schema({
  expenditureMonth: String,
  personName: String,
  travelDate: Date,
  travelPurpose: String,
  invoiceNumber: String,
  invoiceAmount: Number,
  paymentStatus: String,
  paymentAmount: Number,
});

module.exports = mongoose.model('Travel', TravelSchema);