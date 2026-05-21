import { Blog } from '../models/Blog.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { HttpError } from '../utils/httpError.js';
import { toSlug } from '../utils/slug.js';

export const listBlogs = asyncHandler(async (request, response) => {
  const { search, page = 1, limit = 10, status = 'published' } = request.query;
  const query = {};

  if (status !== 'all' && !request.user) {
    query.status = 'published';
  } else if (status !== 'all') {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } }
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Blog.find(query).sort('-publishedAt').skip(skip).limit(Number(limit)).lean(),
    Blog.countDocuments(query)
  ]);

  response.json({
    items,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit) || 1)
  });
});

export const getBlogBySlug = asyncHandler(async (request, response) => {
  const blog = await Blog.findOne({ slug: request.params.slug }).lean();

  if (!blog) {
    throw new HttpError(404, 'Blog post not found');
  }

  response.json(blog);
});

export const createBlog = asyncHandler(async (request, response) => {
  const payload = {
    ...request.body,
    slug: request.body.slug || toSlug(request.body.title)
  };
  const blog = await Blog.create(payload);
  response.status(201).json(blog);
});

export const updateBlog = asyncHandler(async (request, response) => {
  const payload = {
    ...request.body
  };

  if (request.body.title && !request.body.slug) {
    payload.slug = toSlug(request.body.title);
  }

  const blog = await Blog.findByIdAndUpdate(request.params.id, payload, { new: true, runValidators: true });

  if (!blog) {
    throw new HttpError(404, 'Blog post not found');
  }

  response.json(blog);
});

export const deleteBlog = asyncHandler(async (request, response) => {
  const blog = await Blog.findByIdAndDelete(request.params.id);

  if (!blog) {
    throw new HttpError(404, 'Blog post not found');
  }

  response.status(204).send();
});
