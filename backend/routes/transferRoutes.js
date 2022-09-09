const express = require('express');
const {
  getTransfers,
  addTransfer,
  getTransfer,
  updateTransfer,
  deleteTransfer,
} = require('../controllers/transferControllers');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.use(protect);

router.route('/').get(getTransfers).post(addTransfer);

router
  .route('/:id')
  .get(getTransfer)
  .patch(updateTransfer)
  .delete(restrictTo('admin'), deleteTransfer);

module.exports = router;
