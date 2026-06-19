import { useState } from "react"
import Skeleton from "react-loading-skeleton"
import ArrowIcon from "../assets/Arrow"

const timeRange = {
  oneDay: "1D", 
  oneWeek: "1W",
  oneMonth: "1M", 
  threeMonths: "3M", 
  oneYear: "1Y",
  fiveYears: "5Y"
}

const History = ({ currency1, currency2 }) => {
  console.log(currency1)
  console.log(currency2)
  const [isLoading, setIsLoading] = useState(false)
  const [historyDetails, setHistoryDetails] = useState({
    open: 0.8516,
    last: 0.8530,
    change: 0.0014,
    percentChange: 0.16
  })
  const [selectedTime, setSelectedTime] = useState("oneMonth")

  return (
    <>
      <div className="flex flex-col md:items-start lg:items-center lg:flex-row md:justify-between gap-5">
        {/* Open, Last, Change, % Change */}
        <div>
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {Object.entries(historyDetails).map(([detail, value]) => {
              const isTrend = detail === "change" || detail === "percentChange"
              const isPositive = value > 0
              const isNegative = value < 0

              return (
                <div key={detail}>
                  {isLoading
                  ? <Skeleton height={80} borderRadius={16} />
                  :
                    <div
                      className="w-full h-full md:max-w-36 bg-neutral-700 border border-neutral-600 rounded-xl px-5 py-5"
                    >
                      <p className="uppercase text-preset-4 text-neutral-50/70">
                        {detail === "percentChange" ? "% change" : detail}
                      </p>

                      <span
                        className={`mt-6 flex items-center gap-2 text-preset-2 ${
                          !isTrend
                            ? "text-neutral-50"
                            : isPositive
                            ? "text-green-500"
                            : isNegative
                            ? "text-red-500"
                            : "text-neutral-500"
                        }`}
                      >
                        {detail === "percentChange" && isPositive && (
                          <ArrowIcon className="rotate-180" />
                        )}

                        {detail === "percentChange" && isNegative && <ArrowIcon />}

                        {detail === "change"
                          ? `${isPositive ? "+" : ""}${value}`
                          : detail === "percentChange"
                          ? `${value}%`
                          : value}
                      </span>
                    </div>
                  }
                </div>
              )
            })}
          </div>
        </div>
        <div className="bg-neutral-700 p-0.5 rounded-md flex flex-row w-fit h-fit">
          {Object.entries(timeRange).map(([range, time]) => (
            <button key={range} className={`${range === selectedTime ? 'bg-neutral-500' : 'text-neutral-200'} rounded-lg px-4 py-4 mx-0.5 text-preset-5 text-neutral-50`} onClick={() => setSelectedTime(range)}>{time}</button>
          ))}
        </div>
      </div>
      <div className="mt-4 bg-neutral-700 px-3 py-4 rounded-lg">
        <span>{currency1}</span>
      </div>
    </>
  )
}

export default History