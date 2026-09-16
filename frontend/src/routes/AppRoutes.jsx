import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import MockDashboard from "../dev/MockDashboard";

import ProtectedRoute from "./ProtectedRoute";
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

      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ============================= */}
      {/* PROTECTED ROUTES */}
      {/* ============================= */}

      <Route element={<ProtectedRoute />}>
        <Route path="/dev-auth-test" element={<MockDashboard />} />
        {/*remove the above line its just for testing purposes */}
        {/* Future authenticated routes go here */}
      </Route>

      {/* ============================= */}
      {/* ADMIN ROUTES */}
      {/* ============================= */}

      <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}>
        {/* Future admin routes go here */}
      </Route>

      {/* ============================= */}
      {/* ORGANIZER ROUTES */}
      {/* ============================= */}

      <Route element={<RoleRoute allowedRoles={[ROLES.ORGANIZER]} />}>
        {/* Future organizer routes go here */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
