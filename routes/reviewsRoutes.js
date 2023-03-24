import express from 'express';
import {
  getReviews,
  getReview
} from '../controllers/reviewsController.js';

import Review from '../models/Review.js';

import advancedResults from '../middleware/advancedResults.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(advancedResults(Review, {
    path: 'bootcamp',
    select: 'name description'
  }), getReviews);
// .post(protect, authorize('publisher', 'admin'), addReview);

router
  .route('/:id').get(getReview);

export default router;