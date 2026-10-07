import api from "./api";

// Register a new user
export async function registerUser(name, email, password) {
  const response = await api.post("/register", {
    name,
    email,
    password,
  });

  return response.data;
}

// Login user
export async function loginUser(email, password) {
  const response = await api.post("/login", {
    email,
    password,
  });

  const data = response.data;

  if (data.access_token) {
    localStorage.setItem("nari_shield_token", data.access_token);
  }

  return data;
}

// Get currently logged-in user
export async function getCurrentUser() {
  const response = await api.get("/auth/me");
  return response.data;
}

// Logout
export function logoutUser() {
  localStorage.removeItem("nari_shield_token");
}

// Check whether a token exists
export function isLoggedIn() {
  return Boolean(localStorage.getItem("nari_shield_token"));
}