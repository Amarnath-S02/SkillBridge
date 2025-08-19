import axios from "axios";

const newRequest = axios.create({
  baseURL: process.env.FRONTEND_URL,
  withCredentials: true,
});

export default newRequest;

