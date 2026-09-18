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

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ============================= */}
      {/* PUBLIC ROUTES */}
      {/* ============================= */}

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Phase 2: Show Browser */}
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/:showId" element={<MovieDetails />} />

      {/* ============================= */}
      {/* PROTECTED CUSTOMER ROUTES */}
      {/* ============================= */}

      <Route element={<ProtectedRoute />}>
        {/* Phase 3: Seat Selection */}
        <Route path="/seat-selection" element={<SeatSelection />} />

        {/* Phase 4: Booking Flow */}
        <Route path="/checkout/:bookingId" element={<Checkout />} />
        <Route
          path="/booking-success/:bookingId"
          element={<BookingSuccess />}
        />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Route>

      {/* ============================= */}
      {/* UNKNOWN ROUTE */}
      {/* ============================= */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;