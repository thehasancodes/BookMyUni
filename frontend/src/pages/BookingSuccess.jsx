import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useParams,
} from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

import { getBookingById } from "../services/bookingService";

const BookingSuccess = () => {
  const { bookingId } = useParams();
  const location = useLocation();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  const customer = location.state?.customer;

  useEffect(() => {
    const loadBooking = async () => {
      try {
        const foundBooking = await getBookingById(bookingId);
        setBooking(foundBooking);
      } finally {
        setLoading(false);
      }
    };

    loadBooking();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-gray-400">
        Loading booking details...
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">
            Booking not found
          </h1>

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-green-500/30 bg-gray-900 p-8 text-center">
        <CheckCircle2
          size={56}
          className="mx-auto text-green-400"
        />

        <h1 className="mt-5 text-3xl font-bold text-white">
          Show booked successfully!
        </h1>

        <p className="mt-3 text-gray-400">
          Thank you{customer?.name ? `, ${customer.name}` : ""}.
        </p>

        <div className="mt-7 space-y-3 rounded-xl bg-gray-950 p-5 text-left">
          <p className="text-sm font-medium text-purple-400">
            Booking ID: {booking.id}
          </p>

          <p className="font-semibold text-white">
            {booking.show.title}
          </p>

          <p className="text-sm text-gray-400">
            {booking.show.date} • {booking.show.time}
          </p>

          <p className="text-sm text-gray-400">
            {booking.show.venue}
          </p>

          <p className="text-sm text-gray-300">
            Seats: {booking.seats.join(", ")}
          </p>

          <p className="font-semibold text-white">
            Total: ₹{booking.totalAmount}
          </p>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <Link
            to="/"
            className="rounded-lg bg-purple-600 px-4 py-2.5 font-semibold text-white transition hover:bg-purple-700"
          >
            Back to Home
          </Link>

          <Link
            to="/my-bookings"
            className="rounded-lg border border-gray-700 px-4 py-2.5 font-semibold text-gray-300 transition hover:bg-gray-800"
          >
            My Bookings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;