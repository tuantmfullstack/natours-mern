import express from 'express';
import { protect, restrictTo } from '../controllers/authController.js';
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReview,
  updateReview,
} from '../controllers/reviewController.js';
import {
  createTour,
  deleteTour,
  getAllTours,
  getTour,
  updateTour,
} from '../controllers/tourController.js';

const router = express.Router();

router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin'), createTour);

router.use(protect);

router
  .route('/:id')
  .patch(restrictTo('admin', 'lead-guide'), updateTour)
  .delete(restrictTo('admin'), deleteTour);

router.route('/:slug').get(getTour);

router
  .route('/:tourId/reviews')
  .get(getAllReviews)
  .post(restrictTo('user'), createReview);
router
  .route('/:tourId/reviews/:id')
  .get(getReview)
  .patch(updateReview)
  .delete(deleteReview);

export default router;
