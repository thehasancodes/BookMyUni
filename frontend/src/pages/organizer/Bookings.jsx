import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Ticket, Users, IndianRupee, X } from "lucide-react";

import { getOrganizerBookings } from "../../services/organizerService";

/* ============================= */
/* ORGANIZER BOOKINGS */
/* ============================= */

const Bookings = () => {
  const navigate = useNavigate();

  /* ============================= */
  /* BOOKING STATE */
  /* ============================= */

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ============================= */
  /* FILTER STATE */
  /* ============================= */

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  /* ============================= */
  /* LOAD BOOKINGS */
  /* ============================= */

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const organizerBookings = await getOrganizerBookings();

        setBookings(organizerBookings);
      } catch (requestError) {
        setError(requestError?.message || "Unable to load organizer bookings.");
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
        booking.customer.toLowerCase().includes(searchValue) ||
        booking.show.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  /* ============================= */
  /* STATUS STYLING */
  /* ============================= */

  const getStatusClass = (status) => {
    if (status === "Confirmed") {
      return "border-green-500/20 bg-green-500/10 text-green-400";
    }

    if (status === "Pending") {
      return "border-yellow-500/20 bg-yellow-500/10 text-yellow-400";
    }

    if (status === "Cancelled") {
      return "border-red-500/20 bg-red-500/10 text-red-400";
    }

    return "border-gray-700 bg-gray-800 text-gray-400";
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* ============================= */}
      {/* HEADER */}
      {/* ============================= */}

      <header className="border-b border-gray-800 bg-gray-950">
        <div className="mx-auto max-w-7xl px-6 py-7">
          <button
            type="button"
            onClick={() => navigate("/organizer/dashboard")}
            className="mb-5 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>

          <div>
            <p className="text-sm font-medium text-purple-400">
              Organizer Panel
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight">Bookings</h1>

            <p className="mt-2 text-sm text-gray-400">
              View and monitor bookings for your shows.
            </p>
          </div>
        </div>
      </header>

      {/* ============================= */}
      {/* MAIN CONTENT */}
      {/* ============================= */}

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* ============================= */}
        {/* LOADING */}
        {/* ============================= */}

        {loading && (
          <div className="mb-6 rounded-xl border border-gray-800 bg-gray-900 px-5 py-4 text-sm text-gray-400">
            Loading organizer bookings...
          </div>
        )}

        {/* ============================= */}
        {/* ERROR */}
        {/* ============================= */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* ============================= */}
        {/* FILTER BAR */}
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
                placeholder="Search booking, customer or show..."
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

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 lg:w-52"
            >
              <option value="All">All Bookings</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </section>

        {/* ============================= */}
        {/* BOOKING COUNT */}
        {/* ============================= */}

        <div className="mt-6">
          <h2 className="font-semibold">Your Bookings</h2>

          <p className="mt-1 text-sm text-gray-500">
            {filteredBookings.length} booking
            {filteredBookings.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* ============================= */}
        {/* BOOKINGS */}
        {/* ============================= */}

        <section className="mt-5 overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">
          {filteredBookings.length > 0 && (
            <div className="hidden border-b border-gray-800 px-5 py-4 text-xs font-medium uppercase tracking-wide text-gray-500 md:grid md:grid-cols-5 md:gap-4">
              <span>Booking</span>
              <span>Customer</span>
              <span>Show</span>
              <span>Seats</span>
              <span className="text-right">Amount / Status</span>
            </div>
          )}

          <div className="divide-y divide-gray-800">
            {filteredBookings.map((booking) => (
              <article
                key={booking.id}
                className="p-5 transition hover:bg-gray-800/20"
              >
                <div className="grid gap-5 md:grid-cols-5 md:items-center md:gap-4">
                  {/* ============================= */}
                  {/* BOOKING ID */}
                  {/* ============================= */}

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                      <Ticket size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-200">
                        {booking.id}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">Booking ID</p>
                    </div>
                  </div>

                  {/* ============================= */}
                  {/* CUSTOMER */}
                  {/* ============================= */}

                  <div>
                    <p className="text-xs text-gray-500 md:hidden">Customer</p>

                    <p className="mt-1 text-sm font-medium text-gray-300 md:mt-0">
                      {booking.customer}
                    </p>
                  </div>

                  {/* ============================= */}
                  {/* SHOW */}
                  {/* ============================= */}

                  <div>
                    <p className="text-xs text-gray-500 md:hidden">Show</p>

                    <p className="mt-1 text-sm text-gray-300 md:mt-0">
                      {booking.show}
                    </p>
                  </div>

                  {/* ============================= */}
                  {/* SEATS */}
                  {/* ============================= */}

                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-500" />

                    <div>
                      <p className="text-xs text-gray-500 md:hidden">Seats</p>

                      <p className="mt-1 text-sm text-gray-300 md:mt-0">
                        {booking.seats} seat
                        {booking.seats !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  {/* ============================= */}
                  {/* AMOUNT / STATUS */}
                  {/* ============================= */}

                  <div className="flex items-center justify-between gap-3 md:flex-col md:items-end">
                    <div className="flex items-center gap-1">
                      <IndianRupee size={15} className="text-gray-500" />

                      <span className="font-semibold text-gray-200">
                        {booking.amount}
                      </span>
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusClass(
                        booking.status,
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ============================= */}
        {/* EMPTY STATE */}
        {/* ============================= */}

        {!loading && filteredBookings.length === 0 && (
          <section className="mt-5 rounded-2xl border border-gray-800 bg-gray-900 px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-gray-500">
              <Ticket size={22} />
            </div>

            <h3 className="mt-4 font-semibold">No bookings found</h3>

            <p className="mt-1 text-sm text-gray-500">
              Try changing your search or status filter.
            </p>
          </section>
        )}

        {/* ============================= */}
        {/* DEVELOPMENT NOTICE */}
        {/* ============================= */}

        <div className="mt-6 rounded-xl border border-gray-800 bg-gray-900 px-5 py-4">
          <p className="text-xs text-gray-500">
            Development mode: booking data is currently using temporary frontend
            data. API integration will replace this data when the backend is
            connected.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Bookings;
