import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema(
  {
    ip: { type: String, default: '' },
    path: { type: String, default: '/' },
    referrer: { type: String, default: '' },
    userAgent: { type: String, default: '' },
    country: { type: String, default: '' },
    source: { type: String, default: 'direct' }
  },
  { timestamps: true }
);

export const Visitor = mongoose.model('Visitor', visitorSchema);
