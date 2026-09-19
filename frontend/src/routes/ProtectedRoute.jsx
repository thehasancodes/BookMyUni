import React from "react";
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import useAuth from "../hooks/useAuth";

/* ============================= */
/* PROTECTED ROUTE */
/* ============================= */

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  /* ============================= */
  /* LOADING STATE */
  /* ============================= */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  /* ============================= */
  /* AUTHENTICATION CHECK */
  /* ============================= */

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  /* ============================= */
  /* ALLOW ACCESS */
  /* ============================= */

  return <Outlet />;
};

export default ProtectedRoute;