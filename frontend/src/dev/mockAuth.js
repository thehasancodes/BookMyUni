/* ============================= */
/* MOCK AUTH USERS */
/* ============================= */

import { ROLES } from "../utils/roles";

/* ============================= */
/* CUSTOMER */
/* ============================= */

export const MOCK_CUSTOMER = {
  id: 1,
  name: "Test Customer",
  email: "customer@test.com",
  role: ROLES.CUSTOMER,
};

/* ============================= */
/* ORGANIZER */
/* ============================= */

export const MOCK_ORGANIZER = {
  id: 2,
  name: "Test Organizer",
  email: "organizer@test.com",
  role: ROLES.ORGANIZER,
};

/* ============================= */
/* ADMIN */
/* ============================= */

export const MOCK_ADMIN = {
  id: 3,
  name: "Test Admin",
  email: "admin@test.com",
  role: ROLES.ADMIN,
};

/* ============================= */
/* MOCK USERS */
/* ============================= */

export const MOCK_USERS = [MOCK_CUSTOMER, MOCK_ORGANIZER, MOCK_ADMIN];
