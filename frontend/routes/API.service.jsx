import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api/v1", // Your Express backend URL
});// your axios instance

// Create a new service
// Create a new service
export const createService = async (formData) => {
  try {
    const token = localStorage.getItem("token"); // get JWT token from local storage
    const res = await API.post("/service/createservice", formData, {
      headers: {
        Authorization: `Bearer ${token}`,  // 👈 send token in headers
      },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Service creation failed" };
  }
};


// Fetch all services
export const getService = async () => {
  try {
    const res = await API.get("/service/allservices");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Fetching services failed" };
  }
};

// Fetch services by user (if customer wants to see only their services)
export const getMyService = async (userId) => {
  try {
    const res = await API.get(`/service/getmyservice/${userId}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Fetching user services failed" };
  }
};

// Update a service
export const updateService = async (serviceId, formData) => {
  try {
    const res = await API.put(`/service/update${serviceId}`, formData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Service update failed" };
  }
};

// Delete a service
export const deleteService = async (serviceId) => {
  try {
    const res = await API.delete(`/service/deleteservice${serviceId}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Service delete failed" };
  }
};
