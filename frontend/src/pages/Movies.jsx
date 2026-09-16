import React, { useEffect, useState } from "react";

import ShowCard from "../components/show/ShowCard";
import ShowFilters from "../components/show/ShowFilters";
import {
  getActiveShows,
  getFilterOptions,
} from "../services/showService";

const initialFilters = {
  search: "",
  date: "",
  venue: "",
};

const Movies = () => {
  const [shows, setShows] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const options = getFilterOptions();

  useEffect(() => {
    const loadShows = async () => {
      setLoading(true);
      setError("");

      try {
        const activeShows = await getActiveShows(filters);
        setShows(activeShows);
      } catch {
        setError("Unable to load shows. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadShows();
  }, [filters]);

  const handleFilterChange = (changes) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      ...changes,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-purple-400">
            BOOKMYUNI SHOWS
          </p>

          <h1 className="mt-2 text-4xl font-bold text-white">
            Find your next show
          </h1>

          <p className="mt-2 text-gray-400">
            Browse active shows and check current seat availability.
          </p>
        </div>

        <ShowFilters
          filters={filters}
          options={options}
          onChange={handleFilterChange}
          onClear={() => setFilters(initialFilters)}
        />

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
            <h2 className="text-xl font-semibold text-white">
              No active shows found
            </h2>

            <p className="mt-2 text-gray-400">
              Try changing or clearing your filters.
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
      </div>
    </div>
  );
};

export default Movies;