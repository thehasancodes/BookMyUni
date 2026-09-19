import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import useAuth from "../hooks/useAuth";
import { MOCK_USERS } from "../dev/mockAuth";
import { ROLES } from "../utils/roles";

/* ============================= */
/* LOGIN PAGE */
/* ============================= */

const Login = () => {
  const navigate = useNavigate();
  const { mockLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ============================= */
  /* LOGIN SUBMIT */
  /* ============================= */

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      /*
      TEMPORARY DEVELOPMENT LOGIN

      This uses mock users until the backend API
      is connected.
    */

      const mockUser = MOCK_USERS.find((user) => user.email === email);

      if (!mockUser || password !== "123456") {
        setError(
          "Invalid test credentials. Use a mock account with password: 123456.",
        );
        return;
      }

      mockLogin(mockUser);

      /* ============================= */
      /* ROLE BASED REDIRECT */
      /* ============================= */

      if (mockUser.role === "ORGANIZER") {
        navigate("/organizer/dashboard");
        return;
      }

      if (mockUser.role === "ADMIN") {
        navigate("/admin/dashboard");
        return;
      }

      /* ============================= */
      /* CUSTOMER REDIRECT */
      /* ============================= */

      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-xl">
        {/* ============================= */}
        {/* HEADER */}
        {/* ============================= */}

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">BookMyUni 🎬</h1>

          <p className="mt-2 text-gray-400">Login to your account</p>
        </div>

        {/* ============================= */}
        {/* ERROR MESSAGE */}
        {/* ============================= */}

        {error && (
          <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* ============================= */}
        {/* LOGIN FORM */}
        {/* ============================= */}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* ============================= */}
          {/* EMAIL */}
          {/* ============================= */}

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
          </div>

          {/* ============================= */}
          {/* PASSWORD */}
          {/* ============================= */}

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 pr-12 text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* ============================= */}
          {/* LOGIN BUTTON */}
          {/* ============================= */}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-lg bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* ============================= */}
        {/* REGISTER LINK */}
        {/* ============================= */}

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="font-medium text-purple-400 transition hover:text-purple-300"
          >
            Register
          </button>
        </p>

        {/* ============================= */}
        {/* DEVELOPMENT TEST INFORMATION */}
        {/* ============================= */}

        <div className="mt-6 rounded-lg border border-gray-800 bg-gray-950/60 p-4">
          <p className="text-xs font-medium text-gray-400">
            Development test accounts
          </p>

          <p className="mt-2 text-xs text-gray-500">
            Customer: customer@test.com
          </p>

          <p className="text-xs text-gray-500">Organizer: organizer@test.com</p>

          <p className="text-xs text-gray-500">Admin: admin@test.com</p>

          <p className="mt-2 text-xs text-gray-500">Password: 123456</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
