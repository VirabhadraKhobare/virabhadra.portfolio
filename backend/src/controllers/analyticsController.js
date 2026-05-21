import { Visitor } from '../models/Visitor.js';
import { Blog } from '../models/Blog.js';
import { Message } from '../models/Message.js';
import { Project } from '../models/Project.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const trackVisitor = asyncHandler(async (request, response) => {
  const visitor = await Visitor.create({
    ip: request.headers['x-forwarded-for']?.split(',')[0] || request.ip,
    path: request.body.path || '/',
    referrer: request.body.referrer || request.headers.referer || '',
    userAgent: request.headers['user-agent'] || '',
    country: request.headers['x-vercel-ip-country'] || request.headers['x-country'] || '',
    source: request.body.source || 'direct'
  });

  response.status(201).json(visitor);
});

export const getAnalyticsSummary = asyncHandler(async (_request, response) => {
  const [visitors, messages, blogs, projects] = await Promise.all([
    Visitor.countDocuments(),
    Message.countDocuments(),
    Blog.countDocuments(),
    Project.countDocuments()
  ]);

  const recentVisitors = await Visitor.find().sort('-createdAt').limit(12).lean();

  response.json({ visitors, messages, blogs, projects, recentVisitors });
});
