import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/* ============================= */
/* ROLE ROUTE */
/* ============================= */

const RoleRoute = ({ allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();

  /* ============================= */
  /* LOADING STATE */
  /* ============================= */

  if (loading) {
    return <div>Loading...</div>;
  }

  /* ============================= */
  /* AUTHENTICATION CHECK */
  /* ============================= */

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  /* ============================= */
  /* ROLE CHECK */
  /* ============================= */

  if (!user?.role || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  /* ============================= */
  /* ALLOW ACCESS */
  /* ============================= */

  return <Outlet />;
};

export default RoleRoute;
