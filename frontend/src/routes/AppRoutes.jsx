import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import MovieDetails from "../pages/MovieDetails";

import AdminDashboard from "../pages/admin/Dashboard";
import AdminCreateShow from "../pages/admin/CreateShow";
import AdminBookings from "../pages/admin/Bookings";
import AdminShows from "../pages/admin/Shows";

import Dashboard from "../pages/organizer/Dashboard";
import Shows from "../pages/organizer/Shows";
import CreateShow from "../pages/organizer/CreateShow";
import Bookings from "../pages/organizer/Bookings";

import RoleRoute from "./RoleRoute";
import { ROLES } from "../utils/roles";

/* ============================= */
/* APPLICATION ROUTES */
/* ============================= */

const AppRoutes = () => {
  return (
    <Routes>
      {/* ============================= */}
      {/* PUBLIC ROUTES */}
      {/* ============================= */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/movies" element={<Movies />} />

      <Route path="/movies/:showId" element={<MovieDetails />} />

      {/* ============================= */}
      {/* ORGANIZER ROUTES */}
      {/* ============================= */}

      <Route element={<RoleRoute allowedRoles={[ROLES.ORGANIZER]} />}>
        <Route path="/organizer/dashboard" element={<Dashboard />} />

        <Route path="/organizer/shows" element={<Shows />} />
        <Route path="/organizer/bookings" element={<Bookings />} />

        <Route path="/organizer/shows/create" element={<CreateShow />} />
      </Route>

      {/* ============================= */}
      {/* ADMIN ROUTES */}
      {/* ============================= */}

      <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/admin/shows" element={<AdminShows />} />

        <Route path="/admin/shows/create" element={<AdminCreateShow />} />

        <Route path="/admin/bookings" element={<AdminBookings />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
