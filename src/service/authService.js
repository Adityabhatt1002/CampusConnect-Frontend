// services/authService.js
import api from "../util/api";

// POST /api/auth/login
export const loginUser = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data; // contains { user }
};

// POST /api/auth/signup
export const signupUser = async (userData) => {
  const res = await api.post("/auth/signup", userData);
  return res.data; // contains { user }
};


export const logoutUser = async () => {
  await api.post("/auth/logout", {}, { withCredentials: true });
};
