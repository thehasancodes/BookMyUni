import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  MapPin,
  Ticket,
  User,
} from "lucide-react";

import useAuth from "../hooks/useAuth";
import {
  confirmBooking,
  getBookingById,
} from "../services/bookingService";

const Checkout = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [booking, setBooking] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBooking = async () => {
      try {
        const foundBooking = await getBookingById(bookingId);

        setBooking(foundBooking);
        setName(user?.name || "");
        setEmail(user?.email || "");
      } catch (requestError) {
        setError(requestError.message);
      }
    };

    loadBooking();
  }, [bookingId, user]);

  const handleBooking = async (event) => {
    event.preventDefault();

    setError("");
    setProcessing(true);

    try {
      if (booking.status !== "HELD") {
        throw new Error(
          "This booking is no longer available. Please select seats again.",
        );
      }

      const confirmedBooking = await confirmBooking(
        booking.id,
        `BOOK-${Date.now()}`,
      );

      navigate(`/booking-success/${confirmedBooking.id}`, {
        replace: true,
        state: {
          customer: {
            name,
            email,
            phone,
          },
        },
      });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setProcessing(false);
    }
  };

  if (error && !booking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 px-5 text-white">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-400">
            <Ticket size={24} />
          </div>

          <h1 className="mt-5 text-2xl font-bold">
            Booking unavailable
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            {error}
          </p>

          <Link
            to="/movies"
            className="mt-6 inline-block rounded-lg bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
          >
            Browse Shows
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
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 bg-gray-950">
        <div className="mx-auto max-w-6xl px-5 py-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Seat Selection
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        <div>
          <p className="text-sm font-medium text-purple-400">
            Final step
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Checkout
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Review your booking and provide your details.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="rounded-2xl border border-gray-800 bg-gray-900 p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <User size={19} />
              </div>

              <div>
                <h2 className="font-semibold">
                  Customer Information
                </h2>

                <p className="text-xs text-gray-500">
                  Enter the details for this booking.
                </p>
              </div>
            </div>

            <form
              id="checkout-form"
              onSubmit={handleBooking}
              className="mt-7 space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Phone Number
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Enter your phone number"
                  required
                  className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <div className="rounded-xl border border-gray-800 bg-gray-950 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 text-gray-400">
                    <CreditCard size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-300">
                      Payment
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      Payment is not required for this mock booking.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </section>

          <aside className="h-fit rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Ticket size={19} />
              </div>

              <div>
                <h2 className="font-semibold">Booking Summary</h2>

                <p className="text-xs text-gray-500">
                  Review before confirming.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs text-gray-500">Show</p>

              <h3 className="mt-1 text-lg font-semibold">
                {booking.show.title}
              </h3>
            </div>

            <div className="mt-5 space-y-3 border-t border-gray-800 pt-5">
              <SummaryItem
                icon={<CalendarDays size={16} />}
                label="Date"
                value={booking.show.date}
              />

              <SummaryItem
                icon={<Clock3 size={16} />}
                label="Time"
                value={booking.show.time}
              />

              <SummaryItem
                icon={<MapPin size={16} />}
                label="Venue"
                value={booking.show.venue}
              />
            </div>

            <div className="mt-6 border-t border-gray-800 pt-5">
              <p className="text-xs text-gray-500">
                Selected Seats
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {booking.seats.map((seatId) => (
                  <span
                    key={seatId}
                    className="rounded-lg border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-sm font-medium text-purple-300"
                  >
                    {seatId}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-3 border-t border-gray-800 pt-5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tickets</span>

                <span className="text-gray-300">
                  {booking.seats.length} × ₹{booking.show.price}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Convenience fee
                </span>

                <span className="text-gray-300">₹0</span>
              </div>

              <div className="flex justify-between border-t border-gray-800 pt-4">
                <span className="font-medium">Total</span>

                <span className="text-xl font-bold">
                  ₹{booking.totalAmount}
                </span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              disabled={processing}
              className={`mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-3.5 text-sm font-semibold transition ${
                processing
                  ? "cursor-not-allowed bg-gray-800 text-gray-500"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
            >
              {processing ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-white" />
                  Booking...
                </>
              ) : (
                <>
                  <CheckCircle2 size={17} />
                  Confirm Booking
                </>
              )}
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
};

const SummaryItem = ({ icon, label, value }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-gray-500">{icon}</div>

      <div>
        <p className="text-xs text-gray-600">{label}</p>

        <p className="mt-1 text-sm text-gray-300">{value}</p>
      </div>
    </div>
  );
};

export default Checkout;