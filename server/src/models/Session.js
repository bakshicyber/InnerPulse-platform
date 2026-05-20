import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['yoga', 'breathing'], required: true },
  name: { type: String, required: true },
  duration: { type: Number, required: true }, // total duration in minutes
  calmTime: { type: Number }, // specifically for breathing sessions (seconds)
  flowId: { type: mongoose.Schema.Types.ObjectId, ref: 'YogaFlow' },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const Session = mongoose.model('Session', sessionSchema);
