import { Router } from 'express';
import { protect, requireRole } from '../middleware/auth.js';
import { getDashboard } from '../controllers/dashboardController.js';

const router = Router();

router.get('/', protect, requireRole('admin'), getDashboard);

export default router;
