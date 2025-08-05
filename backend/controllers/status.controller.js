import Booking from "../models/booking.model.js";

// Update status (by provider)
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id).populate('serviceId');

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if the logged-in user is the provider (owner of service)
    if (booking.serviceId.userId.toString() !== req.user.userId) {
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
