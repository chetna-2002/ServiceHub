import axios from "axios";

// ✅ Set the correct base URL (plural 'services' to match backend routes)
const API = axios.create({
  baseURL: "http://localhost:3001/api/v1/service",
});

// ------------------- SERVICE API ------------------- //

// Create a new service
export const createService = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await API.post("/createservice", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
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
    const res = await API.get("/allservices");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Fetching services failed" };
  }
};

// Fetch services of the logged-in user
export const getMyServices = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await API.get("/myservices", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch your services" };
  }
};


// Update a service
export const updateService = async (serviceId, formData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await API.put(`/update/${serviceId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Service update failed" };
  }
};

// Delete a service
export const deleteService = async (serviceId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await API.delete(`/deleteservice/${serviceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Service deletion failed" };
  }
};
