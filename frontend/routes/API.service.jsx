import axios from "axios";

// ✅ Set the correct base URL (plural 'services' to match backend routes)
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

// ------------------- SERVICE API ------------------- //

// Create a new service
export const createService = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await API.post("/service/createservice", formData, {
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
    const res = await API.get("/service/allservices");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Fetching services failed" };
  }
};

// Fetch services of the logged-in user
export const getMyServices = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await API.get("/service/myservices", {
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
    const res = await API.put(`/service/update/${serviceId}`, formData, {
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
    const res = await API.delete(`/service/deleteservice/${serviceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Service deletion failed" };
  }
};
