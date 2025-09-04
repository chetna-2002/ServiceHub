
import mongoose from 'mongoose';
const Schema= mongoose.Schema
const ObjectId= mongoose.ObjectId




const bookingSchema = new mongoose.Schema({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  providerId: {   
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  }
});

const Booking=  mongoose.model('Booking', bookingSchema);
export default Booking;
