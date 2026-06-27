import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import { getRateMap } from "../services/api"
import BaseQuoteRate from "./BaseQuoteRate"

const DISPLAY_PAIRS = [
  ["EUR", "USD"],
  ["GBP", "USD"],
  ["USD", "JPY"],
  ["USD", "CHF"],
  ["AUD", "USD"],
  ["USD", "CAD"],
  ["NZD", "USD"],
  ["USD", "CNY"],
  ["EUR", "GBP"],
  ["EUR", "JPY"],
  ["GBP", "JPY"],
  ["EUR", "CHF"],
  ["AUD", "JPY"],
  ["USD", "KRW"],
  ["USD", "INR"],
  ["USD", "SGD"],
  ["USD", "BRL"],
  ["USD", "MXN"],
  ["EUR", "AUD"],
  ["GBP", "CHF"],
]

const getPreviousWeekday = () => {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  while (d.getDay() === 0 || d.getDay() === 6) {
    d.setDate(d.getDate() - 1)
  }
  return d.toISOString().split("T")[0]
}

const LiveMarket = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [pairs, setPairs] = useState([])

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const prevDate = getPreviousWeekday()
        const [todayMap, prevMap] = await Promise.all([
          getRateMap("USD"),
          getRateMap("USD", prevDate),
        ])

        const computed = DISPLAY_PAIRS
          .map(([base, quote]) => {
            if (!todayMap[base] || !todayMap[quote]) return null
            const todayRate = parseFloat((todayMap[quote] / todayMap[base]).toFixed(4))
            const prevRate =
              prevMap[base] && prevMap[quote]
                ? prevMap[quote] / prevMap[base]
                : null
            const percentChange =
              prevRate !== null
                ? parseFloat(((todayRate - prevRate) / prevRate * 100).toFixed(2))
                : null
            return { pair: `${base}/${quote}`, rate: todayRate, percentChange }
          })
          .filter(Boolean)

        setPairs(computed)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchRates()
  }, [])

  if (isLoading) {
    return (
      <div className="h-12">
        <Skeleton className="h-full w-full" />
      </div>
    )
  }

  if (pairs.length === 0) return null

  return (
    <div className="h-12 flex flex-row items-center">
      <div className="bg-lime-500 flex flex-row items-center px-4 py-4 shrink-0 z-10">
        <div className="w-3 h-3 rounded-full bg-neutral-50 dark:bg-neutral-900" />
        <span className="ml-2 uppercase text-neutral-50 dark:text-neutral-900 text-nowrap text-preset-6 md:text-preset-5">Live Markets</span>
      </div>
      <div className="overflow-hidden flex-1 h-full flex items-center">
        <div className="flex flex-row items-center animate-marquee" style={{ width: "max-content" }}>
          {pairs.map(p => (
            <BaseQuoteRate key={p.pair} pair={p.pair} rate={p.rate} percentChange={p.percentChange} />
          ))}
          {pairs.map(p => (
            <BaseQuoteRate key={`dup-${p.pair}`} pair={p.pair} rate={p.rate} percentChange={p.percentChange} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LiveMarket
