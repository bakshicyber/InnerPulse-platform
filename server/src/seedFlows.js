import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { YogaFlow } from './models/YogaFlow.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/innerpulse';

const seedFlows = async () => {
  try {
    console.log('Connecting to database...', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    await YogaFlow.deleteMany({});
    console.log('Cleared existing YogaFlows.');

    const flows = [
      {
        flowName: "Morning Energy Flow",
        goal: "Energize and awaken the body",
        category: "morning",
        duration: 15,
        difficulty: "beginner",
        poses: [
          { name: "Mountain Pose", duration: 60, instruction: "Stand tall, ground your feet, and breathe deeply.", image: "/images/poses/mountain_pose.png" },
          { name: "Downward Facing Dog", duration: 90, instruction: "Press hips up and back, lengthening the spine.", image: "/images/poses/downward_dog.png" },
          { name: "Warrior II", duration: 120, instruction: "Strong legs, arms extended, gaze forward.", image: "/images/poses/warrior_2.png" },
          { name: "Tree Pose", duration: 60, instruction: "Find balance and focus on a single point.", image: "/images/poses/tree_pose.png" }
        ],
        tags: ["morning", "energy", "activation"]
      },
      {
        flowName: "Stress Relief Flow",
        goal: "Release tension and calm the nervous system",
        category: "stress",
        duration: 20,
        difficulty: "beginner",
        poses: [
          { name: "Child's Pose", duration: 120, instruction: "Rest hips on heels, forehead to the mat.", image: "/images/poses/childs_pose.png" },
          { name: "Cat-Cow Pose", duration: 180, instruction: "Flow between arching and rounding your back with breath.", image: "/images/poses/cat_cow_pose.png" },
          { name: "Downward Facing Dog", duration: 90, instruction: "Gently stretch the hamstrings and calves.", image: "/images/poses/downward_dog.png" },
          { name: "Savasana", duration: 300, instruction: "Complete relaxation, integrating the practice.", image: "/images/poses/savasana.png" }
        ],
        tags: ["stress", "calm", "restorative"]
      },
      {
        flowName: "Night Relaxation Flow",
        goal: "Prepare the body and mind for deep sleep",
        category: "sleep",
        duration: 10,
        difficulty: "beginner",
        poses: [
          { name: "Child's Pose", duration: 180, instruction: "Sink deeply into the ground, letting go of the day.", image: "/images/poses/childs_pose.png" },
          { name: "Supine Twist", duration: 120, instruction: "Gently twist the spine, breathing into the belly.", image: "/images/poses/supine_twist.png" },
          { name: "Savasana", duration: 300, instruction: "Surrender completely to gravity.", image: "/images/poses/savasana.png" }
        ],
        tags: ["night", "sleep", "relaxation"]
      },
      {
        flowName: "Flexibility Flow",
        goal: "Increase range of motion and release tight muscles",
        category: "flexibility",
        duration: 25,
        difficulty: "intermediate",
        poses: [
          { name: "Downward Facing Dog", duration: 120, instruction: "Focus on lengthening the back of the legs.", image: "/images/poses/downward_dog.png" },
          { name: "Low Lunge", duration: 120, instruction: "Stretch the hip flexors and open the chest.", image: "/images/poses/low_lunge.png" },
          { name: "Seated Forward Bend", duration: 180, instruction: "Fold forward from the hips, keeping the spine long.", image: "/images/poses/seated_forward_bend.png" },
          { name: "Cobra Pose", duration: 90, instruction: "Open the heart and stretch the front body.", image: "/images/poses/cobra_pose.png" }
        ],
        tags: ["flexibility", "stretching", "mobility"]
      },
      {
        flowName: "Balance Flow",
        goal: "Improve stability and mental focus",
        category: "balance",
        duration: 15,
        difficulty: "intermediate",
        poses: [
          { name: "Mountain Pose", duration: 60, instruction: "Find your center of gravity.", image: "/images/poses/mountain_pose.png" },
          { name: "Tree Pose", duration: 120, instruction: "Root down through the standing leg.", image: "/images/poses/tree_pose.png" },
          { name: "Warrior III", duration: 90, instruction: "Extend the body in a straight line, balancing on one leg.", image: "/images/poses/warrior_3.png" },
          { name: "Eagle Pose", duration: 120, instruction: "Squeeze arms and legs together for central focus.", image: "/images/poses/eagle_pose.png" }
        ],
        tags: ["balance", "focus", "stability"]
      }
    ];

    await YogaFlow.insertMany(flows);
    console.log(`Successfully seeded ${flows.length} flows.`);
    
    mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedFlows();
