import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { createShow } from "../../services/showService";
import ShowForm from "../../components/show/ShowForm";

/* ============================= */
/* CREATE SHOW */
/* ============================= */

const CreateShow = () => {
  const navigate = useNavigate();

  /* ============================= */
  /* FORM STATE */
  /* ============================= */

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    venue: "",
    price: "",
    totalSeats: "",
    genre: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ============================= */
  /* HANDLE INPUT */
  /* ============================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  /* ============================= */
  /* CREATE SHOW */
  /* ============================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      await createShow(formData);

      navigate("/organizer/shows");
    } catch (requestError) {
      setError(requestError?.message || "Unable to create the show.");
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
        <div className="mx-auto max-w-4xl px-6 py-7">
          <button
            type="button"
            onClick={() => navigate("/organizer/shows")}
            className="mb-5 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Shows
          </button>

          <div>
            <p className="text-sm font-medium text-purple-400">
              Organizer Panel
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Create Show
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Create a new movie show for your audience.
            </p>
          </div>
        </div>
      </header>

      {/* ============================= */}
      {/* MAIN CONTENT */}
      {/* ============================= */}

      <main className="mx-auto max-w-4xl px-6 py-8">
        {/* ============================= */}
        {/* ERROR MESSAGE */}
        {/* ============================= */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* ============================= */}
        {/* REUSABLE SHOW FORM */}
        {/* ============================= */}

        <ShowForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
          onCancel={() => navigate("/organizer/shows")}
          submitText="Create Show"
        />

        {/* ============================= */}
        {/* DEVELOPMENT NOTICE */}
        {/* ============================= */}

        <div className="mt-6 rounded-xl border border-gray-800 bg-gray-900 px-5 py-4">
          <p className="text-xs text-gray-500">
            Development mode: the show will currently be created using temporary
            frontend data. Backend integration will replace this behavior later.
          </p>
        </div>
      </main>
    </div>
  );
};

export default CreateShow;
