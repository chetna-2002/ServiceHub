import axios from "axios";

// ✅ Axios instance with base URL
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

// ✅ Update booking status API
export const updateBookingStatus = async (id, status) => {
  const res = await API.patch(`/status/${id}`, { status }); // ✅ match backend
  return res.data;
};
