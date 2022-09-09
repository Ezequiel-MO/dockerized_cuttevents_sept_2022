const Project = require('../models/projectsModel');
const factory = require('./handlerFactory');

exports.getProjects = factory.getAll(Project);
exports.getProject = factory.getOne(Project);
exports.addProject = factory.createOne(Project);
exports.updateProject = factory.updateOne(Project);
exports.deleteProject = factory.deleteOne(Project);
