import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { YogaFlow } from './src/models/YogaFlow.js';
import { MoodLog } from './src/models/MoodLog.js';
import { User } from './src/models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/innerpulse';

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing flows
    await YogaFlow.deleteMany({});

    // Add Sample Yoga Flow
    const flow = await YogaFlow.create({
      flowName: "Antigravity Foundation",
      duration: 15,
      difficulty: 'beginner',
      poses: [
        { 
          name: "Child's Pose", 
          image: "/images/yoga_pose_childs_pose_1777622495408.png", 
          instruction: "Sit back on your heels, bring your forehead to the mat, and reach your arms forward.", 
          duration: 60 
        },
        { 
          name: "Downward Dog", 
          image: "/images/yoga_pose_downward_dog_1777622584675.png", 
          instruction: "Lift your hips high, push through your palms, and lengthen your spine into an inverted V.", 
          duration: 60 
        },
        { 
          name: "Cobra Pose", 
          image: "/images/yoga_pose_cobra_1777622821597.png", 
          instruction: "Lie on your belly, place hands under shoulders, and gently lift your chest while keeping elbows tucked.", 
          duration: 60 
        }
      ],
      tags: ['foundation', 'grounding']
    });

    console.log('Yoga Flow seeded!');

    // Find first user and add some mood logs if they exist
    const user = await User.findOne();
    if (user) {
        console.log(`Seeding mood logs for user: ${user.email}`);
        await MoodLog.deleteMany({ userId: user._id });
        
        const pastDates = [7, 6, 5, 4, 3, 2, 1, 0];
        const moods = ['Happy', 'Neutral', 'Stressed', 'Happy', 'Happy', 'Neutral', 'Stressed', 'Happy'];
        const scores = [2, 5, 8, 3, 2, 6, 9, 3];

        for (let i = 0; i < pastDates.length; i++) {
            const date = new Date();
            date.setDate(date.getDate() - pastDates[i]);
            await MoodLog.create({
                userId: user._id,
                mood: moods[i],
                stressScore: scores[i],
                note: 'Seeded data for trend visualization.',
                createdAt: date
            });
        }
        console.log('Mood logs seeded!');
    }

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
