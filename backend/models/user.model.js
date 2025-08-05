import mongoose from 'mongoose';
const Schema= mongoose.Schema
const ObjectId= mongoose.ObjectId

// user schema
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    default: ''
  },

  location: {
    type: String,
    default: ''
  },

  bio: {
    type: String,
    maxlength: 300,
    default: ''
  },

  role: {
    type: String,
    enum: ['customer', 'provider'],
    default: 'customer'
  },

  skills: {
    type: [String],
    default: []
  },

  hourlyRate: {
    type: Number,
    default: 0
  },

 

});

const User  = mongoose.model('User', userSchema);
export default User;