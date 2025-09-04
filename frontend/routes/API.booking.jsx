import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL 
});

// Attach JWT token automatically if stored in localStorage
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ---------------- API FUNCTIONS ----------------

// Create new booking
export const createBooking = async (serviceId) => {
  const res = await API.post("/booking/createbooking", { serviceId });
  return res.data;
};

// Get bookings of logged-in customer
export const getMyBookings = async () => {
  const res = await API.get("/booking/mybooking");
  return res.data;
};

// Get bookings received by provider
export const getProviderBookings = async () => {
  const res = await API.get("/booking/providerbooking");
  return res.data;
};

// Cancel booking (by customer)
export const cancelBooking = async (id) => {
  const res = await API.delete(`/booking/cancel/${id}`);
  return res.data;
};

// Update booking status (by provider)
export const updateBookingStatus = async (id, status) => {
  const res = await API.patch(`/booking/status/${id}`, { status });
  return res.data;
};
