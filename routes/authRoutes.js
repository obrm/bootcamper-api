import express from 'express';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  forgotPassword,
  resetPassword
} from '../controllers/authController.js';

import { protect } from './../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/current-user', protect, getCurrentUser);
router.post('/forgot-password', forgotPassword);

router.put('/reset-password/:resettoken', resetPassword);

export default router;