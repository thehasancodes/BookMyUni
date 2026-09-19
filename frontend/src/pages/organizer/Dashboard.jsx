import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  Film,
  MapPin,
  Plus,
  Ticket,
  Users,
} from "lucide-react";

import {
  getOrganizerShows,
  getOrganizerBookings,
} from "../../services/organizerService";

/* ============================= */
/* ORGANIZER DASHBOARD */
/* ============================= */

const OrganizerDashboard = () => {
  const navigate = useNavigate();

  /* ============================= */
  /* MOCK ORGANIZER DATA */
  /* ============================= */

  /*
    Temporary frontend data.

    Later this information will come from:
    showService.js
    bookingService.js

    The backend will determine which shows
    belong to the logged-in organizer.
  */

  const [shows, setShows] = useState([]);

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //for loading the dashboard data when the component mounts
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [organizerShows, organizerBookings] = await Promise.all([
          getOrganizerShows(),
          getOrganizerBookings(),
        ]);

        setShows(organizerShows);
        setBookings(organizerBookings);
      } catch (requestError) {
        setError(
          requestError?.message || "Unable to load organizer dashboard.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  /* ============================= */
  /* DASHBOARD STATISTICS */
  /* ============================= */

  const statistics = useMemo(() => {
    const publishedShows = shows.filter((show) => show.status === "Published");

    const totalSeats = shows.reduce(
      (total, show) => total + show.totalSeats,
      0,
    );

    const bookedSeats = shows.reduce(
      (total, show) => total + show.bookedSeats,
      0,
    );

    const totalRevenue = bookings
      .filter((booking) => booking.status === "Confirmed")
      .reduce((total, booking) => total + booking.amount, 0);

    return {
      totalShows: shows.length,
      publishedShows: publishedShows.length,
      totalBookings: bookings.length,
      bookedSeats,
      totalSeats,
      totalRevenue,
    };
  }, [shows, bookings]);

  /* ============================= */
  /* STATUS STYLING */
  /* ============================= */

  const getStatusClass = (status) => {
    if (status === "Published" || status === "Confirmed") {
      return "border-green-500/20 bg-green-500/10 text-green-400";
    }

    if (status === "Pending") {
      return "border-yellow-500/20 bg-yellow-500/10 text-yellow-400";
    }

    if (status === "Draft") {
      return "border-gray-700 bg-gray-800 text-gray-400";
    }

    return "border-red-500/20 bg-red-500/10 text-red-400";
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* ============================= */}
      {/* HEADER */}
      {/* ============================= */}

      <header className="border-b border-gray-800 bg-gray-950">
        <div className="mx-auto max-w-7xl px-6 py-7">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium text-purple-400">
                Organizer Panel
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight">
                Dashboard
              </h1>

              <p className="mt-2 text-sm text-gray-400">
                Manage your shows and monitor bookings.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/organizer/bookings")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
            >
              <Plus size={17} />
              Manage Shows
            </button>
          </div>
        </div>
      </header>

      {/* ============================= */}
      {/* MAIN CONTENT */}
      {/* ============================= */}

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* ============================= */}
        {/* LOADING / ERROR */}
        {/* ============================= */}

        {loading && (
          <div className="mb-6 rounded-xl border border-gray-800 bg-gray-900 px-5 py-4 text-sm text-gray-400">
            Loading organizer dashboard...
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* ============================= */}
        {/* STATISTICS */}
        {/* ============================= */}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* ============================= */}
          {/* SHOWS */}
          {/* ============================= */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
                <Film size={21} />
              </div>

              <span className="text-xs text-gray-500">
                {statistics.publishedShows} published
              </span>
            </div>

            <p className="mt-5 text-sm text-gray-400">Total Shows</p>

            <p className="mt-1 text-3xl font-bold">{statistics.totalShows}</p>
          </div>

          {/* ============================= */}
          {/* BOOKINGS */}
          {/* ============================= */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                <Ticket size={21} />
              </div>
            </div>

            <p className="mt-5 text-sm text-gray-400">Total Bookings</p>

            <p className="mt-1 text-3xl font-bold">
              {statistics.totalBookings}
            </p>
          </div>

          {/* ============================= */}
          {/* SEATS */}
          {/* ============================= */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
                <Users size={21} />
              </div>
            </div>

            <p className="mt-5 text-sm text-gray-400">Seats Booked</p>

            <p className="mt-1 text-3xl font-bold">{statistics.bookedSeats}</p>

            <p className="mt-1 text-xs text-gray-500">
              of {statistics.totalSeats} seats
            </p>
          </div>

          {/* ============================= */}
          {/* REVENUE */}
          {/* ============================= */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-green-500/10 p-3 text-green-400">
                <Ticket size={21} />
              </div>
            </div>

            <p className="mt-5 text-sm text-gray-400">Confirmed Revenue</p>

            <p className="mt-1 text-3xl font-bold">
              ₹{statistics.totalRevenue}
            </p>
          </div>
        </section>

        {/* ============================= */}
        {/* SHOWS SECTION */}
        {/* ============================= */}

        <section className="mt-8 rounded-2xl border border-gray-800 bg-gray-900">
          <div className="flex items-center justify-between border-b border-gray-800 px-5 py-5">
            <div>
              <h2 className="font-semibold">Your Shows</h2>

              <p className="mt-1 text-sm text-gray-400">
                Shows currently managed by you.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/organizer/shows")}
              className="inline-flex items-center gap-1 text-sm font-medium text-purple-400 transition hover:text-purple-300"
            >
              View All
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="divide-y divide-gray-800">
            {shows.map((show) => {
              const occupancy =
                show.totalSeats > 0
                  ? Math.round((show.bookedSeats / show.totalSeats) * 100)
                  : 0;

              return (
                <div
                  key={show.id}
                  className="p-5 transition hover:bg-gray-800/20"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    {/* ============================= */}
                    {/* SHOW INFORMATION */}
                    {/* ============================= */}

                    <div className="flex gap-4">
                      <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 sm:flex">
                        <Film size={20} />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-semibold">{show.title}</h3>

                          <span
                            className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusClass(
                              show.status,
                            )}`}
                          >
                            {show.status}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500">
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDays size={14} />
                            {show.date}
                          </span>

                          <span className="inline-flex items-center gap-1.5">
                            <Clock3 size={14} />
                            {show.time}
                          </span>

                          <span className="inline-flex items-center gap-1.5">
                            <MapPin size={14} />
                            {show.venue}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ============================= */}
                    {/* SEAT PROGRESS */}
                    {/* ============================= */}

                    <div className="w-full lg:max-w-xs">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Seat occupancy</span>

                        <span className="font-medium text-gray-300">
                          {show.bookedSeats}/{show.totalSeats}
                        </span>
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-800">
                        <div
                          className="h-full rounded-full bg-purple-500 transition-all"
                          style={{
                            width: `${occupancy}%`,
                          }}
                        />
                      </div>

                      <p className="mt-1 text-right text-xs text-gray-500">
                        {occupancy}%
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================= */}
        {/* RECENT BOOKINGS */}
        {/* ============================= */}

        <section className="mt-8 rounded-2xl border border-gray-800 bg-gray-900">
          <div className="flex items-center justify-between border-b border-gray-800 px-5 py-5">
            <div>
              <h2 className="font-semibold">Recent Bookings</h2>

              <p className="mt-1 text-sm text-gray-400">
                Latest bookings for your shows.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/organizer/shows")}
              className="inline-flex items-center gap-1 text-sm font-medium text-purple-400 transition hover:text-purple-300"
            >
              Manage
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="divide-y divide-gray-800">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-gray-200">
                    {booking.customer}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {booking.show} · {booking.seats} seat
                    {booking.seats !== 1 ? "s" : ""}
                  </p>

                  <p className="mt-1 text-xs text-gray-600">{booking.id}</p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-200">
                    ₹{booking.amount}
                  </span>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusClass(
                      booking.status,
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================= */}
        {/* DEVELOPMENT NOTICE */}
        {/* ============================= */}

        <div className="mt-6 rounded-xl border border-gray-800 bg-gray-900 px-5 py-4">
          <p className="text-xs text-gray-500">
            Development mode: organizer data is currently using temporary
            frontend data. API integration will replace this data when the
            backend is connected.
          </p>
        </div>
      </main>
    </div>
  );
};

export default OrganizerDashboard;
