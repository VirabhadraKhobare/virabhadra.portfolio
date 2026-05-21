import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: String, default: '' },
    techStack: [{ type: String }],
    liveUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    category: { type: String, default: 'web' },
    metrics: {
      users: { type: String, default: '' },
      performance: { type: String, default: '' }
    }
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);
