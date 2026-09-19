import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Armchair,
  Check,
  Clock3,
  MapPin,
  Ticket,
  Users,
} from "lucide-react";

/* ============================= */
/* SEAT SELECTION */
/* ============================= */

const SeatSelection = () => {
  const { showId } = useParams();
  const navigate = useNavigate();

  /* ============================= */
  /* MOCK SHOW */
  /* ============================= */

  /*
    Temporary show information.

    Later this information will come from:
    showService.js / bookingService.js
    using the showId from the URL.
  */

  const show = {
    id: showId,
    title: "Interstellar",
    date: "2026-09-20",
    time: "18:30",
    venue: "BookMyUni Cinema Hall",
    price: 250,
  };

  /* ============================= */
  /* MOCK SEATS */
  /* ============================= */

  /*
    Seat status:

    available -> user can select
    selected  -> selected by current user
    booked    -> already booked
  */

  const initialSeats = [
    { id: "A1", row: "A", number: 1, status: "booked" },
    { id: "A2", row: "A", number: 2, status: "available" },
    { id: "A3", row: "A", number: 3, status: "available" },
    { id: "A4", row: "A", number: 4, status: "booked" },
    { id: "A5", row: "A", number: 5, status: "available" },
    { id: "A6", row: "A", number: 6, status: "available" },

    { id: "B1", row: "B", number: 1, status: "available" },
    { id: "B2", row: "B", number: 2, status: "available" },
    { id: "B3", row: "B", number: 3, status: "booked" },
    { id: "B4", row: "B", number: 4, status: "available" },
    { id: "B5", row: "B", number: 5, status: "available" },
    { id: "B6", row: "B", number: 6, status: "booked" },

    { id: "C1", row: "C", number: 1, status: "available" },
    { id: "C2", row: "C", number: 2, status: "available" },
    { id: "C3", row: "C", number: 3, status: "available" },
    { id: "C4", row: "C", number: 4, status: "booked" },
    { id: "C5", row: "C", number: 5, status: "available" },
    { id: "C6", row: "C", number: 6, status: "available" },

    { id: "D1", row: "D", number: 1, status: "available" },
    { id: "D2", row: "D", number: 2, status: "booked" },
    { id: "D3", row: "D", number: 3, status: "available" },
    { id: "D4", row: "D", number: 4, status: "available" },
    { id: "D5", row: "D", number: 5, status: "available" },
    { id: "D6", row: "D", number: 6, status: "booked" },
  ];

  const [seats, setSeats] = useState(initialSeats);

  /* ============================= */
  /* SELECTED SEATS */
  /* ============================= */

  const selectedSeats = useMemo(
    () => seats.filter((seat) => seat.status === "selected"),
    [seats],
  );

  /* ============================= */
  /* TOTAL PRICE */
  /* ============================= */

  const totalPrice = selectedSeats.length * show.price;

  /* ============================= */
  /* TOGGLE SEAT */
  /* ============================= */

  const handleSeatClick = (seatId) => {
    setSeats((currentSeats) =>
      currentSeats.map((seat) => {
        if (seat.id !== seatId) {
          return seat;
        }

        if (seat.status === "booked") {
          return seat;
        }

        return {
          ...seat,
          status: seat.status === "selected" ? "available" : "selected",
        };
      }),
    );
  };

  /* ============================= */
  /* CONTINUE TO CHECKOUT */
  /* ============================= */

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      return;
    }

    /*
      Later this will send the selected seats
      to the booking API.

      Example:

      createBooking({
        showId,
        seatIds: selectedSeats.map(
          (seat) => seat.id
        ),
      });
    */

    navigate("/checkout", {
      state: {
        show,
        selectedSeats,
        totalPrice,
      },
    });
  };

  /* ============================= */
  /* GROUP SEATS BY ROW */
  /* ============================= */

  const seatRows = ["A", "B", "C", "D"];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* ============================= */}
      {/* HEADER */}
      {/* ============================= */}

      <header className="border-b border-gray-800 bg-gray-950">
        <div className="mx-auto max-w-6xl px-5 py-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back
          </button>
        </div>
      </header>

      {/* ============================= */
      /* MAIN CONTENT */
      /* ============================= */}

      <main className="mx-auto max-w-6xl px-5 py-8">
        {/* ============================= */}
        {/* SHOW INFORMATION */}
        {/* ============================= */}

        <section className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-medium text-purple-400">
                Select your seats
              </p>

              <h1 className="mt-1 text-2xl font-bold">{show.title}</h1>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-400">
                <span className="inline-flex items-center gap-2">
                  <Clock3 size={16} />
                  {show.time}
                </span>

                <span className="inline-flex items-center gap-2">
                  <MapPin size={16} />
                  {show.venue}
                </span>

                <span className="inline-flex items-center gap-2">
                  <Ticket size={16} />₹{show.price} / seat
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-950 px-4 py-3">
              <Users size={18} className="text-purple-400" />

              <div>
                <p className="text-xs text-gray-500">Selected</p>

                <p className="font-semibold">
                  {selectedSeats.length} seat
                  {selectedSeats.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================= */
        /* BOOKING AREA */
        /* ============================= */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* ============================= */}
          /* SEAT MAP */
          {/* ============================= */}
          <section className="rounded-2xl border border-gray-800 bg-gray-900 p-6 sm:p-8">
            {/* ============================= */}
            /* SCREEN */
            {/* ============================= */}
            <div className="mx-auto max-w-md">
              <div className="h-2 rounded-full bg-purple-500/70 shadow-lg shadow-purple-500/20" />

              <p className="mt-3 text-center text-xs uppercase tracking-[0.25em] text-gray-500">
                Screen
              </p>
            </div>
            {/* ============================= */}
            /* SEATS */
            {/* ============================= */}
            <div className="mx-auto mt-10 max-w-md space-y-4">
              {seatRows.map((row) => {
                const rowSeats = seats.filter((seat) => seat.row === row);

                return (
                  <div key={row} className="flex items-center gap-3">
                    <span className="w-5 text-xs font-semibold text-gray-600">
                      {row}
                    </span>

                    <div className="grid flex-1 grid-cols-6 gap-2">
                      {rowSeats.map((seat) => {
                        const isBooked = seat.status === "booked";

                        const isSelected = seat.status === "selected";

                        return (
                          <button
                            key={seat.id}
                            type="button"
                            disabled={isBooked}
                            onClick={() => handleSeatClick(seat.id)}
                            aria-label={`Seat ${seat.id}`}
                            className={`flex aspect-square items-center justify-center rounded-lg border transition ${
                              isBooked
                                ? "cursor-not-allowed border-gray-800 bg-gray-800/60 text-gray-600"
                                : isSelected
                                  ? "border-purple-400 bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                                  : "border-gray-700 bg-gray-950 text-gray-500 hover:border-purple-500/60 hover:bg-purple-500/10 hover:text-purple-300"
                            }`}
                          >
                            {isSelected ? (
                              <Check size={17} />
                            ) : (
                              <Armchair size={17} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* ============================= */
            /* LEGEND */
            /* ============================= */}
            <div className="mt-10 flex flex-wrap justify-center gap-5 border-t border-gray-800 pt-6">
              <Legend
                className="bg-gray-950 border-gray-700"
                label="Available"
              />

              <Legend
                className="bg-purple-600 border-purple-400"
                label="Selected"
              />

              <Legend className="bg-gray-800 border-gray-800" label="Booked" />
            </div>
          </section>
          {/* ============================= */}
          /* BOOKING SUMMARY */ /* ============================= */
          <aside className="h-fit rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Ticket size={19} />
              </div>

              <div>
                <h2 className="font-semibold">Booking Summary</h2>

                <p className="text-xs text-gray-500">Review your selection</p>
              </div>
            </div>
            {/* ============================= */}
            /* SELECTED SEATS */ /* ============================= */
            <div className="mt-6">
              <p className="text-xs text-gray-500">Selected Seats</p>

              {selectedSeats.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedSeats.map((seat) => (
                    <span
                      key={seat.id}
                      className="rounded-lg border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-sm font-medium text-purple-300"
                    >
                      {seat.id}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-gray-600">No seats selected</p>
              )}
            </div>
            {/* ============================= */}
            /* PRICE DETAILS */
            {/* ============================= */}
            <div className="mt-6 space-y-3 border-t border-gray-800 pt-5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tickets</span>

                <span className="text-gray-300">
                  {selectedSeats.length} × ₹{show.price}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Convenience fee</span>

                <span className="text-gray-300">₹0</span>
              </div>

              <div className="flex justify-between border-t border-gray-800 pt-4">
                <span className="font-medium">Total</span>

                <span className="text-xl font-bold">₹{totalPrice}</span>
              </div>
            </div>
            {/* ============================= */}
            /* CONTINUE BUTTON */
            {/* ============================= */}
            <button
              type="button"
              disabled={selectedSeats.length === 0}
              onClick={handleContinue}
              className={`mt-6 w-full rounded-lg py-3.5 text-sm font-semibold transition ${
                selectedSeats.length > 0
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "cursor-not-allowed bg-gray-800 text-gray-600"
              }`}
            >
              Continue to Checkout
            </button>
            <p className="mt-3 text-center text-xs leading-5 text-gray-600">
              Your selected seats will be held during the booking process.
            </p>
          </aside>
        </div>
      </main>
    </div>
  );
};

{
  /* ============================= */
  /* LEGEND */
  /* ============================= */
}

const Legend = ({ className, label }) => {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-4 w-4 rounded border ${className}`} />

      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
};

export default SeatSelection;
