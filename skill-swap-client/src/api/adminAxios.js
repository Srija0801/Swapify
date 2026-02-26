import axios from "axios";

const adminAxios = axios.create({
  baseURL: "http://localhost:3000/api/admin",
});

adminAxios.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem("adminToken"); // ADMIN token
  if (adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  }
  return config;
});

export default adminAxios;
