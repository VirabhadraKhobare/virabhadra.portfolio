import axios from "axios";

const apiBaseUrl =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "https://virabhadra-portfolio-frontend.vercel.appapi"
    : "/api");

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
