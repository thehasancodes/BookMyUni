import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BookingStatus from "../components/booking/BookingStatus";
import useAuth from "../hooks/useAuth";
import {
  cancelBooking,
  getMyBookings,
} from "../services/bookingService";

const MyBookings = () => {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    setLoading(true);
    setError("");

    try {
      const customerBookings = await getMyBookings(user.id);
      setBookings(customerBookings);
    } catch {
      setError("Unable to load your bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      loadBookings();
    }
  }, [user?.id]);

  const handleCancel = async (bookingId) => {
    const shouldCancel = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!shouldCancel) {
      return;
    }

    try {
      await cancelBooking(bookingId);
      loadBookings();
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold text-purple-400">MY BOOKINGS</p>

        <h1 className="mt-2 text-3xl font-bold text-white">
          Your booking history
        </h1>

        {error && (
          <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">
            {error}
          </div>
        )}

        {loading && (
          <p className="mt-8 text-gray-400">Loading your bookings...</p>
        )}

        {!loading && bookings.length === 0 && (
          <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center">
            <h2 className="text-xl font-semibold text-white">
              No bookings yet
            </h2>

            <Link
              to="/movies"
              className="mt-4 inline-block font-medium text-purple-400 hover:text-purple-300"
            >
              Browse active shows
            </Link>
          </div>
        )}

        <div className="mt-8 space-y-4">
          {bookings.map((booking) => (
            <article
              key={booking.id}
              className="rounded-2xl border border-gray-800 bg-gray-900 p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {booking.show.title}
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    {booking.show.date} • {booking.show.time} •{" "}
                    {booking.show.venue}
                  </p>

                  <p className="mt-3 text-sm text-gray-300">
                    Seats: {booking.seats.join(", ")}
                  </p>

                  <p className="mt-1 font-semibold text-white">
                    ₹{booking.totalAmount}
                  </p>
                </div>

                <div className="flex items-end gap-3 sm:flex-col">
                  <BookingStatus status={booking.status} />

                  {booking.status === "CONFIRMED" && (
                    <button
                      type="button"
                      onClick={() => handleCancel(booking.id)}
                      className="rounded-lg border border-red-500/40 px-3 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
                    >
                      Cancel booking
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;