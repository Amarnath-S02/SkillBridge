import axios from "axios";

const newRequest = axios.create({
  baseURL: process.env.FRONTEND_URL || "http://localhost:3000/api/",
  withCredentials: true,
});

export default newRequest;

