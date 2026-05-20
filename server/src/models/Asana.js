import mongoose from 'mongoose';

const asanaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  sanskritName: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  category: {
    type: String,
    required: true,
    enum: ['Standing', 'Seated', 'Inversion', 'Restorative', 'Core', 'Backbend', 'Balancing']
  },
  benefits: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: '/images/poses/default_pose.png'
  },
  duration: {
    type: Number,
    required: true,
    default: 60
  }
}, {
  timestamps: true
});

export const Asana = mongoose.model('Asana', asanaSchema);
