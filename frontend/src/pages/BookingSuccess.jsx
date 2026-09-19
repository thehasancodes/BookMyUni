import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  MapPin,
  Ticket,
} from "lucide-react";

/* ============================= */
/* BOOKING SUCCESS PAGE */
/* ============================= */

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  /* ============================= */
  /* BOOKING DATA */
  /* ============================= */

  const bookingData = location.state;

  const show = bookingData?.show;
  const selectedSeats = bookingData?.selectedSeats || [];
  const totalPrice = bookingData?.totalPrice || 0;
  const bookingId = bookingData?.bookingId || "BKG-PENDING";

  /* ============================= */
  /* INVALID BOOKING STATE */
  /* ============================= */

  if (!show) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 px-5 text-white">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gray-800 bg-gray-900 text-gray-500">
            <Ticket size={24} />
          </div>

          <h1 className="mt-5 text-2xl font-bold">
            Booking information unavailable
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            We could not find the booking information for this page.
          </p>

          <button
            type="button"
            onClick={() => navigate("/movies")}
            className="mt-6 rounded-lg bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
          >
            Browse Shows
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
        <div className="mx-auto max-w-5xl px-5 py-5">
          <button
            type="button"
            onClick={() => navigate("/movies")}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Shows
          </button>
        </div>
      </header>

      {/* ============================= */}
      {/* MAIN CONTENT */}
      {/* ============================= */}

      <main className="mx-auto max-w-5xl px-5 py-10">
        {/* ============================= */}
        {/* SUCCESS MESSAGE */}
        {/* ============================= */}

        <section className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10 text-green-400">
            <CheckCircle2 size={32} />
          </div>

          <p className="mt-5 text-sm font-medium text-green-400">
            Booking confirmed
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Your tickets are booked!
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500">
            Your booking has been successfully created. Keep your booking ID for
            future reference.
          </p>
        </section>

        {/* ============================= */}
        {/* TICKET CARD */}
        {/* ============================= */}

        <section className="mx-auto mt-9 max-w-3xl overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-xl">
          {/* ============================= */}
          {/* TICKET HEADER */}
          {/* ============================= */}

          <div className="border-b border-gray-800 bg-linear-to-br from-purple-700 via-purple-600 to-pink-500 p-7">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              <div>
                <p className="text-sm text-purple-100">BookMyUni</p>

                <h2 className="mt-1 text-2xl font-bold text-white">
                  {show.title}
                </h2>
              </div>

              <div className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <p className="text-xs text-purple-100">Booking ID</p>

                <p className="mt-1 font-mono text-sm font-semibold text-white">
                  {bookingId}
                </p>
              </div>
            </div>
          </div>

          {/* ============================= */}
          {/* SHOW INFORMATION */}
          {/* ============================= */}

          <div className="grid gap-6 p-7 sm:grid-cols-3">
            <TicketInfo
              icon={<CalendarDays size={17} />}
              label="Date"
              value={show.date}
            />

            <TicketInfo
              icon={<Clock3 size={17} />}
              label="Time"
              value={show.time}
            />

            <TicketInfo
              icon={<MapPin size={17} />}
              label="Venue"
              value={show.venue}
            />
          </div>

          {/* ============================= */}
          {/* SEPARATOR */}
          {/* ============================= */}

          <div className="border-t border-dashed border-gray-700" />

          {/* ============================= */}
          {/* SEAT INFORMATION */}
          {/* ============================= */}

          <div className="p-7">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs text-gray-500">Selected Seats</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedSeats.map((seat) => (
                    <span
                      key={seat.id}
                      className="rounded-lg border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-sm font-semibold text-purple-300"
                    >
                      {seat.id}
                    </span>
                  ))}
                </div>
              </div>

              <div className="sm:text-right">
                <p className="text-xs text-gray-500">Total Paid</p>

                <p className="mt-1 text-2xl font-bold text-white">
                  ₹{totalPrice}
                </p>
              </div>
            </div>
          </div>

          {/* ============================= */}
          {/* ACTIONS */}
          {/* ============================= */}

          <div className="border-t border-gray-800 bg-gray-950/50 p-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                disabled
                className="inline-flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-gray-800 bg-gray-900 py-3 text-sm font-semibold text-gray-500"
              >
                <Download size={17} />
                Download Ticket
              </button>

              <Link
                to="/movies"
                className="inline-flex flex-1 items-center justify-center rounded-lg bg-purple-600 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
              >
                Browse More Shows
              </Link>
            </div>

            <p className="mt-4 text-center text-xs text-gray-600">
              Ticket download and payment verification will be connected to the
              backend later.
            </p>
          </div>
        </section>

        {/* ============================= */}
        {/* BOOKING NOTE */}
        {/* ============================= */}

        <div className="mx-auto mt-6 flex max-w-3xl items-start gap-3 rounded-xl border border-gray-800 bg-gray-900/50 p-4">
          <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-green-400" />

          <p className="text-xs leading-5 text-gray-500">
            Keep your booking ID{" "}
            <span className="font-mono text-gray-400">{bookingId}</span> for
            checking your booking history later.
          </p>
        </div>
      </main>
    </div>
  );
};

/* ============================= */
/* TICKET INFORMATION */
/* ============================= */

const TicketInfo = ({ icon, label, value }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-800 text-gray-400">
        {icon}
      </div>

      <div>
        <p className="text-xs text-gray-600">{label}</p>

        <p className="mt-1 text-sm font-medium text-gray-300">{value}</p>
      </div>
    </div>
  );
};

export default BookingSuccess;
