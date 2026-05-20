import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Asana } from '../models/Asana.js';

dotenv.config({ path: '../../.env' }); // Make sure this points to the right .env if run standalone
// Or just hardcode the connection for the script, but let's assume it runs in the server context.

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/innerpulse";

const asanas = [
  {
    name: "Child's Pose",
    sanskritName: "Balasana",
    difficulty: "Beginner",
    category: "Restorative",
    benefits: "Gently stretches the hips, thighs, and ankles. Calms the brain and helps relieve stress.",
    description: "Kneel on the floor, touch your big toes together and sit on your heels. Exhale and lay your torso down between your thighs.",
    image: "/images/poses/childs_pose.png",
    duration: 120
  },
  {
    name: "Downward-Facing Dog",
    sanskritName: "Adho Mukha Svanasana",
    difficulty: "Beginner",
    category: "Standing",
    benefits: "Calms the brain and helps relieve stress and mild depression. Energizes the body.",
    description: "Come onto your floor on your hands and knees. Exhale and lift your knees away from the floor.",
    image: "/images/poses/downward_dog.png",
    duration: 60
  },
  {
    name: "Mountain Pose",
    sanskritName: "Tadasana",
    difficulty: "Beginner",
    category: "Standing",
    benefits: "Improves posture. Strengthens thighs, knees, and ankles.",
    description: "Stand with bases of your big toes touching, heels slightly apart. Firm your thigh muscles and lift the knee caps.",
    image: "/images/poses/mountain_pose.png",
    duration: 60
  },
  {
    name: "Tree Pose",
    sanskritName: "Vrksasana",
    difficulty: "Beginner",
    category: "Balancing",
    benefits: "Strengthens thighs, calves, ankles, and spine. Stretches the groins and inner thighs, chest and shoulders.",
    description: "Shift your weight slightly onto the left foot, bend your right knee, and place the right sole against the inner left thigh.",
    image: "/images/poses/tree_pose.png",
    duration: 60
  },
  {
    name: "Warrior I",
    sanskritName: "Virabhadrasana I",
    difficulty: "Beginner",
    category: "Standing",
    benefits: "Stretches the chest and lungs, shoulders and neck, belly, groins (psoas).",
    description: "Step your feet wide apart. Turn your right foot out 90 degrees. Bend your right knee.",
    image: "/images/poses/warrior_1.png",
    duration: 60
  },
  {
    name: "Warrior II",
    sanskritName: "Virabhadrasana II",
    difficulty: "Beginner",
    category: "Standing",
    benefits: "Strengthens and stretches the legs and ankles. Stretches the groins, chest and lungs, shoulders.",
    description: "Step your feet wide apart. Turn your right foot out 90 degrees. Bend your right knee. Reach arms out.",
    image: "/images/poses/warrior_2.png",
    duration: 60
  },
  {
    name: "Cobra Pose",
    sanskritName: "Bhujangasana",
    difficulty: "Beginner",
    category: "Backbend",
    benefits: "Strengthens the spine. Stretches chest and lungs, shoulders, and abdomen.",
    description: "Lie prone on the floor. Stretch your legs back, tops of the feet on the floor. Spread your hands on the floor under your shoulders.",
    image: "/images/poses/cobra_pose.png",
    duration: 45
  },
  {
    name: "Plank Pose",
    sanskritName: "Phalakasana",
    difficulty: "Beginner",
    category: "Core",
    benefits: "Strengthens the arms, wrists, and spine. Tones the abdomen.",
    description: "From Downward-Facing Dog, inhale and draw your torso forward until the arms are perpendicular to the floor.",
    image: "/images/poses/plank_pose.png",
    duration: 60
  },
  {
    name: "Chaturanga",
    sanskritName: "Chaturanga Dandasana",
    difficulty: "Intermediate",
    category: "Core",
    benefits: "Strengthens arms and wrists. Tones the abdomen.",
    description: "From Plank Pose, exhale and lower your body so it hovers parallel to the floor.",
    image: "/images/poses/chaturanga.png",
    duration: 30
  },
  {
    name: "Upward-Facing Dog",
    sanskritName: "Urdhva Mukha Svanasana",
    difficulty: "Intermediate",
    category: "Backbend",
    benefits: "Improves posture. Strengthens the spine, arms, wrists. Stretches chest and lungs, shoulders, and abdomen.",
    description: "Lie prone on the floor. Bend your elbows and place hands by ribs. Inhale and lift torso and legs off floor.",
    image: "/images/poses/upward_dog.png",
    duration: 45
  },
  {
    name: "Triangle Pose",
    sanskritName: "Trikonasana",
    difficulty: "Beginner",
    category: "Standing",
    benefits: "Stretches and strengthens the thighs, knees, and ankles. Stretches the hips, groins, hamstrings.",
    description: "Stand with feet wide apart. Turn right foot out. Exhale and extend torso to the right directly over the right leg.",
    image: "/images/poses/triangle_pose.png",
    duration: 60
  },
  {
    name: "Bridge Pose",
    sanskritName: "Setu Bandhasana",
    difficulty: "Beginner",
    category: "Backbend",
    benefits: "Stretches the chest, neck, and spine. Calms the brain and helps alleviate stress.",
    description: "Lie supine on the floor. Bend your knees and set your feet on the floor. Exhale and press inner feet and arms into the floor, lifting hips.",
    image: "/images/poses/bridge_pose.png",
    duration: 60
  },
  {
    name: "Corpse Pose",
    sanskritName: "Savasana",
    difficulty: "Beginner",
    category: "Restorative",
    benefits: "Calms the brain and helps relieve stress and mild depression. Relaxes the body.",
    description: "Lie flat on your back. Keep legs comfortably apart and let feet fall open. Arms relaxed alongside the body.",
    image: "/images/poses/savasana.png",
    duration: 300
  },
  {
    name: "Camel Pose",
    sanskritName: "Ustrasana",
    difficulty: "Intermediate",
    category: "Backbend",
    benefits: "Stretches the entire front of the body, the ankles, thighs and groins. Improves posture.",
    description: "Kneel on the floor with knees hip-width apart. Lean back and reach your hands to your heels.",
    image: "/images/poses/camel_pose.png",
    duration: 45
  },
  {
    name: "Crow Pose",
    sanskritName: "Bakasana",
    difficulty: "Advanced",
    category: "Balancing",
    benefits: "Strengthens arms and wrists. Stretches the upper back. Strengthens the abdominal muscles.",
    description: "Squat down, place hands flat on the floor, bring knees to upper arms, and lean forward to lift feet.",
    image: "/images/poses/crow_pose.png",
    duration: 30
  },
  {
    name: "Boat Pose",
    sanskritName: "Navasana",
    difficulty: "Intermediate",
    category: "Core",
    benefits: "Strengthens the abdomen, hip flexors, and spine.",
    description: "Sit on the floor, lean back slightly, and lift your legs to create a V-shape with your body.",
    image: "/images/poses/boat_pose.png",
    duration: 45
  },
  {
    name: "Seated Forward Bend",
    sanskritName: "Paschimottanasana",
    difficulty: "Beginner",
    category: "Seated",
    benefits: "Calms the brain and helps relieve stress. Stretches the spine, shoulders, hamstrings.",
    description: "Sit on the floor with your legs straight in front of you. Exhale and lean forward from the hip joints.",
    image: "/images/poses/seated_forward_bend.png",
    duration: 90
  },
  {
    name: "Half Lord of the Fishes",
    sanskritName: "Ardha Matsyendrasana",
    difficulty: "Intermediate",
    category: "Seated",
    benefits: "Stimulates the liver and kidneys. Stretches the shoulders, hips, and neck. Energizes the spine.",
    description: "Sit on the floor. Bend knees. Slide left foot under right leg. Step right foot over left leg. Twist toward the right.",
    image: "/images/poses/half_lord_fishes.png",
    duration: 60
  },
  {
    name: "Headstand",
    sanskritName: "Sirsasana",
    difficulty: "Advanced",
    category: "Inversion",
    benefits: "Calms the brain and helps relieve stress and mild depression. Strengthens arms, legs, and spine.",
    description: "Interlace fingers, rest forearms on the floor, place crown of head on the floor, lift legs vertically.",
    image: "/images/poses/headstand.png",
    duration: 120
  },
  {
    name: "Shoulderstand",
    sanskritName: "Sarvangasana",
    difficulty: "Intermediate",
    category: "Inversion",
    benefits: "Calms the brain. Stimulates the thyroid and prostate glands. Stretches the shoulders and neck.",
    description: "Lie on your back, lift your legs and hips off the floor, support your back with your hands.",
    image: "/images/poses/shoulderstand.png",
    duration: 120
  },
  {
    name: "Extended Side Angle",
    sanskritName: "Utthita Parsvakonasana",
    difficulty: "Beginner",
    category: "Standing",
    benefits: "Strengthens and stretches the legs, knees, and ankles. Stretches the groins, spine, waist.",
    description: "From Warrior II, lean torso forward and bring lower arm to the thigh or floor, extend upper arm over ear.",
    image: "/images/poses/extended_side_angle.png",
    duration: 60
  },
  {
    name: "Half Moon Pose",
    sanskritName: "Ardha Chandrasana",
    difficulty: "Intermediate",
    category: "Balancing",
    benefits: "Strengthens the abdomen, ankles, thighs, buttocks, and spine. Stretches groins, hamstrings and calves.",
    description: "From Triangle Pose, bend the front knee, place front hand on the floor, lift the back leg parallel to the floor.",
    image: "/images/poses/half_moon.png",
    duration: 45
  },
  {
    name: "Dancer Pose",
    sanskritName: "Natarajasana",
    difficulty: "Intermediate",
    category: "Balancing",
    benefits: "Stretches the shoulders and chest. Stretches the thighs, groins, and abdomen. Strengthens the legs and ankles.",
    description: "Stand tall. Shift weight to one foot. Bend the other knee and grab the ankle behind you. Lean forward slightly and lift the back leg.",
    image: "/images/poses/dancer_pose.png",
    duration: 45
  },
  {
    name: "Pigeon Pose",
    sanskritName: "Eka Pada Rajakapotasana",
    difficulty: "Intermediate",
    category: "Seated",
    benefits: "Stretches the thighs, groins and psoas, abdomen, chest and shoulders, and neck.",
    description: "From Downward-Facing Dog, bring one knee forward to the wrist, extend the other leg back. Sink hips toward the floor.",
    image: "/images/poses/pigeon_pose.png",
    duration: 90
  },
  {
    name: "Lotus Pose",
    sanskritName: "Padmasana",
    difficulty: "Advanced",
    category: "Seated",
    benefits: "Calms the brain. Stimulates the pelvis, spine, abdomen, and bladder. Stretches the ankles and knees.",
    description: "Sit on the floor, place the right foot on the left thigh and the left foot on the right thigh.",
    image: "/images/poses/lotus_pose.png",
    duration: 300
  },
  {
    name: "Wheel Pose",
    sanskritName: "Urdhva Dhanurasana",
    difficulty: "Advanced",
    category: "Backbend",
    benefits: "Stretches the chest and lungs. Strengthens the arms and wrists, legs, buttocks, abdomen, and spine.",
    description: "Lie on your back, bend knees, place hands beside ears. Press up, lifting hips and chest toward the ceiling.",
    image: "/images/poses/wheel_pose.png",
    duration: 30
  },
  {
    name: "Chair Pose",
    sanskritName: "Utkatasana",
    difficulty: "Beginner",
    category: "Standing",
    benefits: "Strengthens the ankles, thighs, calves, and spine. Stretches shoulders and chest.",
    description: "Stand tall, inhale and raise arms. Exhale and bend knees, as if sitting in a chair.",
    image: "/images/poses/chair_pose.png",
    duration: 45
  },
  {
    name: "Fish Pose",
    sanskritName: "Matsyasana",
    difficulty: "Beginner",
    category: "Restorative",
    benefits: "Stretches the deep hip flexors and intercostals. Stimulates the organs of the belly and throat.",
    description: "Lie on your back, press forearms into floor, lift chest, and let head drop back lightly to the floor.",
    image: "/images/poses/fish_pose.png",
    duration: 60
  },
  {
    name: "Happy Baby Pose",
    sanskritName: "Ananda Balasana",
    difficulty: "Beginner",
    category: "Restorative",
    benefits: "Gently stretches the inner groins and the back spine. Calms the brain and helps relieve stress and fatigue.",
    description: "Lie on your back, pull knees to chest, grab the outside edges of your feet, and pull knees toward armpits.",
    image: "/images/poses/happy_baby.png",
    duration: 90
  },
  {
    name: "Low Lunge",
    sanskritName: "Anjaneyasana",
    difficulty: "Beginner",
    category: "Standing",
    benefits: "Releases tension in the hips. Stretches the hamstrings, quads, and groin.",
    description: "Step one foot forward between your hands, lower the back knee to the floor, and lift your torso and arms.",
    image: "/images/poses/low_lunge.png",
    duration: 60
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected for Seeding Asanas...');
    
    await Asana.deleteMany(); // Clear existing
    console.log('Cleared existing Asanas');
    
    await Asana.insertMany(asanas);
    console.log('Successfully seeded 30 Asanas!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();
