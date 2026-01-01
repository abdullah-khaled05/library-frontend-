// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3000", // NestJS backend
// });

// export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3000",
// });

// export default api;

// src/api/auth.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);