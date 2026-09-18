import React from "react";

const statusStyles = {
  HELD: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
  CONFIRMED: "border-green-500/30 bg-green-500/10 text-green-400",
  CANCELLED: "border-red-500/30 bg-red-500/10 text-red-400",
  EXPIRED: "border-gray-600 bg-gray-800 text-gray-400",
};

const BookingStatus = ({ status }) => {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
        statusStyles[status] || statusStyles.EXPIRED
      }`}
    >
      {status}
    </span>
  );
};

export default BookingStatus;