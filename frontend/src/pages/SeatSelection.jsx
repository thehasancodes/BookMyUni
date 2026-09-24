import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import SeatGrid from "../components/booking/SeatGrid";
import HoldTimer from "../components/booking/HoldTimer";
import SeatCountModal from "../components/booking/SeatCountModal";
import useAuth from "../hooks/useAuth";
import { createBooking } from "../services/bookingService";

function SeatSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedCount, setSelectedCount] = useState(null);
  const [showSeatCountModal, setShowSeatCountModal] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const show = location.state?.show;

  const handleSeatCountContinue = () => {
    setSelectedSeats([]);
    setShowSeatCountModal(false);
  };

  const handleSeatSelect = (seat) => {
    setSelectedSeats((currentSeats) => {
      const alreadySelected = currentSeats.some(
        (selectedSeat) => selectedSeat.id === seat.id,
      );

      if (alreadySelected) {
        return currentSeats.filter(
          (selectedSeat) => selectedSeat.id !== seat.id,
        );
      }

      if (currentSeats.length >= selectedCount) {
        return currentSeats;
      }

      return [...currentSeats, seat];
    });
  };

  const handleHoldExpire = () => {
    setSelectedSeats([]);
    setError("Your seat-selection time expired. Please select seats again.");
  };

  const totalPrice = selectedSeats.length * show.price;

  const handleContinue = async () => {
    if (selectedSeats.length === 0) {
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const booking = await createBooking({
        customerId: user.id,
        show,
        selectedSeats,
      });

      navigate(`/checkout/${booking.id}`);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) {
    return <Navigate to="/movies" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">BookMyUni</h1>

            <p className="text-sm text-gray-500">
              {show.title} • {show.venue} • {show.time}
            </p>
          </div>

          <HoldTimer duration={10 * 60} onExpire={handleHoldExpire} />
        </div>
      </header>

      {/* Seat Selection */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        <SeatGrid
          selectedSeats={selectedSeats}
          onSeatSelect={handleSeatSelect}
        />
      </main>

      {/* Error Message */}
      {error && (
        <div className="mx-auto mb-4 max-w-6xl rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Bottom Booking Bar */}
      <div className="sticky bottom-0 border-t bg-white px-6 py-4 shadow-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Selected seats</p>

            <p className="font-semibold text-gray-900">
              {selectedSeats.length > 0
                ? selectedSeats.map((seat) => seat.id).join(", ")
                : "No seats selected"}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm text-gray-500">Total</p>

              <p className="text-xl font-bold text-gray-900">₹{totalPrice}</p>
            </div>

            <button
              type="button"
              onClick={handleContinue}
              disabled={selectedSeats.length === 0 || isSubmitting}
              className="rounded-lg bg-red-500 px-8 py-3 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {isSubmitting ? "Creating booking..." : "Continue"}
            </button>
          </div>
        </div>
      </div>

      {/* Seat Count Modal */}
      {showSeatCountModal && (
        <SeatCountModal
          selectedCount={selectedCount}
          onSelectCount={setSelectedCount}
          onContinue={handleSeatCountContinue}
        />
      )}
    </div>
  );
}

export default SeatSelection;
