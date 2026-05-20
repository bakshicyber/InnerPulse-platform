import { Session } from '../models/Session.js';
import { MoodLog } from '../models/MoodLog.js';
import { Recommendation } from '../models/Recommendation.js';
import { User } from '../models/User.js';
import { generateRecommendation } from './aiGuruController.js';

export const logSession = async (req, res) => {
  const { type, name, duration, calmTime, flowId } = req.body;
  try {
    const session = await Session.create({
      userId: req.user.id,
      type,
      name,
      duration,
      calmTime,
      flowId
    });

    // Update user stats
    const user = await User.findById(req.user.id);
    if (user) {
      if (type === 'breathing') {
        user.stats.totalMeditationMinutes += duration;
      }

      // --- STREAK & CONSISTENCY LOGIC ---
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const lastActive = user.stats.lastActiveDate ? new Date(user.stats.lastActiveDate) : null;
      if (lastActive) lastActive.setHours(0, 0, 0, 0);

      if (!lastActive || lastActive.getTime() !== today.getTime()) {
          if (lastActive && (today.getTime() - lastActive.getTime()) === 86400000) {
              user.stats.streak += 1;
          } else {
              user.stats.streak = 1;
          }
          if (user.stats.streak > (user.stats.longestStreak || 0)) {
              user.stats.longestStreak = user.stats.streak;
          }
          user.stats.lastActiveDate = new Date();
      }

      // Calculate 7-day Consistency %
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentSessions = await Session.aggregate([
          { $match: { userId: user._id, completedAt: { $gte: sevenDaysAgo } } },
          { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$completedAt" } } } }
      ]);
      user.stats.consistencyScore = Math.min(100, Math.round((recentSessions.length / 7) * 100));
      
      // Dynamic Zen Score Calculation
      user.stats.zenScore = Math.min(
          100, 
          Math.round((user.stats.consistencyScore * 0.4) + (user.stats.streak * 2) + (user.stats.totalSessionsCompleted * 0.5))
      );
      // ----------------------------------

      await user.save();
    }

    res.status(201).json({ success: true, data: session });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logMood = async (req, res) => {
  const { mood, stressScore, note } = req.body;
  try {
    const moodLog = await MoodLog.create({
      userId: req.user.id,
      mood,
      stressScore,
      note
    });

    // Update user's current stress score in profile
    const user = await User.findById(req.user.id);
    if (user) {
      user.profile.currentStressScore = stressScore;
      user.biometricHistory.push({
          stressScore: stressScore,
          mood: mood.toLowerCase()
      });
      await user.save();
    }

    res.status(201).json({ success: true, data: moodLog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDashboardData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const recentSessions = await Session.find({ userId: req.user.id }).sort({ completedAt: -1 }).limit(5);
    const recentMoods = await MoodLog.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(7);
    let latestRecommendation = await Recommendation.findOne({ userId: req.user.id }).sort({ generatedAt: -1 });

    if (!latestRecommendation && user.profile?.isOnboarded) {
      latestRecommendation = await generateRecommendation(req.user.id);
    }
    
    // Generate actual 7-day trend data from sessions
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const sessionsTrend = await Session.aggregate([
      { $match: { userId: user._id, completed: true, completedAt: { $gte: sevenDaysAgo, $lte: today } } },
      { $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$completedAt" } },
          totalMinutes: { $sum: "$duration" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Build complete 7-day array filling missing days
    const weeklyTrend = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        
        const foundData = sessionsTrend.find(d => d._id === dateString);
        weeklyTrend.push({
            day: date.toLocaleDateString('en-US', { weekday: 'short' }),
            val: foundData ? foundData.totalMinutes : 0
        });
    }

    res.json({
      success: true,
      data: {
        user,
        sessions: recentSessions,
        moodLogs: recentMoods,
        recommendation: latestRecommendation,
        weeklyTrend
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getMoodHistory = async (req, res) => {
  try {
    const history = await MoodLog.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(30);
    res.json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProfilePageData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        consistency: user.stats.consistencyScore || 0,
        totalMinutes: (user.stats.totalYogaTime || 0) + (user.stats.totalMeditationMinutes || 0),
        zenScore: user.stats.zenScore || 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
