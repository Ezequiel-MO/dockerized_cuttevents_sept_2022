const express = require('express');
const uploadS3 = require('../libs/s3Storage');

const {
  getHotels,
  addHotel,
  getHotel,
  updateHotel,
  deleteHotel,
} = require('../controllers/hotelControllers');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(getHotels)
  .post(uploadS3.array('imageContentUrl', 12), addHotel);
router
  .route('/:id')
  .get(getHotel)
  .patch(updateHotel)
  .delete(restrictTo('admin'), deleteHotel);

module.exports = router;
