import { Router } from 'express';
import { getAnalyticsSummary, trackVisitor } from '../controllers/analyticsController.js';
import { protect, requireRole } from '../middleware/auth.js';

const router = Router();

router.post('/track', trackVisitor);
router.get('/summary', protect, requireRole('admin'), getAnalyticsSummary);

export default router;
