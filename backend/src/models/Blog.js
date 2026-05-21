import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    keywords: [String]
  },
  { _id: false }
);

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    coverImage: { type: String, default: '' },
    tags: [{ type: String, trim: true }],
    author: { type: String, default: 'Virbhadra Khobare' },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
    featured: { type: Boolean, default: false },
    readingTime: { type: Number, default: 5 },
    seo: seoSchema,
    publishedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const Blog = mongoose.model('Blog', blogSchema);
