import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/* ============================= */
/* PROTECTED ROUTE */
/* ============================= */

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

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
  /* ALLOW ACCESS */
  /* ============================= */

  return <Outlet />;
};

export default ProtectedRoute;
