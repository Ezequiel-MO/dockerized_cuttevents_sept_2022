const Transfer = require('../models/transferModel');
const factory = require('./handlerFactory');

exports.getTransfers = factory.getAll(Transfer);
exports.getTransfer = factory.getOne(Transfer);
exports.addTransfer = factory.createOne(Transfer);
exports.updateTransfer = factory.updateOne(Transfer);
exports.deleteTransfer = factory.deleteOne(Transfer);
