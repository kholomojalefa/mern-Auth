import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true, //cookies
  timeout: 10000, //10 seconds timeout
});

export default API;
