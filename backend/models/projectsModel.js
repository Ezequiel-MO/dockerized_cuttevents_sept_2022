const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Projects must include a code'],
    unique: true,
    trim: true,
    maxlength: [
      15,
      'A Project Name must have less or equal than 15 characters',
    ],
    minlength: [10, 'A Project Name must have at least 10 characters'],
  },
  accountManager: String,
  groupName: String,
  groupLocation: String,
  arrivalDay: {
    type: String,
    validate: {
      validator: function (val) {
        const arrivalDate = new Date(val);
        return arrivalDate > Date.now();
      },
      message: 'Start date needs to be in the future',
    },
  },
  departureDay: {
    type: String,
    validate: {
      validator: function (val) {
        const departureDate = new Date(val);
        return departureDate >= new Date(this.arrivalDay);
      },
      message: 'Departure date needs to be after Arrival Day or the same day',
    },
  },
  nrPax: {
    type: Number,
    min: [0, 'Number of pax cannot be negative'],
  },
  clientCo: {
    type: String,
    trim: true,
  },
  clientAccManager: String,
  hotels: [{ type: mongoose.Schema.ObjectId, ref: 'Hotels' }],
  schedule: [
    {
      date: String,
      morningEvents: [{ type: mongoose.Schema.ObjectId, ref: 'Events' }],
      afternoonEvents: [{ type: mongoose.Schema.ObjectId, ref: 'Events' }],
      lunch: [{ type: mongoose.Schema.ObjectId, ref: 'Restaurants' }],
      dinner: [{ type: mongoose.Schema.ObjectId, ref: 'Restaurants' }],
      transfer_in: [{ type: mongoose.Schema.ObjectId, ref: 'Transfers' }],
      transfer_out: [{ type: mongoose.Schema.ObjectId, ref: 'Transfers' }],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

projectSchema.index({ code: 1 });

projectSchema.pre(/^find/, async function (next) {
  this.populate({
    path: 'hotels',
    select: '-__v -createdAt',
  });
  next();
});

projectSchema.pre(/^find/, async function (next) {
  this.populate({
    path: 'schedule.morningEvents schedule.afternoonEvents schedule.lunch schedule.dinner schedule.transfer_in schedule.transfer_out',
    options: { _recursed: true },
    select: '-__v -createdAt',
  });
  next();
});

const Project = mongoose.model('Projects', projectSchema);

module.exports = Project;
