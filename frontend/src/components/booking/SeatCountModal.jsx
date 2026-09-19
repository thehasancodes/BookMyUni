function SeatCountModal({
  selectedCount,
  onSelectCount,
  onContinue,
}) {
  const seatNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="px-6 pt-7 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            How many seats?
          </h2>

          <div className="my-6 text-6xl">
            🎟️
          </div>
        </div>

        {/* Seat count */}
        <div className="flex justify-center gap-2 px-6">
          {seatNumbers.map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => onSelectCount(number)}
              className={`
                flex h-10 w-10 items-center justify-center
                rounded-full text-sm font-medium
                transition
                ${
                  selectedCount === number
                    ? "bg-red-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {number}
            </button>
          ))}
        </div>

        {/* Seat categories */}
        <div className="mt-7 border-t px-6 py-5">
          <div className="grid grid-cols-2 gap-4 text-center">

            <div>
              <p className="text-xs font-medium text-gray-500">
                PREMIUM
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                ₹250
              </p>

              <p className="mt-1 text-xs text-green-600">
                AVAILABLE
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500">
                REGULAR
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                ₹180
              </p>

              <p className="mt-1 text-xs text-green-600">
                AVAILABLE
              </p>
            </div>

          </div>
        </div>

        {/* Continue */}
        <div className="bg-gray-50 p-4">
          <button
            type="button"
            disabled={!selectedCount}
            onClick={onContinue}
            className="w-full rounded-lg bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Select Seats
          </button>
        </div>

      </div>
    </div>
  )
}

export default SeatCountModal