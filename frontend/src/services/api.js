import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000"
});

// Alerts
export const getAlerts = () => API.get("/alerts");
export const addAlert = (data) => API.post("/alerts", data);

// Auth
export const signupUser = (data) => API.post("/signup", data);
export const loginUser = (data) => API.post("/login", data);
