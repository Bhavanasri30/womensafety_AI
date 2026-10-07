const USER_KEY = "nari_shield_user";
const THEME_KEY = "nari_shield_theme";

// Save logged-in user information
export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Get logged-in user information
export function getUser() {
  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}

// Remove logged-in user information
export function removeUser() {
  localStorage.removeItem(USER_KEY);
}

// Save theme preference
export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

// Get theme preference
export function getTheme() {
  return localStorage.getItem(THEME_KEY) || "light";
}

// Clear application session data
export function clearSession() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem("nari_shield_token");
}