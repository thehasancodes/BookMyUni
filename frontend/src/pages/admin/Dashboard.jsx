import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  Film,
  Ticket,
  Users,
  Plus,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { getAdminDashboard } from "../../services/adminService";

/* ============================= */
/* ADMIN DASHBOARD */
/* ============================= */

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  /* ============================= */
  /* STATE */
  /* ============================= */

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ============================= */
  /* LOAD DASHBOARD */
  /* ============================= */

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const dashboardData = await getAdminDashboard();

        setDashboard(dashboardData);
      } catch (requestError) {
        setError(requestError?.message || "Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  /* ============================= */
  /* DASHBOARD STATISTICS */
  /* ============================= */

  const stats = [
    {
      title: "Total Shows",
      value: dashboard?.totalShows ?? 0,
      icon: Film,
    },
    {
      title: "Today's Shows",
      value: dashboard?.todaysShows ?? 0,
      icon: CalendarDays,
    },
    {
      title: "Total Bookings",
      value: dashboard?.totalBookings ?? 0,
      icon: Ticket,
    },
    {
      title: "Total Users",
      value: dashboard?.totalUsers ?? 0,
      icon: Users,
    },
  ];

  /* ============================= */
  /* LOADING STATE */
  /* ============================= */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-gray-400">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-700 border-t-purple-500" />

          <p className="mt-4 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  /* ============================= */
  /* ERROR STATE */
  /* ============================= */

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 px-5 text-white">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
            <span className="text-lg">!</span>
          </div>

          <h1 className="mt-5 text-xl font-semibold">Dashboard unavailable</h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* ============================= */}
      {/* HEADER */}
      {/* ============================= */}

      <header className="border-b border-gray-800 bg-gray-950">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <p className="text-sm font-medium text-purple-400">Admin Panel</p>

          <div className="mt-1 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

              <p className="mt-1 text-sm text-gray-400">
                Welcome back, {user?.name || "Admin"}.
              </p>
            </div>

            {/* ============================= */}
            {/* CREATE SHOW BUTTON */}
            {/* ============================= */}

            <button
              type="button"
              onClick={() => navigate("/admin/shows/create")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-5 py-3 text-sm font-semibold transition hover:bg-purple-700"
            >
              <Plus size={18} />
              Create Show
            </button>
          </div>
        </div>
      </header>

      {/* ============================= */}
      {/* MAIN CONTENT */}
      {/* ============================= */}

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* ============================= */}
        {/* STATISTICS */}
        {/* ============================= */}

        <section>
          <div className="mb-5">
            <h2 className="text-lg font-semibold">Platform Overview</h2>

            <p className="mt-1 text-sm text-gray-400">
              A quick overview of the booking platform.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-gray-800 bg-gray-900 p-5 transition hover:-translate-y-0.5 hover:border-gray-700"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-400">{stat.title}</p>

                      <p className="mt-3 text-3xl font-bold">{stat.value}</p>
                    </div>

                    <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
                      <Icon size={21} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================= */}
        {/* MANAGEMENT CARDS */}
        {/* ============================= */}

        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">Management</h2>

            <p className="mt-1 text-sm text-gray-400">
              Manage shows and monitor platform bookings.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* ============================= */}
            {/* SHOW MANAGEMENT */}
            {/* ============================= */}

            <button
              type="button"
              onClick={() => navigate("/admin/shows")}
              className="group rounded-2xl border border-gray-800 bg-gray-900 p-6 text-left transition hover:border-purple-500/40 hover:bg-gray-900/80"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
                  <Film size={23} />
                </div>

                <ArrowRight
                  size={20}
                  className="text-gray-600 transition group-hover:translate-x-1 group-hover:text-purple-400"
                />
              </div>

              <h3 className="mt-5 text-lg font-semibold">Show Management</h3>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Create and manage shows available on the platform.
              </p>
            </button>

            {/* ============================= */}
            {/* BOOKING MANAGEMENT */}
            {/* ============================= */}

            <button
              type="button"
              onClick={() => navigate("/admin/bookings")}
              className="group rounded-2xl border border-gray-800 bg-gray-900 p-6 text-left transition hover:border-purple-500/40 hover:bg-gray-900/80"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
                  <Ticket size={23} />
                </div>

                <ArrowRight
                  size={20}
                  className="text-gray-600 transition group-hover:translate-x-1 group-hover:text-purple-400"
                />
              </div>

              <h3 className="mt-5 text-lg font-semibold">Booking Management</h3>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                View and monitor all bookings across the platform.
              </p>
            </button>
          </div>
        </section>

        {/* ============================= */}
        {/* API STATUS */}
        {/* ============================= */}

        <section className="mt-8">
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />

              <div>
                <p className="text-sm font-medium">Development Mode</p>

                <p className="mt-1 text-xs text-gray-500">
                  Dashboard statistics are currently provided by the temporary
                  service layer and can be replaced with the backend API.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
