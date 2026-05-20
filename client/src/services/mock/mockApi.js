const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAuth = {
  login: async (email, password) => {
    await sleep(1000);
    if (email === 'zen@innerpulse.com' && password === 'password') {
      return {
        user: { name: 'Zen User', email: 'zen@innerpulse.com', profile: { flexibilityLevel: 'Medium', wellnessGoal: 'relaxation', currentStressScore: 5 }, stats: { streak: 5, totalMeditationMinutes: 120 } },
        token: 'mock_jwt_token'
      };
    }
    throw new Error('Invalid credentials');
  },
  register: async (name, email, password) => {
    await sleep(1000);
    return {
      user: { name, email, profile: {}, stats: { streak: 0, totalMeditationMinutes: 0 } },
      token: 'mock_jwt_token'
    };
  }
};

export const mockDashboard = {
  getData: async () => {
    await sleep(1000);
    return {
      user: { name: 'Zen User', stats: { streak: 5, totalMeditationMinutes: 120 }, profile: { flexibilityLevel: 'Medium', wellnessGoal: 'relaxation', currentStressScore: 5 } },
      sessions: [
        { type: 'yoga', name: 'Gentle Flow', duration: 15, completedAt: new Date() },
        { type: 'breathing', name: 'Focus Breath', duration: 5, completedAt: new Date() }
      ],
      moodLogs: [
        { mood: 'Balanced', stressLevel: 5, loggedAt: new Date() }
      ],
      recommendation: {
        flow: 'Moonlit Restorative Flow',
        duration: 15,
        breathing: '4-7-8',
        reason: 'Your stress level is moderate, so we suggest a calming flow to ground your energy.'
      }
    };
  }
};
