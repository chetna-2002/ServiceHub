import express, { Router } from 'express'
import { cancelBooking, createBooking, getBookingsForProvider, getMyBookings} from '../controllers/booking.controller.js';
import {updateBookingStatus} from '../controllers/status.controller.js'
import { authenticate } from '../auth.middleware.js';
const router = express.Router();

router.post('/createbooking', authenticate,createBooking)
router.get('/mybooking',authenticate,getMyBookings)
router.get('/providerboooking',authenticate,getBookingsForProvider)
router.delete('/cancel/:id',authenticate,cancelBooking)
router.patch('/status/:id', authenticate, updateBookingStatus);




export const bookingRouter = router;