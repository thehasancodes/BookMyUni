const statusStyles = {
  AVAILABLE:
    "border-green-500 text-green-600 hover:bg-green-500 hover:text-white cursor-pointer",

  SELECTED:
    "bg-green-600 border-green-600 text-white cursor-pointer",

  BOOKED:
    "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed",

  HELD:
    "bg-orange-400 border-orange-400 text-white cursor-not-allowed",
}

function Seat({ id, status, onSelect }) {
  const isClickable =
    status === "AVAILABLE" || status === "SELECTED"

  const handleClick = () => {
    if (!isClickable) return

    onSelect(id)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!isClickable}
      title={`${id} - ${status}`}
      className={`
        h-8 w-8
        rounded-md
        border
        text-xs
        font-medium
        transition
        duration-150
        ${statusStyles[status]}
      `}
    >
      {id}
    </button>
  )
}

export default Seat