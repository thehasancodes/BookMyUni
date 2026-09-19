import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  MapPin,
  Search,
  Ticket,
  XCircle,
} from "lucide-react";

/* ============================= */
/* MOCK BOOKINGS */
/* ============================= */

/*
  Temporary booking data for frontend testing.

  Later this data will come from:
  bookingService.js

  Example future API:
  getMyBookings()
*/

const MOCK_BOOKINGS = [
  {
    id: "BKG-20260915-001",
    title: "Interstellar",
    date: "2026-09-20",
    time: "18:30",
    venue: "BookMyUni Cinema Hall",
    seats: ["A2", "A3"],
    totalAmount: 500,
    status: "confirmed",
  },
  {
    id: "BKG-20260912-002",
    title: "The Dark Knight",
    date: "2026-09-21",
    time: "20:00",
    venue: "Main Auditorium",
    seats: ["B1", "B2", "B4"],
    totalAmount: 600,
    status: "confirmed",
  },
  {
    id: "BKG-20260910-003",
    title: "Inside Out 2",
    date: "2026-09-22",
    time: "11:00",
    venue: "BookMyUni Cinema Hall",
    seats: ["C3"],
    totalAmount: 180,
    status: "cancelled",
  },
];

/* ============================= */
/* MY BOOKINGS */
/* ============================= */

const MyBookings = () => {
  /* ============================= */
  /* STATE */
  /* ============================= */

  const [bookings] = useState(MOCK_BOOKINGS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  /* ============================= */
  /* FILTER BOOKINGS */
  /* ============================= */

  const filteredBookings = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesSearch =
        !normalizedSearch ||
        booking.title.toLowerCase().includes(normalizedSearch) ||
        booking.id.toLowerCase().includes(normalizedSearch) ||
        booking.venue.toLowerCase().includes(normalizedSearch);

      const matchesFilter = filter === "all" || booking.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [bookings, search, filter]);

  /* ============================= */
  /* BOOKING COUNTS */
  /* ============================= */

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "confirmed",
  ).length;

  const cancelledCount = bookings.filter(
    (booking) => booking.status === "cancelled",
  ).length;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* ============================= */}
      {/* HEADER */}
      {/* ============================= */}

      <header className="border-b border-gray-800 bg-gray-950">
        <div className="mx-auto max-w-6xl px-5 py-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-purple-400">
                Your activity
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight">
                My Bookings
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                View and manage your movie bookings.
              </p>
            </div>

            <Link
              to="/movies"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700"
            >
              <Ticket size={17} />
              Browse Shows
            </Link>
          </div>
        </div>
      </header>

      {/* ============================= */}
      {/* MAIN CONTENT */}
      {/* ============================= */}

      <main className="mx-auto max-w-6xl px-5 py-8">
        {/* ============================= */}
        {/* STATS */}
        {/* ============================= */}

        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Total bookings"
            value={bookings.length}
            icon={<Ticket size={18} />}
          />

          <StatCard
            label="Confirmed"
            value={confirmedCount}
            icon={<CalendarDays size={18} />}
          />

          <StatCard
            label="Cancelled"
            value={cancelledCount}
            icon={<XCircle size={18} />}
          />
        </div>

        {/* ============================= */}
        {/* SEARCH + FILTER */}
        {/* ============================= */}

        <section className="mt-7 rounded-2xl border border-gray-800 bg-gray-900 p-4">
          <div className="flex flex-col gap-3 md:flex-row">
            {/* SEARCH */}

            <div className="relative flex-1">
              <Search
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search bookings..."
                className="w-full rounded-lg border border-gray-800 bg-gray-950 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            {/* FILTER */}

            <div className="flex rounded-lg border border-gray-800 bg-gray-950 p-1">
              <FilterButton
                active={filter === "all"}
                onClick={() => setFilter("all")}
              >
                All
              </FilterButton>

              <FilterButton
                active={filter === "confirmed"}
                onClick={() => setFilter("confirmed")}
              >
                Confirmed
              </FilterButton>

              <FilterButton
                active={filter === "cancelled"}
                onClick={() => setFilter("cancelled")}
              >
                Cancelled
              </FilterButton>
            </div>
          </div>
        </section>

        {/* ============================= */}
        {/* BOOKING LIST */}
        {/* ============================= */}

        <section className="mt-6">
          {filteredBookings.length > 0 ? (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <EmptyState search={search} filter={filter} />
          )}
        </section>

        {/* ============================= */}
        {/* API NOTE */}
        {/* ============================= */}

        <div className="mt-7 rounded-xl border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-5 text-gray-600">
            Booking history currently uses temporary mock data. The list will be
            connected to the backend through{" "}
            <span className="font-mono text-gray-500">bookingService.js</span>{" "}
            later.
          </p>
        </div>
      </main>
    </div>
  );
};

