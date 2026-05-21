import { Router } from 'express';
import { Testimonial } from '../models/Testimonial.js';
import { createCrudController } from '../controllers/crudController.js';
import { protect, requireRole } from '../middleware/auth.js';

const router = Router();
const controller = createCrudController(Testimonial, { searchFields: ['name', 'role', 'company', 'quote'] });

router.get('/', controller.list);
router.get('/:id', controller.getById);
router.post('/', protect, requireRole('admin', 'editor'), controller.create);
router.put('/:id', protect, requireRole('admin', 'editor'), controller.update);
router.delete('/:id', protect, requireRole('admin'), controller.remove);

export default router;
