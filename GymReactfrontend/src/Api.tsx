import axios from "axios";
export const api = axios.create({
  // baseURL: "http://10.64.113.175:5000",
  // baseURL: "http://localhost:5001",

  baseURL: "https://my-nodejs-project-3pfs.onrender.com",
  timeout: 100000,
  withCredentials: true,
});
// export const BASEURL = "http://localhost:5001";
export const BASEURL = "https://my-nodejs-project-3pfs.onrender.com";
