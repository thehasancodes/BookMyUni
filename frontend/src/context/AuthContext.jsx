import React, { createContext, useState } from "react";

import { loginUser, logoutUser } from "../services/authService";

/* ============================= */
/* AUTH CONTEXT */
/* ============================= */

export const AuthContext = createContext(null);

/* ============================= */
/* AUTH PROVIDER */
/* ============================= */

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ============================= */
  /* LOGIN */
  /* ============================= */

  const login = async (credentials) => {
    setLoading(true);

    try {
      const userData = await loginUser(credentials);

      setUser(userData);

      return userData;
    } finally {
      setLoading(false);
    }
  };

  /* ============================= */
  /* MOCK LOGIN */
  /* ============================= */

  const mockLogin = (userData) => {
    setUser(userData);
  };

  /* ============================= */
  /* LOGOUT */
  /* ============================= */

  const logout = async () => {
    setLoading(true);

    try {
      await logoutUser();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /* ============================= */
  /* CONTEXT VALUE */
  /* ============================= */

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    mockLogin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
