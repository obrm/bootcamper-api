import express from 'express';
import {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampImageUpload
} from '../controllers/bootcampsController.js';

import Bootcamp from '../models/Bootcamp.js';

import advancedResults from '../middleware/advancedResults.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

// Include other resource routers
import coursesRouter from './courseRoutes.js';
import reviewsRouter from './reviewsRoutes.js';

const router = express.Router();

// Re-route into other resource routers
router
  .use('/:bootcampId/courses', coursesRouter);

router
  .use('/:bootcampId/reviews', reviewsRouter);

router
  .route('/:id/image')
  .put(protect, authorize('publisher', 'admin'), bootcampImageUpload);

router
  .route('/radius/:zipcode/:distance')
  .get(getBootcampsInRadius);

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

export default router;