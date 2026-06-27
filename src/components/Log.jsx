import { ArrowRightIcon } from "@heroicons/react/24/solid"
import { Trash } from "lucide-react"

const formatTimestamp = (date) => {
  const now = new Date()
  const then = new Date(date)

  const diffMs = now - then
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMinutes < 60) {
    return `${diffMinutes}M`
  }

  if (diffHours < 24) {
    return `${diffHours}H`
  }

  if (diffDays < 7) {
    return `${diffDays}D`
  }

  return then.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

const Log = ({ conversionLog = [], clearLog, removeLogEntry }) => {
  if (conversionLog.length === 0) {
    return (
      <div className="py-10 text-center">
        <h3 className="text-neutral-100 text-preset-2 mb-4">No conversions logged yet</h3>
        <span className="text-neutral-200 text-preset-4">Every conversion is recorded here automatically when you tap LOG CONVERSION. <br /> Your log is private to this session and this browser.</span>
      </div>
    )
  }

  return (
    <div className="bg-neutral-700 px-4 py-5 rounded-lg">
      <h1 className="text-preset-3-med uppercase">Conversion Log</h1>
      <div className="flex items-center justify-between mt-4 mb-4">
        <span className="text-preset-4 text-neutral-200">
          {conversionLog.length} LOGGED
        </span>
        <button
          type="button"
          onClick={clearLog}
          className="button-outline-gray text-preset-5 hover:cursor-pointer"
        >
          Clear All
        </button>
      </div>
      <div className="flex flex-col gap-4 rounded-md">
        {conversionLog.map(({ id, timestamp, amount, currency1, currency2, converted }) => (
          <div
            key={id}
            className="flex items-center justify-between bg-neutral-600 border border-neutral-500 rounded-xl px-5 py-3"
          >
            <div className="flex items-center justify-between w-full mr-4">
              <div className="flex flex-col gap-3">
                <p className="text-preset-4 text-neutral-200">{formatTimestamp(timestamp)}</p>
                <span className="text-preset-3 text-neutral-50 flex flex-row items-center gap-2">   
                  {currency1} 
                  <ArrowRightIcon className="w-4 h-4 text-neutral-200" /> 
                  {currency2}
                </span>
              </div>
              <div className="flex flex-col items-end gap-4 text-preset-3 ">
                <span className="text-neutral-50">
                  {amount}
                </span>
                <span className="text-lime-500">
                  {converted}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeLogEntry(id)}
              className="border-outline border border-neutral-500 p-2 rounded-md hover:cursor-pointer"
              aria-label="Delete entry"
            >
              <Trash width={15} height={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Log
