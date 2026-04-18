import axios from "axios";
import { getAuth } from "firebase/auth";

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || "http://localhost:5000") + "/api",
  timeout: 30000, // Increased from 10s to 30s for slow backends
});

// Request interceptor: attach JWT token or Firebase token to every request
api.interceptors.request.use(
  async (config) => {
    // First try JWT token from localStorage
    let token = localStorage.getItem("lafiore_token");

    // If no JWT token, try to get Firebase token
    if (!token) {
      try {
        const auth = getAuth();
        if (auth.currentUser) {
          token = await auth.currentUser.getIdToken();
        }
      } catch (error) {
        console.warn("Could not get Firebase token:", error.message);
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token on auth failure
      localStorage.removeItem("lafiore_token");
      // Let AuthContext handle the redirect
    }
    return Promise.reject(error);
  }
);

export default api;
