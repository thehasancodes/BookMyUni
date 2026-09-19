import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Film,
  MapPin,
  Ticket,
  Users,
} from "lucide-react";

import { getShowById } from "../services/showService";

/* ============================= */
/* MOVIE DETAILS */
/* ============================= */

const MovieDetails = () => {
  const { showId } = useParams();
  const navigate = useNavigate();

  /* ============================= */
  /* STATE */
  /* ============================= */

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ============================= */
  /* LOAD SHOW */
  /* ============================= */

  useEffect(() => {
    const loadShow = async () => {
      setLoading(true);
      setError("");

      try {
        const selectedShow = await getShowById(showId);
        setShow(selectedShow);
      } catch (requestError) {
        setError(requestError?.message || "Unable to load show details.");
      } finally {
        setLoading(false);
      }
    };

    loadShow();
  }, [showId]);

  /* ============================= */
  /* LOADING STATE */
  /* ============================= */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gray-800 bg-gray-900">
            <Film size={22} className="animate-pulse text-purple-400" />
          </div>

          <p className="mt-4 text-sm text-gray-400">Loading show details...</p>
        </div>
      </div>
    );
  }

  /* ============================= */
  /* ERROR STATE */
  /* ============================= */

  if (error || !show) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 text-red-400">
            <Film size={24} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-white">
            Show unavailable
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-400">
            {error || "The requested show could not be found."}
          </p>

          <Link
            to="/movies"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
          >
            <ArrowLeft size={17} />
            Back to Shows
          </Link>
        </div>
      </div>
    );
  }

  /* ============================= */
  /* SEAT AVAILABILITY */
  /* ============================= */

  const availabilityPercentage =
    show.totalSeats > 0
      ? Math.round((show.availableSeats / show.totalSeats) * 100)
      : 0;

  const hasSeats = show.availableSeats > 0;

  /* ============================= */
  /* SELECT SEATS */
  /* ============================= */

  const handleSelectSeats = () => {
    /*
      Seat selection belongs to the booking flow.

      The show ID is passed through the URL so the
      SeatSelection page can request the correct show.
    */

    navigate(`/shows/${show.id}/seats`);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* ============================= */}
      {/* TOP BAR */}
      {/* ============================= */}

      <header className="border-b border-gray-800 bg-gray-950">
        <div className="mx-auto max-w-6xl px-5 py-5">
          <Link
            to="/movies"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Shows
          </Link>
        </div>
      </header>

      {/* ============================= */}
      {/* MAIN */}
      {/* ============================= */}

      <main className="mx-auto max-w-6xl px-5 py-8">
        {/* ============================= */}
        {/* HERO */}
        {/* ============================= */}

        <section className="relative overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-br from-purple-900/60 via-gray-900 to-gray-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.22),transparent_40%)]" />

          <div className="relative p-7 sm:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-purple-400/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
                {show.genre}
              </span>

              {show.isPublished && (
                <span className="rounded-full border border-green-400/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                  Available
                </span>
              )}
            </div>

            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              {show.title}
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
              {show.description}
            </p>
          </div>
        </section>

        {/* ============================= */}
        {/* DETAILS GRID */}
        {/* ============================= */}

        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* ============================= */}
          {/* SHOW INFORMATION */}
          {/* ============================= */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Film size={19} />
              </div>

              <div>
                <h2 className="font-semibold">Show Information</h2>

                <p className="text-xs text-gray-500">
                  Everything you need before booking.
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              {/* ============================= */}
              {/* DATE */}
              {/* ============================= */}

              <Info
                icon={<CalendarDays size={18} />}
                label="Date"
                value={show.date}
              />

              {/* ============================= */}
              {/* TIME */}
              {/* ============================= */}

              <Info
                icon={<Clock3 size={18} />}
                label="Show Time"
                value={show.time}
              />

              {/* ============================= */}
              {/* VENUE */}
              {/* ============================= */}

              <Info
                icon={<MapPin size={18} />}
                label="Venue"
                value={show.venue}
              />

              {/* ============================= */}
              {/* PRICE */}
              {/* ============================= */}

              <Info
                icon={<Ticket size={18} />}
                label="Ticket Price"
                value={`₹${show.price}`}
              />
            </div>
          </div>

          {/* ============================= */}
          {/* BOOKING CARD */}
          {/* ============================= */}

          <aside className="h-fit rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Seat Availability</p>

                <p className="mt-2 text-3xl font-bold">{show.availableSeats}</p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                <Users size={21} />
              </div>
            </div>

            <p className="mt-1 text-xs text-gray-500">
              of {show.totalSeats} total seats available
            </p>

            {/* ============================= */}
            {/* AVAILABILITY BAR */}
            {/* ============================= */}

            <div className="mt-5">
              <div className="h-2 overflow-hidden rounded-full bg-gray-800">
                <div
                  className="h-full rounded-full bg-green-500 transition-all"
                  style={{
                    width: `${availabilityPercentage}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-right text-xs text-gray-500">
                {availabilityPercentage}% available
              </p>
            </div>

            {/* ============================= */}
            {/* PRICE */}
            {/* ============================= */}

            <div className="mt-6 flex items-center justify-between border-t border-gray-800 pt-5">
              <span className="text-sm text-gray-500">Price per ticket</span>

              <span className="text-xl font-bold">₹{show.price}</span>
            </div>

            {/* ============================= */}
            {/* SELECT SEATS */}
            {/* ============================= */}

            <button
              type="button"
              disabled={!hasSeats}
              onClick={handleSelectSeats}
              className={`mt-6 w-full rounded-lg py-3.5 text-sm font-semibold transition ${
                hasSeats
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "cursor-not-allowed bg-gray-800 text-gray-500"
              }`}
            >
              {hasSeats ? "Select Seats" : "Sold Out"}
            </button>

            <p className="mt-3 text-center text-xs leading-5 text-gray-500">
              Choose your seats and continue to checkout.
            </p>
          </aside>
        </section>
      </main>
    </div>
  );
};

/* ============================= */
/* INFORMATION ITEM */
/* ============================= */

const Info = ({ icon, label, value }) => {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-gray-800 bg-gray-950/50 p-4">
      <div className="mt-0.5 text-gray-500">{icon}</div>

      <div className="min-w-0">
        <p className="text-xs text-gray-500">{label}</p>

        <p className="mt-1 break-words text-sm font-medium text-gray-200">
          {value}
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;
