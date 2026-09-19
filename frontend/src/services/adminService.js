/* ============================= */
/* ADMIN SERVICE */
/* ============================= */

/*
  This service contains admin-related data requests.

  Currently:
  - Uses temporary mock data.

  Later:
  - Replace the mock functions with API requests.
  - Pages do not need to know where the data comes from.
*/

/* ============================= */
/* MOCK ADMIN DASHBOARD */
/* ============================= */

const MOCK_DASHBOARD = {
  totalShows: 0,
  todaysShows: 0,
  totalBookings: 0,
  totalUsers: 0,
};

/* ============================= */
/* MOCK ADMIN BOOKINGS */
/* ============================= */

const MOCK_ADMIN_BOOKINGS = [
  {
    id: "BMU-1001",
    user: "Rahul Sharma",
    email: "rahul@example.com",
    show: "Interstellar",
    venue: "BookMyUni Cinema Hall",
    date: "2026-09-20",
    time: "18:30",
    seats: ["A5", "A6"],
    amount: 500,
    status: "Confirmed",
  },
  {
    id: "BMU-1002",
    user: "Priya Das",
    email: "priya@example.com",
    show: "The Dark Knight",
    venue: "Main Auditorium",
    date: "2026-09-21",
    time: "20:00",
    seats: ["B4"],
    amount: 200,
    status: "Confirmed",
  },
  {
    id: "BMU-1003",
    user: "Arjun Roy",
    email: "arjun@example.com",
    show: "Inside Out 2",
    venue: "BookMyUni Cinema Hall",
    date: "2026-09-22",
    time: "11:00",
    seats: ["C7", "C8", "C9"],
    amount: 540,
    status: "Pending",
  },
];

/* ============================= */
/* DELAY HELPER */
/* ============================= */

const delay = (milliseconds = 300) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

/* ============================= */
/* GET ADMIN DASHBOARD */
/* ============================= */

export const getAdminDashboard = async () => {
  await delay();

  /*
    FUTURE API:

    const response = await api.get("/admin/dashboard");

    return response.data;
  */

  return MOCK_DASHBOARD;
};

/* ============================= */
/* GET ADMIN BOOKINGS */
/* ============================= */

export const getAdminBookings = async () => {
  await delay();

  /*
    FUTURE API:

    const response = await api.get("/admin/bookings");

    return response.data;
  */

  return MOCK_ADMIN_BOOKINGS;
};

/* ============================= */
/* MOCK ADMIN SHOW DATA */
/* ============================= */

const MOCK_ADMIN_SHOWS = [
  {
    id: "ADM-001",
    title: "Interstellar",
    date: "2026-09-20",
    time: "18:30",
    venue: "BookMyUni Cinema Hall",
    price: 250,
    totalSeats: 120,
    bookedSeats: 84,
    status: "Published",
  },
  {
    id: "ADM-002",
    title: "The Dark Knight",
    date: "2026-09-21",
    time: "20:00",
    venue: "Main Auditorium",
    price: 200,
    totalSeats: 100,
    bookedSeats: 68,
    status: "Published",
  },
  {
    id: "ADM-003",
    title: "Inside Out 2",
    date: "2026-09-22",
    time: "11:00",
    venue: "BookMyUni Cinema Hall",
    price: 180,
    totalSeats: 110,
    bookedSeats: 15,
    status: "Draft",
  },
];

/* ============================= */
/* GET ADMIN SHOWS */
/* ============================= */

export const getAdminShows = async () => {
  await delay();

  return [...MOCK_ADMIN_SHOWS];
};

/* ============================= */
/* DELETE ADMIN SHOW */
/* ============================= */

export const deleteAdminShow = async (showId) => {
  await delay();

  const showIndex = MOCK_ADMIN_SHOWS.findIndex((show) => show.id === showId);

  if (showIndex === -1) {
    throw new Error("Show not found.");
  }

  MOCK_ADMIN_SHOWS.splice(showIndex, 1);

  return {
    success: true,
    message: "Show deleted successfully.",
  };
};
