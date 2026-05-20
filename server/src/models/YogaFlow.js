import mongoose from 'mongoose';

const poseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // image URL
  instruction: { type: String, required: true },
  duration: { type: Number, required: true } // seconds
}, { _id: false });

const yogaFlowSchema = new mongoose.Schema({
  flowName: { type: String, required: true },
  goal: { type: String, required: true },
  category: { type: String, required: true }, // morning, stress, sleep, flexibility
  duration: { type: Number, required: true }, // in minutes
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  poses: [poseSchema],
  tags: [{ type: String }],
  aiGenerated: { type: Boolean, default: false }
}, { timestamps: true });

export const YogaFlow = mongoose.model('YogaFlow', yogaFlowSchema);
