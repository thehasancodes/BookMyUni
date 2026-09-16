import React from "react";

const ShowFilters = ({ filters, options, onChange, onClear }) => {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
      <div className="grid gap-4 md:grid-cols-4">
        <input
          type="text"
          value={filters.search}
          onChange={(event) => onChange({ search: event.target.value })}
          placeholder="Search movie, genre or venue"
          className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
        />

        <select
          value={filters.date}
          onChange={(event) => onChange({ date: event.target.value })}
          className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-purple-500"
        >
          <option value="">All dates</option>

          {options.dates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>

        <select
          value={filters.venue}
          onChange={(event) => onChange({ venue: event.target.value })}
          className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-purple-500"
        >
          <option value="">All venues</option>

          {options.venues.map((venue) => (
            <option key={venue} value={venue}>
              {venue}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={onClear}
          className="rounded-lg border border-gray-700 px-4 py-3 font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
};

export default ShowFilters;