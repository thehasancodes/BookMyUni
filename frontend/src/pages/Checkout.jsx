import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import BookingSummary from "../components/booking/BookingSummary";
import { getBookingById } from "../services/bookingService";

const Checkout = () => {
  const { bookingId } = useParams();

  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBooking = async () => {
      try {
        const foundBooking = await getBookingById(bookingId);
        setBooking(foundBooking);
      } catch (requestError) {
        setError(requestError.message);
      }
    };

    loadBooking();
  }, [bookingId]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">
            Booking unavailable
          </h1>

          <p className="mt-2 text-gray-400">{error}</p>

          <Link
            to="/movies"
            className="mt-5 inline-block text-purple-400 hover:text-purple-300"
          >
            Browse shows
          </Link>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-gray-400">
        Loading checkout...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/movies"
          className="text-sm font-medium text-purple-400 hover:text-purple-300"
        >
          ← Continue browsing
        </Link>

        <div className="mt-5">
          <p className="text-sm font-semibold text-purple-400">CHECKOUT</p>

          <h1 className="mt-2 text-3xl font-bold text-white">
            Review your booking
          </h1>

          <p className="mt-2 text-gray-400">
            Your selected seats are temporarily held.
          </p>
        </div>

        <div className="mt-8">
          <BookingSummary booking={booking} />
        </div>

        {booking.status === "HELD" && (
          <div className="mt-6 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4">
            <p className="font-medium text-yellow-400">
              Your booking is currently held.
            </p>

            <p className="mt-1 text-sm text-yellow-100/70">
              Payment confirmation will be added in Phase 5.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;