import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api/v1/booking", // 👈 booking base route
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
  const res = await API.post("/createbooking", { serviceId });
  return res.data;
};

// Get bookings of logged-in customer
export const getMyBookings = async () => {
  const res = await API.get("/mybooking");
  return res.data;
};

// Get bookings received by provider
export const getProviderBookings = async () => {
  const res = await API.get("/providerbooking");
  return res.data;
};

// Cancel booking (by customer)
export const cancelBooking = async (id) => {
  const res = await API.delete(`/cancel/${id}`);
  return res.data;
};

// Update booking status (by provider)
export const updateBookingStatus = async (id, status) => {
  const res = await API.patch(`/status/${id}`, { status });
  return res.data;
};
