const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'An Event must have a name'],
      minlength: [5, 'An event name must have more than 4 characters'],
      unique: true,
      trim: true,
    },
    city: String,
    textContent: [String],
    imageContentUrl: [String],
    price: {
      type: Number,
      required: [true, 'An Event must have aprice'],
      min: [0, 'A price must be 0 or positive'],
    },
    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    introduction: [String],
    transfer: [{ type: mongoose.Schema.ObjectId, ref: 'Transfers' }],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.index({ city: 1 });

eventSchema.pre(/^find/, async function (next) {
  this.populate({
    path: 'transfer',
    select: '-__v',
  });
  next();
});

eventSchema.methods.setImgUrl = function (files) {
  const arrImgUrl = [];
  files.forEach((el) => arrImgUrl.push(el.location));
  this.imageContentUrl = arrImgUrl;
};

const Event = mongoose.model('Events', eventSchema);

module.exports = Event;
