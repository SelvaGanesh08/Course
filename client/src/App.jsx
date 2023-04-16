import React, { useEffect, useState,useContext } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Favourites from "./pages/Favourites";
import Profile from "./pages/Profile";
import { AuthProvider,AuthContext } from "./components/Auth";
function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/favorites" element={<Favourites />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
