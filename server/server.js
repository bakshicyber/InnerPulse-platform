import dotenv from 'dotenv';
dotenv.config();

console.log('Environment Check - Gemini API Key exists:', !!process.env.GEMINI_API_KEY);
console.log('Environment Check - Gemini Model:', process.env.GEMINI_MODEL || 'gemini-3.5-flash');

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { getGuruResponse } from './src/controllers/aiGuruController.js';
import { generateWellnessFlow } from './src/services/recommenderService.js';
import { registerUser, loginUser, getUserProfile, updateOnboarding } from './src/controllers/authController.js';
import { protect } from './src/middleware/authMiddleware.js';
import { logSession, logMood, getDashboardData, getMoodHistory, getProfilePageData } from './src/controllers/apiController.js';
import { getFlow, getAllFlows, logYogaSession, getPoses, getAsanas } from './src/controllers/yogaController.js';
import { User } from './src/models/User.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/innerpulse';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB - The Sanctuary is grounded.'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'InnerPulse API is breathing.' });
});

// Auth Routes
app.post('/api/auth/register', registerUser);
app.post('/api/auth/login', loginUser);
app.get('/api/auth/profile', protect, getUserProfile);
app.post('/api/auth/onboarding', protect, updateOnboarding);

// AI Guru Route
app.post('/api/ai/guru-chat', protect, getGuruResponse);

// Activity & Stats Routes
app.post('/api/session', protect, logSession);
app.post('/api/mood', protect, logMood);
app.get('/api/mood/history', protect, getMoodHistory);
app.get('/api/dashboard', protect, getDashboardData);
app.get('/api/user/profile', protect, getProfilePageData);

// Yoga Routes
app.get('/api/yoga/flows', protect, getAllFlows);
app.get('/api/yoga/flow/:id', protect, getFlow);
app.get('/api/yoga/poses', protect, getPoses);
app.get('/api/asanas', protect, getAsanas);
app.post('/api/yoga/session', protect, logYogaSession);

// Recommender Route
app.get('/api/wellness/daily-flow', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        
        const flow = await generateWellnessFlow(user);
        res.json({ success: true, data: flow });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`InnerPulse API floating on port ${PORT}`);
});
