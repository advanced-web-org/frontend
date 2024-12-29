import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000, // Optional timeout in milliseconds
});
const temp_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyIn0.hxg7RmVNesGiy3rf-jR1o6NGVE6B_e4SthSjGrtUCz8"

// Optionally, set default headers for all requests
api.defaults.headers.common["Content-Type"] = "application/json";
api.interceptors.request.use((config) => {
  // const token = localStorage.getItem("authToken");
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  config.headers.Authorization = `Bearer ${temp_token}`;
  return config;
});

// Add interceptor for responses
api.interceptors.response.use(
  (response) => {
    // If response is successful, just return it
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized globally
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Redirecting to login");
      // You can redirect to login or logout the user here
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default api;
