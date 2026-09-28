import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import BookingSummary from "../components/booking/BookingSummary";
import {
  confirmBooking,
  getBookingById,
} from "../services/bookingService";

const Checkout = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

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

  const handleBook = async () => {
    setError("");
    setIsBooking(true);

    try {
      const updatedBooking = await confirmBooking(
        booking.id,
        `BOOK-${Date.now()}`,
      );

      setBooking(updatedBooking);
      setIsBooked(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsBooking(false);
    }
  };

  if (error && !booking) {
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

  if (isBooked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
        <div className="w-full max-w-md rounded-2xl border border-green-500/30 bg-green-500/10 p-8 text-center">

          <h1 className="mt-4 text-3xl font-bold text-white">
            Show booked successfully!
          </h1>

          <p className="mt-3 text-gray-300">
            Your seats for {booking.show.title} have been booked.
          </p>

          <p className="mt-2 text-sm text-green-400">
            Redirecting to Home...
          </p>
        </div>
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
          <p className="text-sm font-semibold text-purple-400">
            CHECKOUT
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white">
            Review your booking
          </h1>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">
            {error}
          </div>
        )}

        <div className="mt-8">
          <BookingSummary booking={booking} />
        </div>

        <button
          type="button"
          onClick={handleBook}
          disabled={isBooking}
          className="mt-6 w-full rounded-lg bg-purple-600 px-4 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isBooking ? "Booking your show..." : "Book Show"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;