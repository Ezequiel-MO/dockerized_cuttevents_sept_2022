const express = require('express');
const {
  getRestaurants,
  addRestaurant,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantsWithin,
  getDistances,
} = require('../controllers/restaurantControllers');
const { protect, restrictTo } = require('../controllers/authController');
const uploadS3 = require('../libs/s3Storage');

const router = express.Router();

router.use(protect);

router
  .route('/restaurants-within/:distance/center/:latlng/unit/:unit')
  .get(getRestaurantsWithin);

router.route('/distances/:latlng/unit/:unit').get(getDistances);

router
  .route('/')
  .get(getRestaurants)
  .post(uploadS3.array('imageContentUrl', 12), addRestaurant);

router
  .route('/:id')
  .get(getRestaurant)
  .patch(updateRestaurant)
  .delete(restrictTo('admin'), deleteRestaurant);

module.exports = router;
