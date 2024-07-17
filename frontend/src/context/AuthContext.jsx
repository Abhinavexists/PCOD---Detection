import React, { createContext, useContext, useEffect, useState } from "react";
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  signupUser,
} from "../helpers/api-communicator";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // true for login

  useEffect(() => {
    // Fetch if the user's cookies are valid then skip login
    async function checkStatus() {
      const data = await checkAuthStatus();
      if (data) {
        setUser({ email: data.email, firstname: data.firstname, lastname: data.lastname });
        setIsLoggedIn(true);
      }
    }
    checkStatus();
  }, []);

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    if (data) {
      setUser({ email: data.email, firstname: data.firstname, lastname: data.lastname });
      setIsLoggedIn(true);
    }
  };

  const signup = async (name, email, password) => {
    const data = await signupUser(name, email, password);
    if (data) {
      setUser({ email: data.email, firstname: data.firstname, lastname: data.lastname });
      setIsLoggedIn(true);
    }
  };

  const logout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    setUser(null);
    window.location.reload(); // Reloading the window to clear any cached data
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
