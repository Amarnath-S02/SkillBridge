import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://skillbridge-backend-pmhk.onrender.com/api/",
  withCredentials: true,
});


export default newRequest;
