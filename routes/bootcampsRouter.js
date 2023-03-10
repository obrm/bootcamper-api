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

// Include other resource routers
import courseRouter from './courseRouter.js';

const router = express.Router();

// Re-route into other resource routers
router
  .use('/:bootcampId/courses', courseRouter);

router
  .route('/:id/image')
  .put(bootcampImageUpload);

router
  .route('/radius/:zipcode/:distance')
  .get(getBootcampsInRadius);

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

export default router;