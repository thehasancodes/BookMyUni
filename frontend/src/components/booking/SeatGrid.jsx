import Seat from "./Seat"

const premiumRows = [
  {
    row: "A",
    seats: [
      { id: "A01", status: "AVAILABLE", category: "PREMIUM", price: 250 },
      { id: "A02", status: "AVAILABLE", category: "PREMIUM", price: 250 },
      { id: "A03", status: "BOOKED", category: "PREMIUM", price: 250 },
      { id: "A04", status: "AVAILABLE", category: "PREMIUM", price: 250 },
      { id: "A05", status: "AVAILABLE", category: "PREMIUM", price: 250 },
      { id: "A06", status: "AVAILABLE", category: "PREMIUM", price: 250 },
      { id: "A07", status: "AVAILABLE", category: "PREMIUM", price: 250 },
      { id: "A08", status: "BOOKED", category: "PREMIUM", price: 250 },
    ],
  },
  {
    row: "B",
    seats: [
      { id: "B01", status: "AVAILABLE", category: "PREMIUM", price: 250 },
      { id: "B02", status: "AVAILABLE", category: "PREMIUM", price: 250 },
      { id: "B03", status: "AVAILABLE", category: "PREMIUM", price: 250 },
      { id: "B04", status: "AVAILABLE", category: "PREMIUM", price: 250 },
      { id: "B05", status: "BOOKED", category: "PREMIUM", price: 250 },
      { id: "B06", status: "AVAILABLE", category: "PREMIUM", price: 250 },
      { id: "B07", status: "AVAILABLE", category: "PREMIUM", price: 250 },
      { id: "B08", status: "AVAILABLE", category: "PREMIUM", price: 250 },
    ],
  },
]

const regularRows = [
  {
    row: "C",
    seats: [
      { id: "C01", status: "AVAILABLE", category: "REGULAR", price: 180 },
      { id: "C02", status: "AVAILABLE", category: "REGULAR", price: 180 },
      { id: "C03", status: "AVAILABLE", category: "REGULAR", price: 180 },
      { id: "C04", status: "BOOKED", category: "REGULAR", price: 180 },
      { id: "C05", status: "AVAILABLE", category: "REGULAR", price: 180 },
      { id: "C06", status: "AVAILABLE", category: "REGULAR", price: 180 },
      { id: "C07", status: "AVAILABLE", category: "REGULAR", price: 180 },
      { id: "C08", status: "AVAILABLE", category: "REGULAR", price: 180 },
    ],
  },
  {
    row: "D",
    seats: [
      { id: "D01", status: "AVAILABLE", category: "REGULAR", price: 180 },
      { id: "D02", status: "AVAILABLE", category: "REGULAR", price: 180 },
      { id: "D03", status: "BOOKED", category: "REGULAR", price: 180 },
      { id: "D04", status: "AVAILABLE", category: "REGULAR", price: 180 },
      { id: "D05", status: "AVAILABLE", category: "REGULAR", price: 180 },
      { id: "D06", status: "AVAILABLE", category: "REGULAR", price: 180 },
      { id: "D07", status: "BOOKED", category: "REGULAR", price: 180 },
      { id: "D08", status: "AVAILABLE", category: "REGULAR", price: 180 },
    ],
  },
  {
    row: "E",
    seats: [
      { id: "E01", status: "AVAILABLE", category: "REGULAR", price: 180 },
      { id: "E02", status: "AVAILABLE", category: "REGULAR", price: 180 },
      { id: "E03", status: "AVAILABLE", category: "REGULAR", price: 180 },
      { id: "E04", status: "AVAILABLE", category: "REGULAR", price: 180 },
      { id: "E05", status: "AVAILABLE", category: "REGULAR", price: 180 },
      { id: "E06", status: "BOOKED", category: "REGULAR", price: 180 },
      { id: "E07", status: "AVAILABLE", category: "REGULAR", price: 180 },
      { id: "E08", status: "AVAILABLE", category: "REGULAR", price: 180 },
    ],
  },
]

function SeatGrid({ selectedSeats, onSeatSelect }) {
  const renderRows = (rows) => {
    return rows.map((row) => (
      <div
        key={row.row}
        className="flex items-center justify-center gap-3"
      >
        <span className="w-6 text-sm font-semibold text-gray-600">
          {row.row}
        </span>

        <div className="flex gap-2">
          {row.seats.map((seat, index) => (
            <div
              key={seat.id}
              className={index === 4 ? "ml-6" : ""}
            >
              <Seat
                id={seat.id}
                status={
                  selectedSeats.some(
                    (selectedSeat) => selectedSeat.id === seat.id
                  )
                    ? "SELECTED"
                    : seat.status
                }
                onSelect={() => onSeatSelect(seat)}
              />
            </div>
          ))}
        </div>
      </div>
    ))
  }

  return (
    <div className="w-full rounded-xl bg-white p-6 shadow-sm">
      {/* Screen */}
      <div className="mb-8 text-center">
        <div className="mx-auto h-2 w-2/3 rounded-full bg-gray-300" />

        <p className="mt-2 text-sm text-gray-500">
          SCREEN
        </p>
      </div>

      {/* Premium */}
      <section className="mb-8">
        <h2 className="mb-4 text-center text-sm font-semibold text-gray-700">
          PREMIUM ₹250
        </h2>

        <div className="space-y-3">
          {renderRows(premiumRows)}
        </div>
      </section>

      {/* Regular */}
      <section>
        <h2 className="mb-4 text-center text-sm font-semibold text-gray-700">
          REGULAR ₹180
        </h2>

        <div className="space-y-3">
          {renderRows(regularRows)}
        </div>
      </section>

      {/* Legend */}
      <div className="mt-8 flex justify-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded border-2 border-green-500" />
          Available
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-green-600" />
          Selected
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-gray-300" />
          Booked
        </div>
      </div>
    </div>
  )
}

export default SeatGrid