import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import BookingSummary from "../components/booking/BookingSummary";
import { getBookingById } from "../services/bookingService";

const BookingSuccess = () => {
  const { bookingId } = useParams();

  const [booking, setBooking] = useState(null);

  useEffect(() => {
    getBookingById(bookingId)
      .then(setBooking)
      .catch(() => setBooking(null));
  }, [bookingId]);

  if (!booking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-gray-400">
        Loading booking...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-5xl">🎉</p>

        <h1 className="mt-4 text-3xl font-bold text-white">
          Booking confirmed!
        </h1>

        <p className="mt-2 text-gray-400">
          Your seats have been booked successfully.
        </p>

        <div className="mt-8 text-left">
          <BookingSummary booking={booking} />
        </div>

        <Link
          to="/my-bookings"
          className="mt-6 inline-block rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700"
        >
          View My Bookings
        </Link>
      </div>
    </div>
  );
};

export default BookingSuccess;