const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Hotels must have a name'],
      minlength: [5, 'A Hotel name must have more than 4 characters'],
      unique: true,
      trim: true,
    },
    city: String,
    address: String,
    numberStars: {
      type: Number,
      min: [1, 'Rating must be 1 or above 1'],
      max: [5, 'Rating must be 5 or lower'],
    },
    numberRooms: Number,
    checkin_out: String,
    meetingRooms: String,
    wheelChairAccesible: Boolean,
    wifiSpeed: String,
    swimmingPool: String,
    restaurants: String,
    textContent: [String],
    imageContentUrl: [String],
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
    price: [
      {
        DUInr: Number,
        DUIprice: Number,
        DoubleRoomNr: Number,
        DoubleRoomPrice: Number,
        breakfast: Number,
        DailyTax: Number,
      },
    ],
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

hotelSchema.methods.setImgUrl = function (files) {
  const arrImgUrl = [];
  files.forEach((el) => arrImgUrl.push(el.location));
  this.imageContentUrl = arrImgUrl;
};

hotelSchema.index({ city: 1, numberStars: -1 });

const Hotel = mongoose.model('Hotels', hotelSchema);

module.exports = Hotel;
