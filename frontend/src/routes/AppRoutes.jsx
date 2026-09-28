import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import MovieDetails from "../pages/MovieDetails";
import SeatSelection from "../pages/SeatSelection";
import Checkout from "../pages/Checkout";
import BookingSuccess from "../pages/BookingSuccess";
import MyBookings from "../pages/MyBookings";

import AdminDashboard from "../pages/admin/Dashboard";
import AdminCreateShow from "../pages/admin/CreateShow";
import AdminBookings from "../pages/admin/Bookings";
import AdminShows from "../pages/admin/Shows";

import OrganizerDashboard from "../pages/organizer/Dashboard";
import OrganizerShows from "../pages/organizer/Shows";
import OrganizerCreateShow from "../pages/organizer/CreateShow";
import OrganizerBookings from "../pages/organizer/Bookings";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import { ROLES } from "../utils/roles";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/:showId" element={<MovieDetails />} />

      {/* Customer Booking Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/seat-selection" element={<SeatSelection />} />
        <Route path="/checkout/:bookingId" element={<Checkout />} />

        <Route
          path="/booking-success/:bookingId"
          element={<BookingSuccess />}
        />

        <Route path="/my-bookings" element={<MyBookings />} />
      </Route>

      {/* Organizer Routes */}
      <Route element={<RoleRoute allowedRoles={[ROLES.ORGANIZER]} />}>
        <Route
          path="/organizer/dashboard"
          element={<OrganizerDashboard />}
        />

        <Route
          path="/organizer/shows"
          element={<OrganizerShows />}
        />

        <Route
          path="/organizer/shows/create"
          element={<OrganizerCreateShow />}
        />

        <Route
          path="/organizer/bookings"
          element={<OrganizerBookings />}
        />
      </Route>

      {/* Admin Routes */}
      <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}>
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/shows"
          element={<AdminShows />}
        />

        <Route
          path="/admin/shows/create"
          element={<AdminCreateShow />}
        />

        <Route
          path="/admin/bookings"
          element={<AdminBookings />}
        />
      </Route>

      {/* Unknown URL */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;