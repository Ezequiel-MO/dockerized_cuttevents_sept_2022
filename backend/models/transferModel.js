const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
  city: String,
  company: {
    type: String,
    trim: true,
  },
  transfer_in_out: Number,
  dispo_4h: Number,
  hextra: Number,
  hextra_night: Number,
  dispo_5h_out: Number,
  dispo_4h_airport: Number,
  dispo_4h_night: Number,
  transfer_in_out_night: Number,
  dispo_6h_night: Number,
  vehicleType: String,
  vehicleCapacity: Number,
});

transferSchema.index({ city: 1 });

const Transfer = mongoose.model('Transfers', transferSchema);

module.exports = Transfer;
