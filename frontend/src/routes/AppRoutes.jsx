import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import MovieDetails from "../pages/MovieDetails";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import { ROLES } from "../utils/roles";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Phase 2 public show-browser routes */}
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/:showId" element={<MovieDetails />} />

      <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}>
        {/* Future admin routes */}
      </Route>

      <Route element={<RoleRoute allowedRoles={[ROLES.ORGANIZER]} />}>
        {/* Future organizer routes */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;