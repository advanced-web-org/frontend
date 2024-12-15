import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 5000, // Optional timeout in milliseconds
});

// Optionally, set default headers for all requests
api.defaults.headers.common["Content-Type"] = "application/json";

export default api;
