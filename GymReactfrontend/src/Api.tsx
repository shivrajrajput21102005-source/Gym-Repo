import axios from "axios";
export const api = axios.create({
  // baseURL: "http://10.64.113.175:5000",
  baseURL: "http://localhost:5000",

  // baseURL: "https://my-nodejs-project-3pfs.onrender.com",
  timeout: 5000,
  withCredentials: true,
});
