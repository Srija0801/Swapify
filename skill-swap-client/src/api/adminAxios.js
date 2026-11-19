import axios from "axios";

const adminAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/admin`,
});

adminAxios.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem("adminToken"); // ADMIN token
  if (adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  }
  return config;
});

export default adminAxios;
