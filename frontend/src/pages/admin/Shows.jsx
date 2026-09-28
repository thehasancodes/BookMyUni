import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Edit3,
  Film,
  MapPin,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";

import { getAdminShows, deleteAdminShow } from "../../services/adminService";

/* ============================= */
/* ADMIN SHOWS */
/* ============================= */

const Shows = () => {
  const navigate = useNavigate();

  /* ============================= */
  /* SHOW STATE */
  /* ============================= */

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ============================= */
  /* FILTER STATE */
  /* ============================= */

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  /* ============================= */
  /* LOAD SHOWS */
  /* ============================= */

  useEffect(() => {
    const loadShows = async () => {
      try {
        setLoading(true);
        setError("");

        const adminShows = await getAdminShows();

        setShows(adminShows);
      } catch (requestError) {
        setError(requestError?.message || "Unable to load shows.");
      } finally {
        setLoading(false);
      }
    };

    loadShows();
  }, []);

  /* ============================= */
  /* FILTER SHOWS */
  /* ============================= */

  const filteredShows = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return shows.filter((show) => {
      const matchesSearch =
        !searchValue ||
        show.title.toLowerCase().includes(searchValue) ||
        show.venue.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || show.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [shows, search, statusFilter]);

  /* ============================= */
  /* STATUS STYLING */
  /* ============================= */

  const getStatusClass = (status) => {
    if (status === "Published") {
      return "border-green-500/20 bg-green-500/10 text-green-400";
    }

    if (status === "Draft") {
      return "border-gray-700 bg-gray-800 text-gray-400";
    }

    if (status === "Cancelled") {
      return "border-red-500/20 bg-red-500/10 text-red-400";
    }

    return "border-gray-700 bg-gray-800 text-gray-400";
  };

  /* ============================= */
  /* DELETE SHOW */
  /* ============================= */

  const handleDelete = async (showId) => {
    try {
      setError("");

      await deleteAdminShow(showId);

      setShows((currentShows) =>
        currentShows.filter((show) => show.id !== showId),
      );
    } catch (requestError) {
      setError(requestError?.message || "Unable to delete the show.");
    }
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
            onClick={() => navigate("/admin/dashboard")}
            className="mb-5 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium text-purple-400">Admin Panel</p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight">
                Manage Shows
              </h1>

              <p className="mt-2 text-sm text-gray-400">
                Create, manage and monitor all movie shows.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/shows/create")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
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
        {/* LOADING */}
        {/* ============================= */}

        {loading && (
          <div className="mb-6 rounded-xl border border-gray-800 bg-gray-900 px-5 py-4 text-sm text-gray-400">
            Loading shows...
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
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search shows or venues..."
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

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 lg:w-52"
            >
              <option value="All">All Shows</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </section>

        {/* ============================= */}
        {/* SHOW COUNT */}
        {/* ============================= */}

        <div className="mt-6">
          <h2 className="font-semibold">All Shows</h2>

          <p className="mt-1 text-sm text-gray-500">
            {filteredShows.length} show
            {filteredShows.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* ============================= */}
        {/* SHOW GRID */}
        {/* ============================= */}

        <section className="mt-5 grid gap-5 lg:grid-cols-2">
          {filteredShows.map((show) => {
            const availableSeats = show.totalSeats - show.bookedSeats;

            const occupancy =
              show.totalSeats > 0
                ? Math.round((show.bookedSeats / show.totalSeats) * 100)
                : 0;

            return (
              <article
                key={show.id}
                className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 transition hover:border-gray-700"
              >
                {/* CARD HEADER */}

                <div className="border-b border-gray-800 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                        <Film size={22} />
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold">{show.title}</h3>

                        <p className="mt-1 text-xs text-gray-500">{show.id}</p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusClass(
                        show.status,
                      )}`}
                    >
                      {show.status}
                    </span>
                  </div>
                </div>

                {/* SHOW INFORMATION */}

                <div className="grid gap-4 p-5 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <CalendarDays
                      size={18}
                      className="mt-0.5 shrink-0 text-gray-500"
                    />

                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="mt-1 text-sm text-gray-300">{show.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock3
                      size={18}
                      className="mt-0.5 shrink-0 text-gray-500"
                    />

                    <div>
                      <p className="text-xs text-gray-500">Time</p>
                      <p className="mt-1 text-sm text-gray-300">{show.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:col-span-2">
                    <MapPin
                      size={18}
                      className="mt-0.5 shrink-0 text-gray-500"
                    />

                    <div>
                      <p className="text-xs text-gray-500">Venue</p>
                      <p className="mt-1 text-sm text-gray-300">{show.venue}</p>
                    </div>
                  </div>
                </div>

                {/* SEATS */}

                <div className="border-t border-gray-800 px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users size={17} className="text-gray-500" />
                      <span className="text-sm text-gray-400">Seats</span>
                    </div>

                    <span className="text-sm font-medium text-gray-300">
                      {show.bookedSeats} / {show.totalSeats}
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-800">
                    <div
                      className="h-full rounded-full bg-purple-500 transition-all"
                      style={{
                        width: `${occupancy}%`,
                      }}
                    />
                  </div>

                  <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <span>{availableSeats} available</span>
                    <span>{occupancy}% booked</span>
                  </div>
                </div>

                {/* PRICE */}

                <div className="border-t border-gray-800 px-5 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Ticket Price</span>

                    <span className="text-lg font-semibold">₹{show.price}</span>
                  </div>
                </div>

                {/* ACTIONS */}

                <div className="flex gap-3 border-t border-gray-800 p-5">
                  <button
                    type="button"
                    onClick={() => navigate(`/admin/shows/${show.id}/edit`)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-gray-600 hover:bg-gray-750 hover:text-white"
                  >
                    <Edit3 size={16} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(show.id)}
                    className="flex items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </article>
            );
          })}
        </section>

        {/* ============================= */}
        {/* EMPTY STATE */}
        {/* ============================= */}

        {!loading && filteredShows.length === 0 && (
          <section className="mt-5 rounded-2xl border border-gray-800 bg-gray-900 px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-gray-500">
              <Film size={22} />
            </div>

            <h3 className="mt-4 font-semibold">No shows found</h3>

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
            Development mode: show data is currently using temporary frontend
            data. Backend integration will replace this data later.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Shows;
