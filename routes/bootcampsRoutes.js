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

import { protect } from '../middleware/authMiddleware.js';

// Include other resource routers
import courseRouter from './courseRoutes.js';

const router = express.Router();

// Re-route into other resource routers
router
  .use('/:bootcampId/courses', courseRouter);

router
  .route('/:id/image')
  .put(protect, bootcampImageUpload);

router
  .route('/radius/:zipcode/:distance')
  .get(getBootcampsInRadius);

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);

export default router;