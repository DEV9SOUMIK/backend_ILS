const mongoose = require('mongoose');

const ManpowerSchema = new mongoose.Schema({
  expenditureMonth: String,
  amountPaid: Number,
});

module.exports = mongoose.model('Manpower', ManpowerSchema);
