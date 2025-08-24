import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api/v1", // Your Express backend URL
});

// Signup request

export const signup = async (formData) => {
  try {
    const res = await axios.post("http://localhost:3001/api/v1/auth/signup", formData);
    return res.data;  // 👈 returns { message: "...", user? }
  } catch (err) {
    throw err.response?.data || { message: "Signup failed" };
  }
};


// Login request
export const login = async (formData) => {
  const response = await API.post("/auth/login", formData);
  return response.data;
};
