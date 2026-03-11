import axios from "axios";

//
const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_BASE_API,

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const rawUser = sessionStorage.getItem("user");
    const user = rawUser ? JSON.parse(rawUser) : null;

    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;