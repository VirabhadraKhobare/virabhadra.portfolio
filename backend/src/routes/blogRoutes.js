import { Router } from 'express';
import { body } from 'express-validator';
import { createBlog, deleteBlog, getBlogBySlug, listBlogs, updateBlog } from '../controllers/blogController.js';
import { protect, requireRole } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';

const router = Router();

router.get('/', listBlogs);
router.get('/:slug', getBlogBySlug);
router.post(
  '/',
  protect,
  requireRole('admin', 'editor'),
  [body('title').notEmpty().withMessage('Title is required'), body('excerpt').notEmpty().withMessage('Excerpt is required'), body('content').notEmpty().withMessage('Content is required')],
  validateRequest,
  createBlog
);
router.put('/:id', protect, requireRole('admin', 'editor'), updateBlog);
router.delete('/:id', protect, requireRole('admin'), deleteBlog);

export default router;
