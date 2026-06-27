import { useState, useEffect } from "react"
import Skeleton from "react-loading-skeleton"
import { getExchangeRate, getPreviousExchangeRateByBaseQuote } from "../services/api"
import { StarIcon, ArrowRightIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid"
import ArrowIcon from "../assets/Arrow"

const FavoriteRow = ({ base, quote, loadFavorite, removeFavorite, isActive }) => {
  const [rate, setRate] = useState(null)
  const [percentChange, setPercentChange] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const fetchData = async () => {
      try {
        const [current, previous] = await Promise.all([
          getExchangeRate(base, quote),
          getPreviousExchangeRateByBaseQuote(base, quote),
        ])
        if (cancelled) return
        setRate(current.rate)
        const prevRate = previous?.[0]?.rate
        if (prevRate) {
          const pct = ((current.rate - prevRate) / prevRate) * 100
          setPercentChange(parseFloat(pct.toFixed(2)))
        }
      } catch {
        // silently fail — show "—"
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    fetchData()
    return () => { cancelled = true }
  }, [base, quote])

  return (
    <div
      className={`my-1.5 flex items-center justify-between rounded-xl p-4 border ${
        isActive ? "border-lime-500 bg-lime-500/10" : "border-neutral-500 bg-neutral-600"
      }`}
    >
      <div className="flex items-center justify-between w-full gap-4 mr-4">
        <span className="text-preset-3 text-neutral-50 flex flex-row items-center gap-2">{base} <ArrowRightIcon className="w-4 h-4 text-neutral-200" /> {quote}</span>
        <div className="flex flex-col items-end gap-3">
          {isLoading ? (
            <Skeleton width={80} height={20} />
          ) : (
            <span className="text-preset-3">{rate ?? "—"}</span>
          )}
          {!isLoading && percentChange !== null && (
            <span className={`flex items-center gap-2 text-preset-5 ${percentChange >= 0 ? "text-green-500" : "text-red-500"}`}>
              {percentChange >= 0 ? <ArrowIcon className="rotate-180" /> : <ArrowIcon />}{percentChange >= 0 ? "+" : ""}{percentChange}%
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => loadFavorite(base, quote)}
          className="border-outline border border-lime-500 p-2 rounded-md hover:cursor-pointer"
          aria-label="Load pair"
        >
          <ArrowUpTrayIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => removeFavorite(base, quote)}
          className="border-outline border border-lime-500 p-2 rounded-md hover:cursor-pointer"
          aria-label="Remove favorite"
        >
          <StarIcon className="w-4 h-4 text-lime-500" />
        </button>
      </div>
    </div>
  )
}

const Favorites = ({ favorites = [], loadFavorite, removeFavorite, currency1, currency2 }) => {
  if (favorites.length === 0) {
    return (
      <div className="py-10 text-center">
        <h3 className="text-neutral-100 text-preset-2 mb-4">No pinned pairs yet</h3>
        <span className="text-neutral-200 text-preset-4">Pin a pair to track its rate here. Tap the star <br /> icon on any conversion or comparison row.</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 py-4 bg-neutral-700 p-4 rounded-lg">
      <div className="flex items-center justify-between my-2">
        <span className="text-preset-3-med uppercase">
          Pinned Pairs
        </span>
        <span className="text-preset-5 text-neutral-100 uppercase">
          {favorites.length} Favorite{favorites.length > 1 ? "s" : ""}
        </span>
      </div>
      {favorites.map(({ base, quote }) => (
        <FavoriteRow
          key={`${base}-${quote}`}
          base={base}
          quote={quote}
          loadFavorite={loadFavorite}
          removeFavorite={removeFavorite}
          isActive={base === currency1 && quote === currency2}
        />
      ))}
    </div>
  )
}

export default Favorites
