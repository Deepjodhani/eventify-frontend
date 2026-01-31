import axios from "axios";

const API = axios.create({
  baseURL: "https://eventify-backend-9y9n.onrender.com/api",
});

// Add token automatically if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const registerUser = (data) => API.post("/users/register", data);
export const loginUser = (data) => API.post("/users/login", data);



export default API;

export const getEvents = () => API.get("/events");
export const getEventById = (id) => API.get(`/events/${id}`);
export const registerForEvent = (id) =>
  API.post(`/events/${id}/register`);
export const createEvent = (data) => API.post("/events", data);
export const deleteEvent = (id) => API.delete(`/events/${id}`);
export const updateEvent = (id, data) => API.put(`/events/${id}`, data);



