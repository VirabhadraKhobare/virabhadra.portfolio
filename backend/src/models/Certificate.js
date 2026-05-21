import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    issuedAt: { type: String, required: true },
    thumbnailUrl: { type: String, default: '' },
    pdfUrl: { type: String, default: '' },
    verificationUrl: { type: String, default: '' },
    category: { type: String, default: 'certification' }
  },
  { timestamps: true }
);

export const Certificate = mongoose.model('Certificate', certificateSchema);
