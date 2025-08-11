
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/api/v1', // your backend base
});

// Attach token from localStorage to every request automatically.
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // Your backend used: const token = req.headers.token
    config.headers.token = token;
    // If your backend expects Authorization: Bearer <token>, use
    // config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default API;
