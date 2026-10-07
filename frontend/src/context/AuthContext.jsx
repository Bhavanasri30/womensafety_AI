import { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
} from "../services/auth";
import {
  saveUser,
  getUser,
  removeUser,
} from "../services/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("nari_shield_token");

    if (!token) {
      setLoading(false);
      return;
    }

    getCurrentUser()
      .then((currentUser) => {
        setUser(currentUser);
        saveUser(currentUser);
      })
      .catch(() => {
        localStorage.removeItem("nari_shield_token");
        removeUser();
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function login(email, password) {
    const data = await loginUser(email, password);

    const currentUser = await getCurrentUser();

    setUser(currentUser);
    saveUser(currentUser);

    return {
      ...data,
      user: currentUser,
    };
  }

  function logout() {
    logoutUser();
    removeUser();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: Boolean(user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}