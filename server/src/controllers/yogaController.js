import { YogaFlow } from '../models/YogaFlow.js';
import { Session } from '../models/Session.js';
import { User } from '../models/User.js';
import { Asana } from '../models/Asana.js';
import { yogaPoses } from '../data/yogaPoses.js';

export const getPoses = async (req, res) => {
  res.json({ success: true, data: yogaPoses });
};

export const getAsanas = async (req, res) => {
    try {
        const asanas = await Asana.find({}).sort({ name: 1 });
        res.json({ success: true, data: asanas });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getFlow = async (req, res) => {
  try {
    const flow = await YogaFlow.findById(req.params.id);
    if (!flow) return res.status(404).json({ success: false, message: 'Flow not found' });
    res.json({ success: true, data: flow });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllFlows = async (req, res) => {
  try {
    const flows = await YogaFlow.find();
    res.json({ success: true, data: flows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logYogaSession = async (req, res) => {
  const { flowId, completed, totalDuration } = req.body;
  try {
    let flowName = 'Guided Session';
    let category = 'general';
    if (flowId && flowId !== 'default') {
       const flow = await YogaFlow.findById(flowId);
       if (flow) {
           flowName = flow.flowName;
           category = flow.category;
       }
    }

    const session = await Session.create({
      userId: req.user.id,
      type: 'yoga',
      flowId: flowId !== 'default' ? flowId : null,
      name: flowName,
      duration: Math.round(totalDuration / 60),
      completed: completed || false
    });

    // Update User Stats
    const user = await User.findById(req.user.id);
    if (user) {
        user.stats.totalSessionsCompleted += 1;
        user.stats.totalYogaTime += Math.round(totalDuration / 60);
        user.stats.zenScore = Math.min(100, (user.stats.zenScore || 50) + 2);
        
        if (flowId && flowId !== 'default') {
             user.stats.mostUsedFlow = flowId;
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
