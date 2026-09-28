/* ============================= */
/* MOCK ORGANIZER SHOW DATA */
/* ============================= */

const MOCK_ORGANIZER_SHOWS = [
  {
    id: "ORG-001",
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
    id: "ORG-002",
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
    id: "ORG-003",
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
/* MOCK ORGANIZER BOOKING DATA */
/* ============================= */

const MOCK_ORGANIZER_BOOKINGS = [
  {
    id: "BMU-1001",
    customer: "Rahul Sharma",
    show: "Interstellar",
    seats: 2,
    amount: 500,
    status: "Confirmed",
  },
  {
    id: "BMU-1002",
    customer: "Priya Das",
    show: "The Dark Knight",
    seats: 1,
    amount: 200,
    status: "Confirmed",
  },
  {
    id: "BMU-1003",
    customer: "Arjun Roy",
    show: "Inside Out 2",
    seats: 3,
    amount: 540,
    status: "Pending",
  },
];

/* ============================= */
/* MOCK REQUEST DELAY */
/* ============================= */

const delay = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 300);
  });

/* ============================= */
/* GET ORGANIZER SHOWS */
/* ============================= */

/*
  MOCK IMPLEMENTATION

  Later this function can be replaced with
  the real backend API request.

  The Dashboard and Shows pages will not
  need to change when the API is connected.
*/

export const getOrganizerShows = async () => {
  await delay();

  return [...MOCK_ORGANIZER_SHOWS];
};

/* ============================= */
/* GET ORGANIZER BOOKINGS */
/* ============================= */

export const getOrganizerBookings = async () => {
  await delay();

  return [...MOCK_ORGANIZER_BOOKINGS];
};

/* ============================= */
/* GET ORGANIZER DASHBOARD STATS */
/* ============================= */

export const getOrganizerDashboardStats = async () => {
  await delay();

  const publishedShows = MOCK_ORGANIZER_SHOWS.filter(
    (show) => show.status === "Published",
  );

  const totalSeats = MOCK_ORGANIZER_SHOWS.reduce(
    (total, show) => total + show.totalSeats,
    0,
  );

  const bookedSeats = MOCK_ORGANIZER_SHOWS.reduce(
    (total, show) => total + show.bookedSeats,
    0,
  );

  const totalRevenue = MOCK_ORGANIZER_BOOKINGS.filter(
    (booking) => booking.status === "Confirmed",
  ).reduce((total, booking) => total + booking.amount, 0);

  return {
    totalShows: MOCK_ORGANIZER_SHOWS.length,
    publishedShows: publishedShows.length,
    totalBookings: MOCK_ORGANIZER_BOOKINGS.length,
    bookedSeats,
    totalSeats,
    totalRevenue,
  };
};

/* ============================= */
/* DELETE ORGANIZER SHOW */
/* ============================= */

/*
  MOCK IMPLEMENTATION

  Removes the show from the temporary
  frontend data.

  Later this can be replaced with:
  DELETE /organizer/shows/:showId
*/

export const deleteOrganizerShow = async (showId) => {
  await delay();

  const showIndex = MOCK_ORGANIZER_SHOWS.findIndex(
    (show) => show.id === showId,
  );

  if (showIndex === -1) {
    throw new Error("Show not found.");
  }

  MOCK_ORGANIZER_SHOWS.splice(showIndex, 1);

  return {
    success: true,
    message: "Show deleted successfully.",
  };
};
