import React from "react";
import useAuth from "../hooks/useAuth";

/* ============================= */
/* MOCK DASHBOARD */
/* ============================= */

const MockDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-gray-800 bg-gray-900 p-8 text-white shadow-xl">
        {/* ============================= */}
        {/* HEADER */}
        {/* ============================= */}

        <div className="mb-8">
          <p className="text-sm text-purple-400">
            Development Authentication Test
          </p>

          <h1 className="mt-2 text-3xl font-bold">Welcome, {user?.name}</h1>
        </div>

        {/* ============================= */}
        {/* USER INFORMATION */}
        {/* ============================= */}

        <div className="space-y-3 rounded-xl border border-gray-800 bg-gray-950 p-5">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-gray-200">{user?.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-gray-200">{user?.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="font-semibold text-purple-400">{user?.role}</p>
          </div>
        </div>

        {/* ============================= */}
        {/* LOGOUT */}
        {/* ============================= */}

        <button
          type="button"
          onClick={logout}
          className="mt-6 w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MockDashboard;
