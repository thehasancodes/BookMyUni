import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/* ============================= */
/* AUTH HOOK */
/* ============================= */

const useAuth = () => {
  const context = useContext(AuthContext);

  /* ============================= */
  /* CONTEXT VALIDATION */
  /* ============================= */

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
};

export default useAuth;
