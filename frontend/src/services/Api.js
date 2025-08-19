
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/api/v1', // your backend base
});

// Attach token from localStorage to every request automatically.
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    /*Interceptor = middleware for requests/responses.
It runs before every request leaves the frontend.

Here, before sending the request, we check localStorage for a saved token.

If found, we attach it to the request headers (config.headers.token).

This way, every request automatically includes the authentication token → no need to manually attach it in each API call. 
    */
    // Your backend used: const token = req.headers.token
    config.headers.token = token;
    // If your backend expects Authorization: Bearer <token>, use
    // config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default API;



/* Why this approach is useful?

DRY Principle (Don’t Repeat Yourself)
Without interceptors, you’d need to manually add the token to every API call:

API.get('/user/profile', { headers: { token: localStorage.getItem("token") }});


With interceptors → handled once globally.

Centralized Config
Base URL, tokens, error handling, timeouts can all be managed in one place.

Scalability
If tomorrow your backend changes to expect:

Authorization: Bearer <token>


You just update this interceptor instead of modifying every API call.

Cleaner Code
Your component code remains focused on business logic (signup/login) rather than repetitive API setup.


axios.create() gives you a reusable API client.

interceptors ensure tokens (or other headers) are always attached automatically.
*/


// This file is basically a centralized Axios configuration for your frontend. Instead of repeating API base URLs and token logic everywhere, you set it once here and reuse it across your whole project.