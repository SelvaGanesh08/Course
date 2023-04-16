import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserdata] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
      setUserdata(JSON.parse(localStorage.getItem("decode")));
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userData, setUserdata }}
    >
      {children}
    </AuthContext.Provider>
  );
};
