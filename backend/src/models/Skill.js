import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: Number, required: true, min: 0, max: 100 },
    order: { type: Number, default: 0 },
    icon: { type: String, default: '' }
  },
  { timestamps: true }
);

export const Skill = mongoose.model('Skill', skillSchema);
