import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/innerpulse';

const recommendationSchema = new mongoose.Schema({
  flow: String,
  reason: String
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

async function updateData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const result = await Recommendation.updateMany(
      { flow: 'Daily Antigravity Flow' },
      { $set: { flow: 'Sanctuary Protocol', reason: 'A comprehensive sequence engineered to maintain your physiological equilibrium.' } }
    );

    console.log(`Updated ${result.modifiedCount} recommendations.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

updateData();
