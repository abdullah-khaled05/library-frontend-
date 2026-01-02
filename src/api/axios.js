import axios from "axios";

// Create an axios instance
const API = axios.create({
  baseURL: "http://localhost:3000",
});

// Add a request interceptor to include JWT if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // store JWT after login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// Books API
export const fetchBooksAPI = () => API.get("/books");
export const fetchSingleBookAPI = (id) => API.get(`/books/${id}`);
export const addBookAPI = (data) => API.post("/books", data);
export const updateBookAPI = (id, data) => API.patch(`/books/${id}`, data);
export const deleteBookAPI = (id) => API.delete(`/books/${id}`);


// Members APIs
export const fetchMembersAPI = () => API.get("/members");
export const fetchSingleMemberAPI = (id) => API.get(`/members/${id}`);
export const addMemberAPI = (data) => API.post("/members", data);
export const updateMemberAPI = (id, data) => API.patch(`/members/${id}`, data);
export const deleteMemberAPI = (id) => API.delete(`/members/${id}`);

export default API;
