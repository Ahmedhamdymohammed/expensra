import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    config.headers = config.headers || {};

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      error.message =
        error.response.data?.message ||
        error.response.data?.error ||
        "Request failed";

      return Promise.reject(error);
    }

    if (error.request) {
      return Promise.reject(new Error("Network error, please try again"));
    }

    return Promise.reject(error);
  },
);
export default api;
