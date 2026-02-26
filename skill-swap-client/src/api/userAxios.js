import axios from "axios";

const userAxios = axios.create({
  baseURL: "http://localhost:3000/api",
});

userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // USER token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default userAxios;
