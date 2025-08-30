import mongoose from 'mongoose';
const Schema= mongoose.Schema
const ObjectId= mongoose.ObjectId

// user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    default: '',
    required:true,
    unique: true
  },
   country: { 
    type: String, 
    trim: true ,
    required:true

   },

    state: { 
      type: String,
       trim: true
       ,required :true
     },

    city: { type: String,
       trim: true
      , required : false 
    },


  // bio: {
  //   type: String,
  //   maxlength: 300,
  //   default: ''
  // },

  role: {
    type: String,
    enum: ['customer', 'provider'],
    default: 'customer'
  },

  // skills: {
  //   type: [String],
  //   default: []
  // },

  // hourlyRate: {
  //   type: Number,
  //   default: 0
  // },

 

});

const User  = mongoose.model('User', userSchema);
export default User;