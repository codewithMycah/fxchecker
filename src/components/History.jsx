import { useState } from "react"
import Skeleton from "react-loading-skeleton"
import ArrowIcon from "../assets/Arrow"
import SampleChart from "./SampleChart"

const timeRange = {
  oneDay: "1D", 
  oneWeek: "1W",
  oneMonth: "1M", 
  threeMonths: "3M", 
  oneYear: "1Y",
  fiveYears: "5Y"
}

const History = ({ currency1, currency2 }) => {
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
          {isLoading
            ? 
              <Skeleton width={600} height={81} borderRadius={16} className="w-full" />
            :
              <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {Object.entries(historyDetails).map(([detail, value]) => {
                  const isTrend = detail === "change" || detail === "percentChange"
                  const isPositive = value > 0
                  const isNegative = value < 0

                  return (
                    <div key={detail} className="w-full h-full">
                      <div
                        className="w-full h-full bg-neutral-700 border border-neutral-600 rounded-xl p-5"
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
                    </div>
                  )
                })}
              </div>
          }
        </div>
        <div className="bg-neutral-700 p-0.5 rounded-md flex flex-row w-fit h-fit">
          {Object.entries(timeRange).map(([range, time]) => (
            <button key={range} className={`${range === selectedTime ? 'bg-neutral-500' : 'text-neutral-200'} rounded-xl px-4 py-4 mx-0.5 text-preset-5 text-neutral-50 hover:cursor-pointer`} onClick={() => setSelectedTime(range)}>{time}</button>
          ))}
        </div>
      </div>
      {isLoading
        ? 
          <Skeleton height={377} borderRadius={16} className="mt-4"/>
        : 
          <div className="mt-4 bg-neutral-700 p-5 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-preset-3-med">{currency1}/{currency2}</span>
              <span className="text-preset-5 text-neutral-50/70">0.8530 · MAY 14 16:00 CET</span>
            </div>
            <div>
              <SampleChart />
            </div>
          </div>
      }
    </>
  )
}

export default History