import { Router } from 'express';
import { body } from 'express-validator';
import { login, getProfile, refreshProfile } from '../controllers/authController.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { protect } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';

const router = Router();

router.post(
  '/login',
  authLimiter,
  [body('email').isEmail().withMessage('Valid email required'), body('password').isLength({ min: 8 }).withMessage('Password required')],
  validateRequest,
  login
);
router.get('/me', protect, getProfile);
router.get('/refresh', protect, refreshProfile);

export default router;
