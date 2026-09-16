import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

/* ============================= */
/* REGISTER PAGE */
/* ============================= */

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ============================= */
  /* REGISTER SUBMIT */
  /* ============================= */

  const handleRegister = async (event) => {
    event.preventDefault();

    setError("");

    /* ============================= */
    /* PASSWORD VALIDATION */
    /* ============================= */

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      /*
        TEMPORARY DEVELOPMENT REGISTRATION

        Real registration will be connected to
        authService.registerUser() when the backend
        API contract is available.
      */

      console.log("Mock registration:", {
        name,
        email,
        password,
      });

      alert("Registration successful. Please login.");

      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-xl">
        {/* ============================= */}
        {/* HEADER */}
        {/* ============================= */}

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">BookMyUni 🎬</h1>

          <p className="mt-2 text-gray-400">Create your account</p>
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
        {/* REGISTER FORM */}
        {/* ============================= */}

        <form onSubmit={handleRegister} className="space-y-5">
          {/* ============================= */}
          {/* NAME */}
          {/* ============================= */}

          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Full Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your full name"
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
          </div>

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
                placeholder="Create a password"
                required
                minLength={6}
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
          {/* CONFIRM PASSWORD */}
          {/* ============================= */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Confirm Password
            </label>

            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm your password"
                required
                minLength={6}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 pr-12 text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((previous) => !previous)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-white"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* ============================= */}
          {/* REGISTER BUTTON */}
          {/* ============================= */}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-lg bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* ============================= */}
        {/* LOGIN LINK */}
        {/* ============================= */}

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-medium text-purple-400 transition hover:text-purple-300"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
