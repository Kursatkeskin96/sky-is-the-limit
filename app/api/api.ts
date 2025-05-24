import axios from "axios";

const api = axios.create({
  baseURL: "https://api.nasa.gov",
  timeout: 10000,
  params: {
    api_key: process.env.NEXT_PUBLIC_NASA_API_KEY,
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
