import { useEffect, useState } from "react"

function HoldTimer({ duration = 10 * 60, onExpire }) {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((currentTime) => currentTime - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onExpire])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="flex items-center justify-center gap-2 text-sm">
      <span className="text-gray-600">
        Seats held for
      </span>

      <span className="font-semibold text-red-500">
        {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </span>
    </div>
  )
}

export default HoldTimer