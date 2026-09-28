import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Film,
  IndianRupee,
  MapPin,
  Armchair,
  Tags,
  FileText,
  Loader2,
} from "lucide-react";

import { createShow } from "../../services/showService";

/* ============================= */
/* ADMIN CREATE SHOW */
/* ============================= */

const CreateShow = () => {
  const navigate = useNavigate();

  /* ============================= */
  /* FORM STATE */
  /* ============================= */

  const [formData, setFormData] = useState({
    title: "",
    venue: "",
    date: "",
    time: "",
    price: "",
    totalSeats: "",
    genre: "",
    description: "",
  });

  /* ============================= */
  /* UI STATE */
  /* ============================= */

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ============================= */
  /* INPUT CHANGE */
  /* ============================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  /* ============================= */
  /* FORM SUBMIT */
  /* ============================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    try {
      setLoading(true);

      await createShow(formData);

      setSuccess("Show created successfully.");

      setFormData({
        title: "",
        venue: "",
        date: "",
        time: "",
        price: "",
        totalSeats: "",
        genre: "",
        description: "",
      });
    } catch (submitError) {
      setError(submitError?.message || "Unable to create the show.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* ============================= */}
      {/* HEADER */}
      {/* ============================= */}

      <header className="border-b border-gray-800 bg-gray-950">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <button
            type="button"
            onClick={() => navigate("/admin/dashboard")}
            className="mb-5 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>

          <p className="text-sm font-medium text-purple-400">Admin Panel</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Create Show
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Add a new movie show to the BookMyUni platform.
          </p>
        </div>
      </header>

      {/* ============================= */}
      {/* FORM CONTAINER */}
      {/* ============================= */}

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 sm:p-8">
          {/* ============================= */}
          {/* STATUS MESSAGES */}
          {/* ============================= */}

          {error && (
            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
              {success}
            </div>
          )}

          {/* ============================= */}
          {/* FORM */}
          {/* ============================= */}

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* ============================= */}
            {/* BASIC INFORMATION */}
            {/* ============================= */}

            <div>
              <div className="mb-5">
                <h2 className="text-lg font-semibold">Show Information</h2>

                <p className="mt-1 text-sm text-gray-400">
                  Enter the basic details for the show.
                </p>
              </div>

              <div className="space-y-5">
                {/* ============================= */}
                {/* TITLE */}
                {/* ============================= */}

                <div>
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Show Title
                  </label>

                  <div className="relative">
                    <Film
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter movie title"
                      required
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>
                </div>

                {/* ============================= */}
                {/* VENUE */}
                {/* ============================= */}

                <div>
                  <label
                    htmlFor="venue"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Venue
                  </label>

                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      id="venue"
                      name="venue"
                      type="text"
                      value={formData.venue}
                      onChange={handleChange}
                      placeholder="e.g. Main Auditorium"
                      required
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>
                </div>

                {/* ============================= */}
                {/* GENRE */}
                {/* ============================= */}

                <div>
                  <label
                    htmlFor="genre"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Genre
                  </label>

                  <div className="relative">
                    <Tags
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      id="genre"
                      name="genre"
                      type="text"
                      value={formData.genre}
                      onChange={handleChange}
                      placeholder="e.g. Action / Drama"
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ============================= */}
            {/* SCHEDULE */}
            {/* ============================= */}

            <div className="border-t border-gray-800 pt-7">
              <div className="mb-5">
                <h2 className="text-lg font-semibold">Schedule & Pricing</h2>

                <p className="mt-1 text-sm text-gray-400">
                  Set when and where the show will take place.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {/* ============================= */}
                {/* DATE */}
                {/* ============================= */}

                <div>
                  <label
                    htmlFor="date"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Date
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>
                </div>

                {/* ============================= */}
                {/* TIME */}
                {/* ============================= */}

                <div>
                  <label
                    htmlFor="time"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Time
                  </label>

                  <div className="relative">
                    <Clock3
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>
                </div>

                {/* ============================= */}
                {/* PRICE */}
                {/* ============================= */}

                <div>
                  <label
                    htmlFor="price"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Ticket Price
                  </label>

                  <div className="relative">
                    <IndianRupee
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="250"
                      required
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>
                </div>

                {/* ============================= */}
                {/* SEAT COUNT */}
                {/* ============================= */}

                <div>
                  <label
                    htmlFor="totalSeats"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Seat Count
                  </label>

                  <div className="relative">
                    <Armchair
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      id="totalSeats"
                      name="totalSeats"
                      type="number"
                      min="1"
                      value={formData.totalSeats}
                      onChange={handleChange}
                      placeholder="120"
                      required
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ============================= */}
            {/* DESCRIPTION */}
            {/* ============================= */}

            <div className="border-t border-gray-800 pt-7">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Description
              </label>

              <div className="relative">
                <FileText
                  size={18}
                  className="absolute left-3 top-3 text-gray-500"
                />

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter a short description of the show..."
                  rows={4}
                  className="w-full resize-none rounded-lg border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
            </div>

            {/* ============================= */}
            {/* ACTIONS */}
            {/* ============================= */}

            <div className="flex flex-col-reverse gap-3 border-t border-gray-800 pt-7 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/admin/dashboard")}
                className="rounded-lg border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-300 transition hover:border-gray-600 hover:bg-gray-800 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading && <Loader2 size={17} className="animate-spin" />}

                {loading ? "Creating..." : "Create Show"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateShow;
