import express from 'express';
import { protect } from './../middleware/authMiddleware.js';
import {
  updateDetails,
  updatePassword
} from '../controllers/userController.js';

const router = express.Router();

router.put('/update-details', protect, updateDetails);
router.put('/update-password', protect, updatePassword);

export default router;