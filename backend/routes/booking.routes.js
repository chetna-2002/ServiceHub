import express, { Router } from 'express'
import { cancelBooking, createBooking, getBookingsForProvider, getMyBookings,updateBookingStatus} from '../controllers/booking.controller.js';
import { authenticate } from '../auth.middleware.js';
const router = express.Router();

router.post('/createbooking', authenticate,createBooking)
router.get('/mybooking',authenticate,getMyBookings)
router.get('/providerbooking',authenticate,getBookingsForProvider)
router.delete('/cancel/:id',authenticate,cancelBooking)
router.patch('/status/:id', authenticate, updateBookingStatus);




export const bookingRouter = router;