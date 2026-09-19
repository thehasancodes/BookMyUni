import React from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Home = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-[calc(100vh-128px)] bg-gray-950 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        {isAuthenticated && (
          <div className="mb-8 rounded-2xl border border-purple-500/30 bg-purple-500/10 p-6">
            <p className="text-sm font-medium text-purple-400">
              Logged in successfully
            </p>

            <h1 className="mt-2 text-3xl font-bold text-white">
              Welcome back, {user?.name}
            </h1>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <Detail label="Name" value={user?.name} />
              <Detail label="Email" value={user?.email} />
              <Detail label="Role" value={user?.role} />
            </div>
          </div>
        )}

        {!isAuthenticated && (
          <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h1 className="text-3xl font-bold text-white">
              Welcome to BookMyUni
            </h1>

            <p className="mt-2 text-gray-400">
              Login to book seats and manage your bookings.
            </p>
          </div>
        )}

        <section className="rounded-3xl border border-gray-800 bg-linear-to-br from-purple-800 via-purple-700 to-pink-600 p-8 shadow-xl sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-purple-100">
            Now showing
          </p>

          <h2 className="mt-3 max-w-2xl text-4xl font-bold text-white sm:text-5xl">
            Find your next movie night.
          </h2>

          <p className="mt-5 max-w-xl text-lg leading-8 text-purple-100">
            Browse active shows, filter by date or venue, and see current seat
            availability before booking.
          </p>

          <button
            type="button"
            onClick={() => navigate("/movies")}
            className="mt-8 rounded-lg bg-white px-6 py-3 font-semibold text-purple-700 transition hover:bg-purple-100"
          >
            Explore Shows
          </button>
        </section>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-950 p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 font-medium text-gray-200">{value || "-"}</p>
    </div>
  );
};

export default Home;