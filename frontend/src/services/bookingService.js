const STORAGE_KEY = "bookmyuni_bookings";
const HOLD_DURATION_MINUTES = 10;

const readBookings = () => {
  const savedBookings = localStorage.getItem(STORAGE_KEY);

  return savedBookings ? JSON.parse(savedBookings) : [];
};

const saveBookings = (bookings) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
};

const expireHeldBookings = () => {
  const now = new Date();

  const updatedBookings = readBookings().map((booking) => {
    const isExpired =
      booking.status === "HELD" &&
      new Date(booking.expiresAt) <= now;

    return isExpired
      ? {
          ...booking,
          status: "EXPIRED",
        }
      : booking;
  });

  saveBookings(updatedBookings);

  return updatedBookings;
};

export const createBooking = async ({ customerId, show, selectedSeats }) => {
  if (!customerId || !show || selectedSeats.length === 0) {
    throw new Error("Show and at least one seat are required.");
  }

  const totalAmount = selectedSeats.length * show.price;

  const booking = {
    id: `BK-${Date.now()}`,
    customerId,
    show: {
      id: show.id,
      title: show.title,
      date: show.date,
      time: show.time,
      venue: show.venue,
      price: show.price,
    },
    seats: selectedSeats,
    totalAmount,
    status: "HELD",
    createdAt: new Date().toISOString(),
    expiresAt: new Date(
      Date.now() + HOLD_DURATION_MINUTES * 60 * 1000,
    ).toISOString(),
  };

  const bookings = expireHeldBookings();

  saveBookings([...bookings, booking]);

  return booking;
};

export const getBookingById = async (bookingId) => {
  const bookings = expireHeldBookings();

  const booking = bookings.find((item) => item.id === bookingId);

  if (!booking) {
    throw new Error("Booking not found.");
  }

  return booking;
};

export const getMyBookings = async (customerId) => {
  const bookings = expireHeldBookings();

  return bookings
    .filter((booking) => String(booking.customerId) === String(customerId))
    .sort(
      (firstBooking, secondBooking) =>
        new Date(secondBooking.createdAt) -
        new Date(firstBooking.createdAt),
    );
};

export const cancelBooking = async (bookingId) => {
  const bookings = expireHeldBookings();

  const booking = bookings.find((item) => item.id === bookingId);

  if (!booking) {
    throw new Error("Booking not found.");
  }

  if (booking.status !== "CONFIRMED") {
    throw new Error("Only confirmed bookings can be cancelled.");
  }

  const updatedBookings = bookings.map((item) =>
    item.id === bookingId
      ? {
          ...item,
          status: "CANCELLED",
        }
      : item,
  );

  saveBookings(updatedBookings);

  return updatedBookings.find((item) => item.id === bookingId);
};

/*
  Phase 5 will use this after a successful mock payment.
*/
export const confirmBooking = async (bookingId, paymentReference) => {
  const bookings = expireHeldBookings();

  const updatedBookings = bookings.map((booking) =>
    booking.id === bookingId
      ? {
          ...booking,
          status: "CONFIRMED",
          paymentReference,
        }
      : booking,
  );

  saveBookings(updatedBookings);

  return updatedBookings.find((booking) => booking.id === bookingId);
};