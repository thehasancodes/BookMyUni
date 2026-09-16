import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 border-b border-gray-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-purple-400">
              BookMyUni
            </p>

            <h1 className="mt-1 text-3xl font-bold text-white">
              {isAuthenticated
                ? `Welcome, ${user?.name}`
                : "Welcome to BookMyUni"}
            </h1>
          </div>

          {isAuthenticated ? (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white transition hover:bg-purple-700"
            >
              Login
            </button>
          )}
        </div>

        {isAuthenticated && (
          <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="text-xl font-semibold text-white">
              Your login details
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <Detail label="Name" value={user?.name} />
              <Detail label="Email" value={user?.email} />
              <Detail label="Role" value={user?.role} />
            </div>
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-8">
          <p className="text-sm font-semibold text-purple-400">NOW SHOWING</p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Find your next movie.
          </h2>

          <p className="mt-3 max-w-xl text-gray-400">
            Browse active shows, filter by date or venue, and check seat
            availability before booking.
          </p>

          <button
            type="button"
            onClick={() => navigate("/movies")}
            className="mt-6 rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700"
          >
            Explore Shows
          </button>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => {
  return (
    <div className="rounded-lg bg-gray-950 p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 font-medium text-gray-200">{value || "-"}</p>
    </div>
  );
};

export default Home;