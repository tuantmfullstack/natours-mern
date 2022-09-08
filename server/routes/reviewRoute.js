import express from 'express';
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReview,
  updateReview,
} from '../controllers/reviewController.js';

const router = express.Router({ mergeParams: true });

router.route('/').get(getAllReviews).post(createReview);
router.route('/:id').get(getReview).patch(updateReview).delete(deleteReview);

// GET/POST /tours/a79sd45/reviews/ahsdjf45454

export default router;
