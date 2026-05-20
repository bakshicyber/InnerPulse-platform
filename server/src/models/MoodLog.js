import mongoose from 'mongoose';

const moodLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mood: { type: String, required: true }, // happy, neutral, stressed, etc.
  note: String,
  stressScore: { type: Number, required: true, min: 1, max: 10 },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const MoodLog = mongoose.model('MoodLog', moodLogSchema);
