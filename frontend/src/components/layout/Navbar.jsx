import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive
        ? "text-purple-400"
        : "text-gray-400 hover:text-white"
    }`;

  return (
    <header className="border-b border-gray-800 bg-gray-950">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="text-xl font-bold text-white">
          BookMyUni <span className="text-purple-400">🎬</span>
        </Link>

        <nav className="flex items-center gap-5">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/movies" className={navLinkClass}>
            Shows
          </NavLink>

          {isAuthenticated ? (
            <>
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-white">
                  {user?.name}
                </p>

                <p className="text-xs text-purple-400">
                  {user?.role}
                </p>
              </div>

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
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>

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