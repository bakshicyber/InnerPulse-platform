import { YogaFlow } from '../models/YogaFlow.js';
import { Recommendation } from '../models/Recommendation.js';

export const generateWellnessFlow = async (user) => {
  const { wellnessGoal, currentStressScore } = user.profile;
  const currentHour = new Date().getHours();
  
  let targetCategory = 'balance'; // default
  let reason = 'Initiating an equilibrium sequence for sustained cognitive focus.';
  
  if (currentStressScore >= 7) {
    targetCategory = 'stress';
    reason = 'High stress detected. Initiating a restorative sequence to balance cognitive load.';
  } else if (currentHour < 10) {
    targetCategory = 'morning';
    reason = 'Morning protocol activated. Building energy for the day ahead.';
  } else if (currentHour > 20 || wellnessGoal === 'relaxation') {
    targetCategory = 'sleep';
    reason = 'Evening protocol activated. Preparing the nervous system for deep rest.';
  } else if (wellnessGoal === 'flexibility') {
    targetCategory = 'flexibility';
    reason = 'Aligning with your goal to increase range of motion and release tension.';
  }

  // Fetch the matching flow
  const flows = await YogaFlow.find({ category: targetCategory });
  let finalFlow;
  
  if (flows.length > 0) {
      finalFlow = flows[Math.floor(Math.random() * flows.length)];
  } else {
      // Fallback
      finalFlow = await YogaFlow.findOne(); 
  }

  // Save to Recommendation collection
  if (finalFlow) {
      await Recommendation.create({
        userId: user._id,
        flow: finalFlow.flowName,
        flowId: finalFlow._id,
        duration: finalFlow.duration,
        reason: reason,
        breathing: currentStressScore >= 7 ? '4-7-8' : 'Equal Breath'
      });
  }

  return { flow: finalFlow?.flowName, flowId: finalFlow?._id, duration: finalFlow?.duration, reason };
};
