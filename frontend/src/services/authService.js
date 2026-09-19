/* ============================= */
/* AUTH SERVICE */
/* ============================= */

/*
  This file handles authentication requests.

  The actual backend URL and endpoint details will be
  connected when the backend API contract is available.
*/

/* ============================= */
/* LOGIN */
/* ============================= */

export const loginUser = async (credentials) => {
  /*
    TODO:
    Send credentials to the backend login endpoint.

    Example later:
    POST /login

    credentials:
    {
      email,
      password
    }
  */

  throw new Error("Login API is not connected yet.");
};

/* ============================= */
/* REGISTER */
/* ============================= */

export const registerUser = async (userData) => {
  /*
    TODO:
    Send registration data to the backend.

    The exact endpoint and request body will be
    added after the backend API contract is provided.
  */

  throw new Error("Register API is not connected yet.");
};

/* ============================= */
/* LOGOUT */
/* ============================= */

export const logoutUser = async () => {
  /*
    TODO:
    Add backend logout/session invalidation if
    required by the backend authentication system.
  */

  return true;
};
