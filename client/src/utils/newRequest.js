import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://skillbridge-ir47.onrender.com/api/",
  withCredentials: true,
});


export default newRequest;