/* ============================= */
/* BOOKING CARD */
/* ============================= */

const BookingCard = ({ booking }) => {
  const isCancelled = booking.status === "cancelled";

  return (
    <article className="group rounded-2xl border border-gray-800 bg-gray-900 p-5 transition hover:border-gray-700">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* ============================= */}
        {/* SHOW INFO */}
        {/* ============================= */}

        <div className="flex min-w-0 items-start gap-4">
          <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-gray-800 bg-gray-950 text-purple-400 sm:flex">
            <Ticket size={23} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-lg font-semibold text-white">
                {booking.title}
              </h2>

              <StatusBadge status={booking.status} />
            </div>

            <p className="mt-1 font-mono text-xs text-gray-600">{booking.id}</p>

            {/* ============================= */}
            {/* DETAILS */}
            {/* ============================= */}

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={15} />
                {booking.date}
              </span>

              <span className="inline-flex items-center gap-2">
                <Clock3 size={15} />
                {booking.time}
              </span>

              <span className="inline-flex items-center gap-2">
                <MapPin size={15} />
                {booking.venue}
              </span>
            </div>
          </div>
        </div>

        {/* ============================= */}
        {/* BOOKING SUMMARY */}
        {/* ============================= */}

        <div className="flex flex-col gap-4 border-t border-gray-800 pt-4 lg:min-w-[280px] lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <div className="flex items-center justify-between gap-6">
            <div>
              <p className="text-xs text-gray-600">Seats</p>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {booking.seats.map((seat) => (
                  <span
                    key={seat}
                    className="rounded-md border border-gray-800 bg-gray-950 px-2 py-1 text-xs font-medium text-gray-400"
                  >
                    {seat}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-600">Total</p>

              <p className="mt-1 text-lg font-bold text-white">
                ₹{booking.totalAmount}
              </p>
            </div>
          </div>

          {/* ============================= */}
          {/* ACTION */}
          {/* ============================= */}

          {!isCancelled && (
            <button
              type="button"
              disabled
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-800 bg-gray-950 px-4 py-2.5 text-sm font-medium text-gray-600"
            >
              View Ticket
              <ChevronRight size={15} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

/* ============================= */
/* STAT CARD */
/* ============================= */

const StatCard = ({ label, value, icon }) => {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{label}</p>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-2xl font-bold">{value}</p>
    </div>
  );
};

/* ============================= */
/* FILTER BUTTON */
/* ============================= */

const FilterButton = ({ active, onClick, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md px-3 py-2 text-xs font-medium transition ${
        active
          ? "bg-purple-600 text-white"
          : "text-gray-500 hover:text-gray-300"
      }`}
    >
      {children}
    </button>
  );
};

/* ============================= */
/* STATUS BADGE */
/* ============================= */

const StatusBadge = ({ status }) => {
  const isConfirmed = status === "confirmed";

  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${
        isConfirmed
          ? "border-green-500/20 bg-green-500/10 text-green-400"
          : "border-red-500/20 bg-red-500/10 text-red-400"
      }`}
    >
      {isConfirmed ? "Confirmed" : "Cancelled"}
    </span>
  );
};

/* ============================= */
/* EMPTY STATE */
/* ============================= */

const EmptyState = ({ search, filter }) => {
  const hasFilters = search || filter !== "all";

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 px-6 py-14 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gray-800 bg-gray-950 text-gray-600">
        <Ticket size={23} />
      </div>

      <h2 className="mt-5 text-lg font-semibold">
        {hasFilters ? "No matching bookings" : "No bookings yet"}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">
        {hasFilters
          ? "Try changing your search or booking status filter."
          : "Your confirmed bookings will appear here."}
      </p>

      {!hasFilters && (
        <Link
          to="/movies"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
        >
          Browse Shows
          <ChevronRight size={16} />
        </Link>
      )}
    </div>
  );
};

export default MyBookings;
