import mongoose from 'mongoose';

const biometricSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  stressScore: { type: Number, min: 1, max: 10 },
  mood: { type: String, enum: ['happy', 'neutral', 'stressed', 'very stressed', 'calm', 'anxious', 'energetic', 'tired', 'balanced'] },
  restingHeartRate: Number
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // bcrypt hashed
  profile: {
    flexibilityLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    wellnessGoal: { type: String, enum: ['relaxation', 'focus', 'flexibility', 'strength'], default: 'relaxation' },
    currentStressScore: { type: Number, min: 1, max: 10, default: 5 },
    isOnboarded: { type: Boolean, default: false }
  },
  stats: {
    streak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastActiveDate: { type: Date },
    consistencyScore: { type: Number, default: 0 }, // percentage 0-100
    totalMeditationMinutes: { type: Number, default: 0 },
    zenScore: { type: Number, default: 0 }, // Algorithmic daily score
    totalSessionsCompleted: { type: Number, default: 0 },
    totalYogaTime: { type: Number, default: 0 }, // in minutes
    averageCalmTime: { type: Number, default: 0 }, // in seconds
    mostUsedFlow: { type: mongoose.Schema.Types.ObjectId, ref: 'YogaFlow' }
  },
  biometricHistory: [biometricSchema]
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
