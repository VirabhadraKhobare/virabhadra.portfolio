import { Blog } from '../models/Blog.js';
import { Certificate } from '../models/Certificate.js';
import { Experience } from '../models/Experience.js';
import { Message } from '../models/Message.js';
import { Project } from '../models/Project.js';
import { Skill } from '../models/Skill.js';
import { Testimonial } from '../models/Testimonial.js';
import { User } from '../models/User.js';
import { Visitor } from '../models/Visitor.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getDashboard = asyncHandler(async (_request, response) => {
  const [counts, recentBlogs, recentMessages, recentVisitors] = await Promise.all([
    Promise.all([
      User.countDocuments(),
      Blog.countDocuments(),
      Project.countDocuments(),
      Skill.countDocuments(),
      Experience.countDocuments(),
      Certificate.countDocuments(),
      Testimonial.countDocuments(),
      Message.countDocuments(),
      Visitor.countDocuments()
    ]),
    Blog.find().sort('-createdAt').limit(4).lean(),
    Message.find().sort('-createdAt').limit(4).lean(),
    Visitor.find().sort('-createdAt').limit(8).lean()
  ]);

  const [users, blogs, projects, skills, experiences, certificates, testimonials, messages, visitors] = counts;

  response.json({
    counts: { users, blogs, projects, skills, experiences, certificates, testimonials, messages, visitors },
    recentBlogs,
    recentMessages,
    recentVisitors
  });
});
