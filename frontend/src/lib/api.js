import axios from "axios";
import { getCsrfToken } from "../utils/security/csrf.js";

const apiBaseUrl = import.meta.env.VITE_API_URL || "/api";

export const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

api.interceptors.request.use((config) => {
  const method = (config.method || "get").toLowerCase();

  if (["post", "put", "patch", "delete"].includes(method)) {
    const csrfToken = getCsrfToken();

    if (csrfToken) {
      config.headers["X-CSRF-Token"] = csrfToken;
    }
  }

  config.withCredentials = true;

  return config;
});
