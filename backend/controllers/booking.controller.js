import Booking from '../models/booking.model.js';

export const createBooking = async (req, res) => {
  try {
    const { serviceId } = req.body;

    if (!serviceId) {
      return res.status(400).json({ message: "Service ID is required" });
    }

    const newBooking = new Booking({
      serviceId,
      customerId: req.user.userId, // from JWT token
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






// Get bookings of logged-in customer
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.user.userId })
      .populate("serviceId", "title category price location")
      .populate("customerId", "fullname phone");

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Fetch bookings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// get booking received by provider 

export const getBookingsForProvider = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: 'serviceId', // Booking schema me serviceId field ko populate karna
  match: { userId: req.user.userId }, // sirf wahi service jiska owner currently logged-in user ho
  populate: { path: 'userId', select: 'fullname phone' } // us service ke andar user ki info bhi bhar do
      })
      .populate("customerId", "fullname phone");

    // Filter out null services (not owned by this provider)
    const filteredBookings = bookings.filter(b => b.serviceId !== null);

    res.status(200).json({ success: true, bookings: filteredBookings });
  } catch (error) {
    console.error("Provider bookings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// booking cancelled by customer


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




