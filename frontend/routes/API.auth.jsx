import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api/v1", // Your Express backend URL
});

// Signup request
export const signup = async (formData) => {
  try {
    const res = await API.post("/auth/signup", formData);
    console.log("res in APi file ", res)
    return res.data; 
  } catch (err) {
    // forward backend error message
    throw err.response?.data || { message: "Signup failed in auth file" };
  }
};

// Login request
export const login = async (formData) => {
  try {
    const res = await API.post("/auth/login", formData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};
