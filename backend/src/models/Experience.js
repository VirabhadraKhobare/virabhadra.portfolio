import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String, default: '' },
    startDate: { type: String, required: true },
    endDate: { type: String, default: 'Present' },
    summary: { type: String, required: true },
    highlights: [{ type: String }],
    type: { type: String, default: 'Internship' }
  },
  { timestamps: true }
);

export const Experience = mongoose.model('Experience', experienceSchema);
