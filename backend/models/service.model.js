import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  serviceTitle: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    required: true,
    trim: true
  },
  skills: {
    type: String,
    required: true,
    trim: true
  },
  hourlyRate: {
    type: Number,
    required: true
  },
  alternateNumber: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return /^(\+?\d{10,15})$/.test(v); // validates phone number (10–15 digits, optional +)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // refers to the provider
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;
