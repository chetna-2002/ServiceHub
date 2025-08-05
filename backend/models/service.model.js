import mongoose from 'mongoose';
const Schema= mongoose.Schema
const ObjectId= mongoose.ObjectId

// models/service.model.js



const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Event', 'Cleaning', 'Home Repair', 'Tutoring', 'Others','plumbing'] // can add more categories
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  availability: {
    type: Boolean,
    default: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // user here refer to provider
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;
