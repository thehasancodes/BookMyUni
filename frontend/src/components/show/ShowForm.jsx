import React from "react";
import { CalendarDays, Clock3, Film, MapPin, Save } from "lucide-react";

/* ============================= */
/* SHOW FORM */
/* ============================= */

const ShowForm = ({
  formData,
  onChange,
  onSubmit,
  loading = false,
  onCancel,
  submitText = "Create Show",
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900"
    >
      {/* ============================= */}
      {/* BASIC INFORMATION */}
      {/* ============================= */}

      <div className="border-b border-gray-800 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
            <Film size={20} />
          </div>

          <div>
            <h2 className="font-semibold">Show Information</h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter the basic details of your show.
            </p>
          </div>
        </div>

        {/* TITLE */}

        <div className="mt-6">
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Show Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={onChange}
            placeholder="Enter show title"
            required
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        {/* GENRE */}

        <div className="mt-5">
          <label
            htmlFor="genre"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Genre
          </label>

          <input
            id="genre"
            name="genre"
            type="text"
            value={formData.genre}
            onChange={onChange}
            placeholder="e.g. Sci-Fi / Adventure"
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        {/* DESCRIPTION */}

        <div className="mt-5">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="Enter a short description"
            rows={4}
            className="w-full resize-none rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
          />
        </div>
      </div>

      {/* ============================= */}
      {/* SCHEDULE */}
      {/* ============================= */}

      <div className="border-b border-gray-800 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
            <CalendarDays size={20} />
          </div>

          <div>
            <h2 className="font-semibold">Schedule</h2>

            <p className="mt-1 text-sm text-gray-500">
              Set when and where the show will take place.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {/* DATE */}

          <div>
            <label
              htmlFor="date"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Date
            </label>

            <div className="relative">
              <CalendarDays
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={onChange}
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>
          </div>

          {/* TIME */}

          <div>
            <label
              htmlFor="time"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Time
            </label>

            <div className="relative">
              <Clock3
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={onChange}
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>
          </div>
        </div>

        {/* VENUE */}

        <div className="mt-5">
          <label
            htmlFor="venue"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Venue
          </label>

          <div className="relative">
            <MapPin
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              id="venue"
              name="venue"
              type="text"
              value={formData.venue}
              onChange={onChange}
              placeholder="Enter venue"
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
        </div>
      </div>

      {/* ============================= */}
      {/* TICKET INFORMATION */}
      {/* ============================= */}

      <div className="border-b border-gray-800 p-6">
        <h2 className="font-semibold">Ticket Information</h2>

        <p className="mt-1 text-sm text-gray-500">
          Set the ticket price and available seating.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {/* PRICE */}

          <div>
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Ticket Price
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                ₹
              </span>

              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="1"
                value={formData.price}
                onChange={onChange}
                placeholder="250"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 pl-9 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>
          </div>

          {/* TOTAL SEATS */}

          <div>
            <label
              htmlFor="totalSeats"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Total Seats
            </label>

            <input
              id="totalSeats"
              name="totalSeats"
              type="number"
              min="1"
              step="1"
              value={formData.totalSeats}
              onChange={onChange}
              placeholder="120"
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
        </div>
      </div>

      {/* ============================= */}
      {/* ACTIONS */}
      {/* ============================= */}

      <div className="flex flex-col-reverse gap-3 bg-gray-950/40 p-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-700 bg-gray-800 px-5 py-3 text-sm font-medium text-gray-300 transition hover:border-gray-600 hover:bg-gray-750 hover:text-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={17} />

          {loading ? "Creating..." : submitText}
        </button>
      </div>
    </form>
  );
};

export default ShowForm;
