import { Router } from 'express';
import { login, getProfile, refreshProfile, getCsrfToken, logout } from '../controllers/authController.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { protect } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';
import { loginValidators } from '../validators/authValidators.js';

const router = Router();

router.get('/csrf', getCsrfToken);
router.post('/login', authLimiter, loginValidators, validateRequest, login);
router.post('/logout', logout);
router.get('/me', protect, getProfile);
router.get('/refresh', protect, refreshProfile);

export default router;
