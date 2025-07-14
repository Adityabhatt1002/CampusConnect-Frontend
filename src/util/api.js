import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // your backend URL
  withCredentials: true, // sends cookies like the token
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
