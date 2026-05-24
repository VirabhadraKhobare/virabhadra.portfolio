import { Router } from 'express';
import { createMessage, listMessages, markMessageRead } from '../controllers/contactController.js';
import { protect, requireRole } from '../middleware/auth.js';
import { contactLimiter } from '../middleware/rateLimiter.js';
import { validateRequest } from '../middleware/validate.js';
import { contactValidators } from '../validators/contactValidators.js';

const router = Router();

router.post('/', contactLimiter, contactValidators, validateRequest, createMessage);
router.get('/messages', protect, requireRole('admin'), listMessages);
router.patch('/messages/:id/read', protect, requireRole('admin'), markMessageRead);

export default router;
