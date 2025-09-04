import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  serviceTitle: {
    type: String,
    required: true,
    trim: true,
  },
  bio: {
    type: String,
    required: true,
    trim: true,
  },
  skills: {
    type: String,
    required: true,
    trim: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },


  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // refers to the provider
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;
