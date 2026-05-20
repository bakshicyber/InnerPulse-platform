import { User } from '../models/User.js';
import { Recommendation } from '../models/Recommendation.js';
import { Session } from '../models/Session.js';
import { MoodLog } from '../models/MoodLog.js';

const DEFAULT_GEMINI_API_VERSION = 'v1';
const DEFAULT_GEMINI_MODEL = 'gemini-3.5-flash';

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

const normalizeGeminiModel = (model) => (
  (model || DEFAULT_GEMINI_MODEL)
    .replace(/^models\//, '')
    .trim()
);

const getGeminiEndpoint = () => {
  const apiVersion = (process.env.GEMINI_API_VERSION || DEFAULT_GEMINI_API_VERSION).trim();
  const model = normalizeGeminiModel(process.env.GEMINI_MODEL);

  return `https://generativelanguage.googleapis.com/${apiVersion}/models/${encodeURIComponent(model)}:generateContent`;
};

const toGeminiRole = (role) => {
  if (['guru', 'assistant', 'model'].includes(role)) return 'model';
  return 'user';
};

const buildChatContents = (message, history = [], instructionText = '') => {
  const previousMessages = Array.isArray(history) ? history.slice(-8) : [];
  const currentMessage = instructionText
    ? `${instructionText}\n\nUser message:\n${message.trim()}`
    : message.trim();

  const contents = previousMessages
    .map((item) => {
      const text = String(item?.text || item?.content || item?.message || '').trim();
      if (!text) return null;

      return {
        role: toGeminiRole(item?.role),
        parts: [{ text }]
      };
    })
    .filter(Boolean);

  contents.push({
    role: 'user',
    parts: [{ text: currentMessage }]
  });

  return contents;
};

const extractGeminiReply = (responseData) => {
  const blockReason = responseData?.promptFeedback?.blockReason;
  if (blockReason) {
    throw new Error(`Gemini blocked the prompt: ${blockReason}`);
  }

  const candidate = responseData?.candidates?.[0];
  const text = candidate?.content?.parts
    ?.map((part) => part.text)
    .filter(Boolean)
    .join('\n')
    .trim();

  if (!text) {
    const finishReason = candidate?.finishReason ? ` Finish reason: ${candidate.finishReason}.` : '';
    throw new Error(`Gemini returned no text.${finishReason}`);
  }

  return text;
};

const buildPromptAwareFallback = ({ message, lastMood }) => {
  const lowerMessage = message.toLowerCase();
  const intro = 'I am having trouble reaching the AI service right now, so here is a grounded fallback based on your message.\n\n';

  if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia')) {
    return `${intro}### Sleep Reset
- Keep the practice gentle: reclined breathing or legs-up-the-wall for 5-8 minutes.
- Try a 4-second inhale and 6-second exhale.
- Reduce bright screens and stimulating movement for the next 20 minutes.

If sleeplessness is frequent or severe, consider speaking with a qualified health professional.`;
  }

  if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lastMood === 'stressed' || lastMood === 'Very Stressed') {
    return `${intro}### Nervous System Reset
- Start with Child's Pose or a comfortable seated position.
- Breathe through the nose for 2 minutes, making the exhale slightly longer.
- Then do a slow neck and shoulder release.

Keep the goal simple: less intensity, more steadiness.`;
  }

  if (lowerMessage.includes('stretch') || lowerMessage.includes('stiff') || lowerMessage.includes('tight')) {
    return `${intro}### Quick Mobility Flow
- Cat-cow: 6 slow rounds.
- Low lunge: 45 seconds each side.
- Seated forward fold: 60 seconds with soft knees.

Move only to a comfortable range and avoid forcing the stretch.`;
  }

  if (lowerMessage.includes('breath') || lowerMessage.includes('breathing')) {
    return `${intro}### Simple Breathing Practice
- Inhale for 4 counts.
- Exhale for 6 counts.
- Repeat for 8-10 rounds.

If you feel dizzy, return to natural breathing.`;
  }

  if (lowerMessage.includes('energy') || lowerMessage.includes('morning') || lastMood === 'happy') {
    return `${intro}### Gentle Energy Flow
- Mountain Pose with steady breathing.
- 3 slow half sun salutations.
- Finish with a short standing balance pose.

Aim for alert and calm, not rushed.`;
  }

  return `${intro}### Suggested Focus
- Begin with Mountain Pose and notice your breath.
- Choose one small action: stretch, breathe, or rest.
- Keep the practice under 10 minutes if your body feels uncertain.

Tell me what you are feeling physically or emotionally, and I can narrow this down.`;
};

export const getGuruResponse = async (req, res) => {
  try {
    const { message, history } = req.body;
    const userId = req.user.id;

    if (typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const moodLogs = await MoodLog.find({ userId }).sort({ createdAt: -1 }).limit(5);
    const lastMood = moodLogs[0]?.mood || 'neutral';
    const moodHistory = moodLogs.map(l => `${l.mood} (Stress: ${l.stressScore}/10)`).join(', ');
    const profile = user.profile || {};

    const personalizedContext = `
      User: ${user.name}, Flexibility: ${profile.flexibilityLevel || 'unknown'}, Stress: ${profile.currentStressScore || 'unknown'}/10.
      Recent Moods: ${moodHistory || 'None'}
    `;

    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not defined in the environment.');
      }

      const instructionText = SYSTEM_PROMPT + "\n\nContext:\n" + personalizedContext;

      const response = await fetch(getGeminiEndpoint(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: buildChatContents(message, history, instructionText)
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API Error: ${response.status} - ${errorText}`);
      }

      const responseData = await response.json();
      const replyText = extractGeminiReply(responseData);

      return res.status(200).json({
        success: true,
        data: {
          reply: replyText,
          timestamp: new Date()
        }
      });
    } catch (apiError) {
      console.error('Gemini API Error:', apiError.message);
      const fallbackReply = buildPromptAwareFallback({ message, lastMood });

      return res.status(503).json({
        success: false,
        message: 'AI provider is unavailable. Showing fallback guidance.',
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
