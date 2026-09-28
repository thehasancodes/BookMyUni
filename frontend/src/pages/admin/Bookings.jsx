import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  Search,
  Ticket,
  Users,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getAdminBookings } from "../../services/adminService";

/* ============================= */
/* ADMIN BOOKINGS */
/* ============================= */

const Bookings = () => {
  const navigate = useNavigate();

  /* ============================= */
  /* STATE */
  /* ============================= */

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  /* ============================= */
  /* LOAD BOOKINGS */
  /* ============================= */

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const bookingData = await getAdminBookings();

        setBookings(bookingData);
      } catch (requestError) {
        setError(requestError?.message || "Unable to load booking records.");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  /* ============================= */
  /* FILTER BOOKINGS */
  /* ============================= */

  const filteredBookings = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesSearch =
        !searchValue ||
        booking.id.toLowerCase().includes(searchValue) ||
        booking.user.toLowerCase().includes(searchValue) ||
        booking.email.toLowerCase().includes(searchValue) ||
        booking.show.toLowerCase().includes(searchValue) ||
        booking.venue.toLowerCase().includes(searchValue);

      const matchesStatus = status === "All" || booking.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, status]);

  /* ============================= */
  /* BOOKING COUNTS */
  /* ============================= */

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "Confirmed",
  ).length;

  const pendingCount = bookings.filter(
    (booking) => booking.status === "Pending",
  ).length;

  /* ============================= */
  /* STATUS STYLING */
  /* ============================= */

  const getStatusClass = (bookingStatus) => {
    if (bookingStatus === "Confirmed") {
      return "border-green-500/20 bg-green-500/10 text-green-400";
    }

    if (bookingStatus === "Pending") {
      return "border-yellow-500/20 bg-yellow-500/10 text-yellow-400";
    }

    if (bookingStatus === "Cancelled") {
      return "border-red-500/20 bg-red-500/10 text-red-400";
    }

    return "border-gray-700 bg-gray-800 text-gray-400";
  };

  /* ============================= */
  /* LOADING STATE */
  /* ============================= */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-gray-400">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-700 border-t-purple-500" />

          <p className="mt-4 text-sm">Loading bookings...</p>
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
            <X size={22} />
          </div>

          <h1 className="mt-5 text-xl font-semibold">Bookings unavailable</h1>

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
          <button
            type="button"
            onClick={() => navigate("/admin/dashboard")}
            className="mb-5 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium text-purple-400">Admin Panel</p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight">
                Bookings
              </h1>

              <p className="mt-2 text-sm text-gray-400">
                View and monitor bookings across the platform.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3">
              <Ticket size={18} className="text-purple-400" />

              <span className="text-sm text-gray-300">
                {bookings.length} total bookings
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ============================= */}
      {/* MAIN CONTENT */}
      {/* ============================= */}

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* ============================= */}
        {/* FILTERS */}
        {/* ============================= */}

        <section className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* SEARCH */}

            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search booking, user, movie or venue..."
                className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 pl-10 pr-10 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-white"
                  aria-label="Clear search"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            {/* STATUS FILTER */}

            <div className="relative lg:w-52">
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 pr-10 text-sm text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              >
                <option value="All">All Statuses</option>

                <option value="Confirmed">Confirmed</option>

                <option value="Pending">Pending</option>

                <option value="Cancelled">Cancelled</option>
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>
        </section>

        {/* ============================= */}
        {/* BOOKING SUMMARY */}
        {/* ============================= */}

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <SummaryCard
            label="Total"
            value={bookings.length}
            icon={<Ticket size={20} />}
            iconClass="bg-purple-500/10 text-purple-400"
          />

          <SummaryCard
            label="Confirmed"
            value={confirmedCount}
            icon={<Users size={20} />}
            iconClass="bg-green-500/10 text-green-400"
          />

          <SummaryCard
            label="Pending"
            value={pendingCount}
            icon={<CalendarDays size={20} />}
            iconClass="bg-yellow-500/10 text-yellow-400"
          />
        </section>

        {/* ============================= */}
        {/* BOOKINGS TABLE */}
        {/* ============================= */}

        <section className="mt-6 overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">
          <div className="border-b border-gray-800 px-5 py-5">
            <h2 className="font-semibold">Booking Records</h2>

            <p className="mt-1 text-sm text-gray-400">
              {filteredBookings.length} booking
              {filteredBookings.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* ============================= */}
          {/* DESKTOP TABLE */}
          {/* ============================= */}

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead className="border-b border-gray-800 bg-gray-950/50">
                <tr>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Booking
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    User
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Show
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Schedule
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Seats
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Amount
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-800">
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="transition hover:bg-gray-800/30"
                  >
                    <td className="px-5 py-5">
                      <p className="font-medium text-white">{booking.id}</p>
                    </td>

                    <td className="px-5 py-5">
                      <p className="font-medium text-gray-200">
                        {booking.user}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {booking.email}
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <p className="font-medium text-gray-200">
                        {booking.show}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {booking.venue}
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <p className="text-sm text-gray-300">{booking.date}</p>

                      <p className="mt-1 text-xs text-gray-500">
                        {booking.time}
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex flex-wrap gap-1">
                        {booking.seats.map((seat) => (
                          <span
                            key={seat}
                            className="rounded-md bg-gray-800 px-2 py-1 text-xs text-gray-300"
                          >
                            {seat}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-5 py-5 font-medium text-gray-200">
                      ₹{booking.amount}
                    </td>

                    <td className="px-5 py-5">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${getStatusClass(
                          booking.status,
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ============================= */}
          {/* MOBILE CARDS */}
          {/* ============================= */}

          <div className="divide-y divide-gray-800 md:hidden">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{booking.show}</p>

                    <p className="mt-1 text-xs text-gray-500">{booking.id}</p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${getStatusClass(
                      booking.status,
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">User</p>

                    <p className="mt-1 text-gray-300">{booking.user}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Venue</p>

                    <p className="mt-1 text-gray-300">{booking.venue}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Date</p>

                    <p className="mt-1 text-gray-300">{booking.date}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Time</p>

                    <p className="mt-1 text-gray-300">{booking.time}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Seats</p>

                    <p className="mt-1 text-gray-300">
                      {booking.seats.join(", ")}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Amount</p>

                    <p className="mt-1 font-medium text-gray-200">
                      ₹{booking.amount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ============================= */}
          {/* EMPTY STATE */}
          {/* ============================= */}

          {filteredBookings.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-gray-500">
                <Ticket size={22} />
              </div>

              <h3 className="mt-4 font-semibold">No bookings found</h3>

              <p className="mt-1 text-sm text-gray-500">
                Try changing your search or status filter.
              </p>
            </div>
          )}
        </section>

        {/* ============================= */}
        {/* DEVELOPMENT NOTICE */}
        {/* ============================= */}

        <div className="mt-6 rounded-xl border border-gray-800 bg-gray-900 px-5 py-4">
          <p className="text-xs text-gray-500">
            Development mode: booking records are currently provided by the
            service layer and can be replaced with backend API data.
          </p>
        </div>
      </main>
    </div>
  );
};

/* ============================= */
/* SUMMARY CARD */
/* ============================= */

const SummaryCard = ({ label, value, icon, iconClass }) => {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
      <div className="flex items-center gap-3">
        <div className={`rounded-xl p-3 ${iconClass}`}>{icon}</div>

        <div>
          <p className="text-sm text-gray-400">{label}</p>

          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
