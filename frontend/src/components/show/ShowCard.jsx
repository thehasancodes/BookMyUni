import React from "react";
import { Link } from "react-router-dom";

const ShowCard = ({ show }) => {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-lg transition hover:-translate-y-1 hover:border-purple-500/50">
      <div className="bg-linear-to-br from-purple-700 via-purple-600 to-pink-500 p-6">
        <p className="text-sm text-purple-100">{show.genre}</p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          {show.title}
        </h2>
      </div>

      <div className="space-y-3 p-5">
        <p className="text-sm text-gray-300">
          {show.date} • {show.time}
        </p>

        <p className="text-sm text-gray-400">{show.venue}</p>

        <div className="flex items-center justify-between pt-2">
          <p className="font-semibold text-white">₹{show.price}</p>

          <p
            className={`text-sm font-medium ${
              show.availableSeats <= 20
                ? "text-red-400"
                : "text-green-400"
            }`}
          >
            {show.availableSeats} seats left
          </p>
        </div>

        <Link
          to={`/movies/${show.id}`}
          className="mt-3 block rounded-lg bg-purple-600 px-4 py-2.5 text-center font-semibold text-white transition hover:bg-purple-700"
        >
          View Show
        </Link>
      </div>
    </article>
  );
};

export default ShowCard;