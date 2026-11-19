import axios from "axios";

const userAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // USER token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default userAxios;
