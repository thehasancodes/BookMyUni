/* ============================= */
/* MOCK SHOW DATA */
/* ============================= */

const MOCK_SHOWS = [
  {
    id: "1",
    title: "Interstellar",
    date: "2026-09-20",
    time: "18:30",
    venue: "BookMyUni Cinema Hall",
    price: 250,
    availableSeats: 84,
    totalSeats: 120,
    genre: "Sci-Fi / Adventure",
    isPublished: true,
    description: "A team of explorers travels through space to save humanity.",
  },
  {
    id: "2",
    title: "The Dark Knight",
    date: "2026-09-21",
    time: "20:00",
    venue: "Main Auditorium",
    price: 200,
    availableSeats: 32,
    totalSeats: 100,
    genre: "Action / Crime",
    isPublished: true,
    description: "Batman faces Gotham City's most dangerous criminal.",
  },
  {
    id: "3",
    title: "Inside Out 2",
    date: "2026-09-22",
    time: "11:00",
    venue: "BookMyUni Cinema Hall",
    price: 180,
    availableSeats: 95,
    totalSeats: 110,
    genre: "Animation / Family",
    isPublished: true,
    description: "Riley's emotions face new challenges as she grows up.",
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
/* GET ACTIVE SHOWS */
/* ============================= */

export const getActiveShows = async (filters = {}) => {
  await delay();

  const search = filters.search?.trim().toLowerCase() || "";

  return MOCK_SHOWS.filter((show) => {
    const matchesSearch =
      !search ||
      show.title.toLowerCase().includes(search) ||
      show.venue.toLowerCase().includes(search) ||
      show.genre.toLowerCase().includes(search);

    const matchesDate = !filters.date || show.date === filters.date;
    const matchesVenue = !filters.venue || show.venue === filters.venue;

    return show.isPublished && matchesSearch && matchesDate && matchesVenue;
  });
};

/* ============================= */
/* GET SHOW BY ID */
/* ============================= */

export const getShowById = async (showId) => {
  await delay();

  const show = MOCK_SHOWS.find(
    (item) => item.id === showId && item.isPublished,
  );

  if (!show) {
    throw new Error("Show not found or unavailable.");
  }

  return show;
};

/* ============================= */
/* GET FILTER OPTIONS */
/* ============================= */

export const getFilterOptions = () => ({
  dates: [...new Set(MOCK_SHOWS.map((show) => show.date))],
  venues: [...new Set(MOCK_SHOWS.map((show) => show.venue))],
});

/* ============================= */
/* CREATE SHOW */
/* ============================= */

/*
  MOCK IMPLEMENTATION

  This allows Admin/Organizer pages to be
  tested before the backend API is available.

  Later this function can be replaced with
  the real POST /shows API request without
  changing the page component.
*/

export const createShow = async (showData) => {
  await delay();

  const totalSeats = Number(showData.totalSeats);

  if (!showData.title?.trim()) {
    throw new Error("Show title is required.");
  }

  if (!showData.venue?.trim()) {
    throw new Error("Venue is required.");
  }

  if (!showData.date) {
    throw new Error("Date is required.");
  }

  if (!showData.time) {
    throw new Error("Time is required.");
  }

  if (!Number.isFinite(totalSeats) || totalSeats <= 0) {
    throw new Error("Seat count must be greater than 0.");
  }

  const newShow = {
    id: String(Date.now()),
    title: showData.title.trim(),
    date: showData.date,
    time: showData.time,
    venue: showData.venue.trim(),
    price: Number(showData.price) || 0,
    availableSeats: totalSeats,
    totalSeats,
    genre: showData.genre?.trim() || "",
    isPublished: true,
    description: showData.description?.trim() || "",
  };

  MOCK_SHOWS.push(newShow);

  return newShow;
};
