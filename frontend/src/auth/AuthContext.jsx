import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const decodeToken = (jwtToken) => {
    try {
      const payload = JSON.parse(atob(jwtToken.split(".")[1]));
      return {
        username: payload.name,
        role: payload.role,
        id: payload.nameid,
      };
    } catch (err) {
      console.error("Failed to decode token:", err);
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      const decodedUser = decodeToken(token);
      setUser(decodedUser);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  const login = (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    const decodedUser = decodeToken(jwtToken);
    setUser(decodedUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
