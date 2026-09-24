import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ShowCard from "../components/show/ShowCard";
import useAuth from "../hooks/useAuth";
import { getActiveShows } from "../services/showService";

const Home = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadHomeShows = async () => {
      setLoading(true);
      setError("");

      try {
        const activeShows = await getActiveShows();

        // Display only the first three shows on Home.
        setShows(activeShows.slice(0, 3));
      } catch {
        setError("Unable to load active shows.");
      } finally {
        setLoading(false);
      }
    };

    loadHomeShows();
  }, []);

  return (
    <div className="min-h-[calc(100vh-128px)] bg-gray-950 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        {isAuthenticated && (
          <div className="mb-8">
            <p className="text-sm font-medium text-purple-400">
              Welcome back, {user?.name}
            </p>
          </div>
        )}

        {/* Hero Section */}
        <section className="rounded-3xl border border-gray-800 bg-gradient-to-br from-purple-800 via-purple-700 to-pink-600 p-8 shadow-xl sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-purple-100">
            Now showing
          </p>

          <h1 className="mt-3 max-w-2xl text-4xl font-bold text-white sm:text-5xl">
            Find your next movie night.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-purple-100">
            Browse active shows, filter by date or venue, and see current seat
            availability before booking.
          </p>

          <button
            type="button"
            onClick={() => navigate("/movies")}
            className="mt-8 rounded-lg bg-white px-6 py-3 font-semibold text-purple-700 transition hover:bg-purple-100"
          >
            Explore All Shows
          </button>
        </section>

        {/* Movie Cards */}
        <section className="mt-12">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-purple-400">
                ACTIVE SHOWS
              </p>

              <h2 className="mt-1 text-3xl font-bold text-white">
                Popular shows
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigate("/movies")}
              className="text-sm font-medium text-purple-400 transition hover:text-purple-300"
            >
              View all →
            </button>
          </div>

          {loading && (
            <p className="mt-8 text-center text-gray-400">
              Loading active shows...
            </p>
          )}

          {error && (
            <div className="mt-8 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">
              {error}
            </div>
          )}

          {!loading && !error && shows.length === 0 && (
            <div className="mt-8 rounded-xl border border-gray-800 bg-gray-900 p-10 text-center">
              <h3 className="text-xl font-semibold text-white">
                No active shows found
              </h3>

              <p className="mt-2 text-gray-400">
                Please check again later.
              </p>
            </div>
          )}

          {!loading && !error && shows.length > 0 && (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {shows.map((show) => (
                <ShowCard key={show.id} show={show} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;

{/* {isAuthenticated && (
          <div className="mb-8 rounded-2xl border border-purple-500/30 bg-purple-500/10 p-6">
            <p className="text-sm font-medium text-purple-400">
              Logged in successfully
            </p>

            <h1 className="mt-2 text-3xl font-bold text-white">
              Welcome back, {user?.name}
            </h1>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <Detail label="Name" value={user?.name} />
              <Detail label="Email" value={user?.email} />
              <Detail label="Role" value={user?.role} />
            </div>
          </div>
        )}

        {!isAuthenticated && (
          <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h1 className="text-3xl font-bold text-white">
              Welcome to BookMyUni
            </h1>

            <p className="mt-2 text-gray-400">
              Login to book seats and manage your bookings.
            </p>
          </div>
        )} */}