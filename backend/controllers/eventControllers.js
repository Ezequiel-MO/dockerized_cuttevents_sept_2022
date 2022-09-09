const Event = require('../models/eventModel');
const factory = require('./handlerFactory');

exports.getEvents = factory.getAll(Event);
exports.getEvent = factory.getOne(Event);
exports.addEvent = factory.createOne(Event);
exports.updateEvent = factory.updateOne(Event);
exports.deleteEvent = factory.deleteOne(Event);
