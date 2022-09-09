const Hotel = require('../models/hotelModel');
const factory = require('./handlerFactory');

exports.getHotels = factory.getAll(Hotel);
exports.getHotel = factory.getOne(Hotel);
exports.addHotel = factory.createOne(Hotel);
exports.updateHotel = factory.updateOne(Hotel);
exports.deleteHotel = factory.deleteOne(Hotel);
