import { User } from '../models/User.js';
import { Recommendation } from '../models/Recommendation.js';
import { Session } from '../models/Session.js';
import { MoodLog } from '../models/MoodLog.js';


const SYSTEM_PROMPT = `You are "InnerPulse Guru," a calm and emotionally intelligent wellness AI for yoga, mindfulness, breathwork, recovery, and emotional wellbeing.

Communication Style:
- Calm, human, supportive, grounded, concise, practical, emotionally aware.
- Avoid: Cryptic speech, mystical or robotic tones, sci-fi language, overusing spirituality, or vague philosophical statements.
- Tone: Peaceful and premium, sounding like a trusted wellness mentor (a highly experienced yoga teacher combined with a thoughtful wellness coach).

Response Structure:
1. Brief acknowledgment
2. Clear helpful answer
3. Gentle next-step suggestion

Formatting Rules:
- DO NOT use huge text blocks.
- USE spacing, bullet points, and clear sections for readability.
- Keep responses concise, useful, and easy to understand.
- Always answer the user clearly first, then provide actionable guidance.

Safety: Never provide medical advice.`;

export const getGuruResponse = async (req, res) => {
  try {
    const { message, context } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const moodLogs = await MoodLog.find({ userId }).sort({ createdAt: -1 }).limit(5);
    const lastMood = moodLogs[0]?.mood || 'neutral';
    const moodHistory = moodLogs.map(l => `${l.mood} (Stress: ${l.stressScore}/10)`).join(', ');

    const personalizedContext = `
      User: ${user.name}, Flexibility: ${user.profile.flexibilityLevel}, Stress: ${user.profile.currentStressScore}/10.
      Recent Moods: ${moodHistory || 'None'}
    `;

    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not defined in the environment.');
      }

      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT + "\n\nContext:\n" + personalizedContext }]
          },
          contents: [{
            parts: [{ text: message }]
          }]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API Error: ${response.status} - ${errorText}`);
      }

      const responseData = await response.json();
      const replyText = responseData.candidates?.[0]?.content?.parts?.[0]?.text || "The digital flow is currently resting.";

      return res.status(200).json({
        success: true,
        data: {
          reply: replyText,
          timestamp: new Date()
        }
      });
    } catch (apiError) {
      console.error('Gemini API Error:', apiError.message);
      
      // GURU FALLBACK LOGIC
      let fallbackReply = `I am sensing a slight interruption in the digital flow, but I am still here to guide you. `;
      
      if (lastMood === 'stressed' || lastMood === 'Very Stressed') {
        fallbackReply += `I notice your stress levels are a bit high. Let's try to ground ourselves. 

### Recommended Reset
- **Child's Pose**: 5 minutes
- **Breathing**: Slow, nasal inhales and exhales

I am here to support you. What else is on your mind?`;
      } else if (lastMood === 'happy') {
        fallbackReply += `Your energy feels wonderful today. This is a great time for some movement.

### Recommended Flow
- **Sun Salutations**: 3-5 rounds
- **Focus**: Strength and expansion

How can I help you maintain this positive state?`;
      } else {
        fallbackReply += `The flow is stable. I recommend focusing on your alignment today. 

### Suggested Focus
- **Mountain Pose**: Check your grounding
- **Breath**: Maintain a steady rhythm

How else can I assist with your wellness goals today?`;
      }

      return res.status(200).json({
        success: true,
        data: {
          reply: fallbackReply,
          timestamp: new Date(),
          isFallback: true
        }
      });
    }

  } catch (error) {
    console.error('Guru AI Controller Error:', error);
    res.status(500).json({ success: false, message: 'The sanctuary is reorganizing. Please breathe and try again.' });
  }
};
export const generateRecommendation = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    // Defensive check for profile
    const profile = user.profile || {};
    const flexibilityLevel = (profile.flexibilityLevel || 'medium').toLowerCase();
    const wellnessGoal = (profile.wellnessGoal || 'relaxation').toLowerCase();
    const currentStressScore = profile.currentStressScore || 5;
    const streak = user.stats?.streak || 0;

    // Fetch recent session history for better context
    const recentSessions = await Session.find({ userId }).sort({ completedAt: -1 }).limit(3);
    const sessionContext = recentSessions.map(s => `${s.type} session on ${s.completedAt.toDateString()}`).join(', ');

    let flow = 'Sanctuary Protocol';
    let duration = 15;
    let breathing = 'Deep Belly';
    let reason = 'A comprehensive sequence engineered to maintain your physiological equilibrium.';

    // Smart Multi-Factor Logic
    if (currentStressScore > 7) {
      if (streak < 3) {
        flow = 'Nervous System Reset';
        reason = `Your stress is high (${currentStressScore}/10) and you're just starting. We'll use 4-7-8 breathing to down-regulate your nervous system immediately.`;
        duration = 10;
        breathing = '4-7-8 Technique';
      } else {
        flow = 'Stoic Resilience Flow';
        reason = `High stress detected, but your ${streak}-day streak shows resilience. We'll use a longer, intense session to physically process the cortisol.`;
        duration = 20;
        breathing = 'Power Breath';
      }
    } else if (flexibilityLevel === 'low') {
      flow = 'Celestial Foundation';
      reason = 'Focusing on space and joint mobility. Since flexibility is a focus, we will use Ocean Breath to heat the body and safely expand your range.';
      duration = 15;
      breathing = 'Ocean (Ujjayi) Breath';
    } else if (wellnessGoal === 'focus' || wellnessGoal === 'energy') {
      flow = 'Solar Plexus Activation';
      reason = 'Targeting your goal of increased energy. This flow uses Box Breathing to sharpen mental clarity and core engagement.';
      duration = 25;
      breathing = 'Box Breathing';
    } else if (currentStressScore < 4 && streak > 5) {
        flow = 'Ascendance Flow';
        reason = 'Optimal state detected. Pushing into advanced balance poses to challenge your weightless zen mastery.';
        duration = 30;
        breathing = 'Transcendental Breath';
    }

    // Upsert or Create new recommendation
    const recommendation = await Recommendation.findOneAndUpdate(
      { userId },
      {
        flow,
        duration,
        breathing,
        reason,
        generatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    return {
      flow: recommendation.flow,
      duration: recommendation.duration,
      breathing: recommendation.breathing,
      reason: recommendation.reason
    };
  } catch (error) {
    console.error('Error generating recommendation:', error);
    return null;
  }
};
