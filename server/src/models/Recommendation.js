import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flow: { type: String, required: true },
  flowId: { type: mongoose.Schema.Types.ObjectId, ref: 'YogaFlow' },
  duration: { type: Number, required: true },
  breathing: { type: String, required: true },
  reason: { type: String },
  generatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const Recommendation = mongoose.model('Recommendation', recommendationSchema);
