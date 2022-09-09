const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Restaurant must have a name'],
    minlength: [3, 'A Restaurant Name must have at least 3 characters'],
    unique: true,
    trim: true,
  },
  city: String,
  textContent: [String],
  imageContentUrl: [String],
  price: Number,
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
});

restaurantSchema.index({ city: 1 });
restaurantSchema.index({ location: '2dsphere' });

restaurantSchema.pre(/^find/, async function (next) {
  this.populate({
    path: 'transfer',
    select: '-__v',
  });
  next();
});

restaurantSchema.methods.setImgUrl = function (files) {
  const arrImgUrl = [];
  files.forEach((el) => arrImgUrl.push(el.location));
  this.imageContentUrl = arrImgUrl;
};

const Restaurant = mongoose.model('Restaurants', restaurantSchema);

module.exports = Restaurant;
