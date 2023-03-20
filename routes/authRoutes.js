import express from 'express';
import {
  registerUser,
  loginUser,
  getCurrentUser
} from '../controllers/authController.js';

import { protect } from './../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/current-user', protect, getCurrentUser);

export default router;