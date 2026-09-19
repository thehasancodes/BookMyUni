import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { ROLES } from "../../utils/roles";

/* ============================= */
/* NAVBAR */
/* ============================= */

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  /* ============================= */
  /* LOGOUT */
  /* ============================= */

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  /* ============================= */
  /* NAV LINK STYLING */
  /* ============================= */

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? "text-purple-400" : "text-gray-400 hover:text-white"
    }`;

  return (
    <header className="border-b border-gray-800 bg-gray-950">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* ============================= */}
        {/* LOGO */}
        {/* ============================= */}

        <Link to="/" className="text-xl font-bold text-white">
          BookMyUni <span className="text-purple-400">🎬</span>
        </Link>

        {/* ============================= */}
        {/* NAVIGATION */}
        {/* ============================= */}

        <nav className="flex items-center gap-5">
          {/* HOME */}

          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          {/* SHOWS */}

          <NavLink to="/movies" className={navLinkClass}>
            Shows
          </NavLink>

          {/* ============================= */}
          {/* ROLE DASHBOARD */}
          {/* ============================= */}

          {isAuthenticated && user?.role === ROLES.ADMIN && (
            <NavLink to="/admin/dashboard" className={navLinkClass}>
              Admin Dashboard
            </NavLink>
          )}

          {isAuthenticated && user?.role === ROLES.ORGANIZER && (
            <NavLink to="/organizer/dashboard" className={navLinkClass}>
              Organizer Dashboard
            </NavLink>
          )}

          {/* ============================= */}
          {/* AUTHENTICATED USER */}
          {/* ============================= */}

          {isAuthenticated ? (
            <>
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-white">{user?.name}</p>

                <p className="text-xs text-purple-400">{user?.role}</p>
              </div>

              {/* LOGOUT */}

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* LOGIN */}

              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>

              {/* REGISTER */}

              <Link
                to="/register"
                className="rounded-lg bg-purple-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
