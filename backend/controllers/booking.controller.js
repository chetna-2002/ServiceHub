import Booking from '../models/booking.model.js';
import Service from '../models/service.model.js';

// ================= CREATE BOOKING =================
export const createBooking = async (req, res) => {
  try {
    const { serviceId } = req.body;

    if (!serviceId) {
      return res.status(400).json({ message: "Service ID is required" });
    }

    // Find the service to get providerId
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const newBooking = new Booking({
      serviceId,
      customerId: req.user.userId, // from JWT token
      providerId: service.userId,
      bookingDate: new Date(), 
    });

    await newBooking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully!",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.user.userId })
      .populate({
        path: 'serviceId',
    
        select: 'serviceTitle  userId', 
        populate: {
          path: 'userId',
          model: 'User',
          select: 'name phone'
        }
      });
    //  send the fully populated bookings to the frontend
    res.status(200).json({
      success: true,
      bookings: bookings, // Send the direct result from the database
    });

  } catch (error) {
    console.error("Fetch bookings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// ================= GET PROVIDER BOOKINGS =================
export const getBookingsForProvider = async (req, res) => {
  try {
    const bookings = await Booking.find({ providerId: req.user.userId })
      .populate("serviceId", "serviceTitle ") 
      .populate('providerId', 'name phone ') 
      .populate("customerId", "name phone "); 

    res.status(200).json({
      success: true,
      bookings: bookings,
    });
  } catch (error) {
    console.error("Provider bookings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= CANCEL BOOKING (CUSTOMER) =================
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.customerId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Booking cancelled" });
  } catch (error) {
    console.error("Cancel error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= UPDATE BOOKING STATUS (PROVIDER) =================
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.providerId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({
      success: true,
      message: `Booking status updated to ${status}`,
      booking,
    });
  } catch (error) {
    console.error("Status update error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
