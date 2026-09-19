import React from "react";

import BookingStatus from "./BookingStatus";

const BookingSummary = ({ booking }) => {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">Booking ID</p>

          <h2 className="mt-1 text-xl font-bold text-white">
            {booking.id}
          </h2>
        </div>

        <BookingStatus status={booking.status} />
      </div>

      <div className="mt-6 space-y-4 border-t border-gray-800 pt-5">
        <SummaryRow label="Movie" value={booking.show.title} />

        <SummaryRow
          label="Show time"
          value={`${booking.show.date} • ${booking.show.time}`}
        />

        <SummaryRow label="Venue" value={booking.show.venue} />

        <SummaryRow label="Seats" value={booking.seats.join(", ")} />

        <SummaryRow
          label="Price per seat"
          value={`₹${booking.show.price}`}
        />

        <div className="flex items-center justify-between border-t border-gray-800 pt-4">
          <p className="font-semibold text-gray-300">Total amount</p>

          <p className="text-xl font-bold text-white">
            ₹{booking.totalAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

const SummaryRow = ({ label, value }) => {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <p className="text-gray-500">{label}</p>

      <p className="text-right font-medium text-gray-200">{value}</p>
    </div>
  );
};

export default BookingSummary;