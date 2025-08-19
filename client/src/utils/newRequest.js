import axios from "axios";

const newRequest = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://skillbridge-backend-pmhk.onrender.com/api/"
      : "http://localhost:3000/api/",
  withCredentials: true,
});

export default newRequest;
