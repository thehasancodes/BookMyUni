import { useState } from "react"
import SeatGrid from "../components/booking/SeatGrid"
import HoldTimer from "../components/booking/HoldTimer"
import SeatCountModal from "../components/booking/SeatCountModal"

function SeatSelection() {
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedCount, setSelectedCount] = useState(null)
  const [showSeatCountModal, setShowSeatCountModal] = useState(true)

  const handleSeatCountContinue = () => {
    setSelectedSeats([])
    setShowSeatCountModal(false)
  }

  const handleSeatSelect = (seat) => {
  setSelectedSeats((currentSeats) => {
    const alreadySelected = currentSeats.some(
      (selectedSeat) => selectedSeat.id === seat.id
    )

    if (alreadySelected) {
      return currentSeats.filter(
        (selectedSeat) => selectedSeat.id !== seat.id
      )
    }

    if (currentSeats.length >= selectedCount) {
      return currentSeats
    }

    return [...currentSeats, seat]
  })
}

  const handleHoldExpire = () => {
    setSelectedSeats([])
  }

  const totalPrice = selectedSeats.reduce(
    (total, seat) => total + seat.price,
    0
  )

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              BookMyUni
            </h1>

            <p className="text-sm text-gray-500">
              Movie Night • Main Auditorium • 7:00 PM
            </p>
          </div>

          <HoldTimer
            duration={10 * 60}
            onExpire={handleHoldExpire}
          />

        </div>
      </header>

      {/* Seat Selection */}
      <main className="mx-auto max-w-6xl px-6 py-8">

        <SeatGrid
          selectedSeats={selectedSeats}
          onSeatSelect={handleSeatSelect}
        />

      </main>

      {/* Bottom Booking Bar */}
      <div className="sticky bottom-0 border-t bg-white px-6 py-4 shadow-lg">

        <div className="mx-auto flex max-w-6xl items-center justify-between">

          <div>
            <p className="text-sm text-gray-500">
              Selected seats
            </p>

            <p className="font-semibold text-gray-900">
              {selectedSeats.length > 0
                ? selectedSeats.map((seat) => seat.id).join(", ")
                : "No seats selected"}
            </p>
          </div>

          <div className="flex items-center gap-6">

            <div className="text-right">
              <p className="text-sm text-gray-500">
                Total
              </p>

              <p className="text-xl font-bold text-gray-900">
                ₹{totalPrice}
              </p>
            </div>

            <button
              type="button"
              disabled={selectedSeats.length === 0}
              className="rounded-lg bg-red-500 px-8 py-3 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Continue
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
  )
}

export default SeatSelection