import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import { generateRecommendation } from './aiGuruController.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'innerpulse_secret_key', {
    expiresIn: '30d',
  });
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          profile: user.profile,
          stats: user.stats,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (user) {
      res.json({ success: true, data: user });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOnboarding = async (req, res) => {
    const { age, gender, flexibility, stress, goal } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (user) {
            user.profile = {
                flexibilityLevel: flexibility.toLowerCase(),
                wellnessGoal: goal.toLowerCase(),  // FIX: form sends 'Relaxation', schema needs 'relaxation'
                currentStressScore: stress,
                isOnboarded: true
            };
            // Add initial biometric entry
            user.biometricHistory.push({
                stressScore: stress,
                mood: 'balanced'
            });
            await user.save();
            
            // Generate initial AI recommendation
            await generateRecommendation(user._id);
            
            res.json({ success: true, data: user });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Onboarding error:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
