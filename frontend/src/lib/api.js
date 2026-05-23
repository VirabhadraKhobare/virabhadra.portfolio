import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
const apiBaseUrl =
  import.meta.env.VITE_API_URL || `${backendUrl.replace(/\/$/, "")}/api`;

export const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("portfolio.token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
