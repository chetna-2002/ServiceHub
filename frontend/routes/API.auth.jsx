import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

// Signup request
export const signup = async (formData) => {
  try {
    const res = await API.post("/auth/signup", formData);
    
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

export function logout() {
  // clear localStorage/session
  localStorage.removeItem("user")
  
  // redirect to login page (or home)
  window.location.href = "/"
}

