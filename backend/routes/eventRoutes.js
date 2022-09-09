const express = require('express');
const uploadS3 = require('../libs/s3Storage');

const {
  getEvents,
  addEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventControllers');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(getEvents)
  .post(uploadS3.array('imageContentUrl', 12), addEvent);
router
  .route('/:id')
  .get(getEvent)
  .patch(updateEvent)
  .delete(restrictTo('admin'), deleteEvent);

module.exports = router;
