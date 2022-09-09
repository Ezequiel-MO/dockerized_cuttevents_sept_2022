const express = require('express');
const {
  getProjects,
  addProject,
  getProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectControllers');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.use(protect);

router.route('/').get(getProjects).post(addProject);
router
  .route('/:id')
  .get(getProject)
  .patch(updateProject)
  .delete(restrictTo('admin'), deleteProject);

module.exports = router;
