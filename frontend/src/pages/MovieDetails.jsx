import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { getShowById } from "../services/showService";

const MovieDetails = () => {
  const { showId } = useParams();

  const [show, setShow] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadShow = async () => {
      try {
        const selectedShow = await getShowById(showId);
        setShow(selectedShow);
      } catch (requestError) {
        setError(requestError.message);
      }
    };

    loadShow();
  }, [showId]);

  const navigate = useNavigate();

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Show unavailable</h1>
          <p className="mt-2 text-gray-400">{error}</p>

          <Link
            to="/movies"
            className="mt-5 inline-block font-medium text-purple-400 hover:text-purple-300"
          >
            Back to shows
          </Link>
        </div>
      </div>
    );
  }

  if (!show) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-gray-400">
        Loading show details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/movies"
          className="text-sm font-medium text-purple-400 transition hover:text-purple-300"
        >
          ← Back to shows
        </Link>

        <div className="mt-5 overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-xl">
          <div className="bg-linear-to-br from-purple-700 via-purple-600 to-pink-500 p-8">
            <p className="text-purple-100">{show.genre}</p>

            <h1 className="mt-2 text-4xl font-bold text-white">{show.title}</h1>
          </div>

          <div className="grid gap-8 p-8 md:grid-cols-[1fr_260px]">
            <div>
              <h2 className="text-xl font-semibold text-white">
                About this show
              </h2>

              <p className="mt-3 leading-7 text-gray-400">{show.description}</p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <Info label="Date" value={show.date} />
                <Info label="Time" value={show.time} />
                <Info label="Venue" value={show.venue} />
                <Info label="Ticket price" value={`₹${show.price}`} />
              </div>
            </div>

            <aside className="h-fit rounded-xl border border-gray-800 bg-gray-950 p-5">
              <p className="text-sm text-gray-400">Current availability</p>

              <p className="mt-2 text-3xl font-bold text-green-400">
                {show.availableSeats}
              </p>

              <p className="text-sm text-gray-500">
                of {show.totalSeats} seats available
              </p>

              {/* <button
                type="button"
                onClick={() => navigate("/seat-selection")}
                className="mt-6 w-full rounded-lg bg-purple-600/50 py-3 font-semibold text-white opacity-70"
              >
                Select Seats
              </button> */}
              <button
                type="button"
                onClick={() =>
                  navigate("/seat-selection", {
                    state: { show },
                  })
                }
                className="mt-6 w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-700"
              >
                Select Seats
              </button>

              <p className="mt-3 text-center text-xs text-gray-500">
                Quick seats are running out !!!
              </p>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 font-medium text-gray-200">{value}</p>
    </div>
  );
};

export default MovieDetails;
