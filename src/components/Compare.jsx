import { useState, useEffect } from "react"
import Skeleton from "react-loading-skeleton"
import { StarIcon } from "@heroicons/react/24/solid"
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline"
import { getLatestExchangeRates } from "../services/api"
import { currencies } from "../data/countries"

const Compare = ({ currency1, amount, favorites = [], addFavorite, removeFavorite }) => {
  const [rates, setRates] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const numAmount = parseFloat(amount)
  const hasAmount = numAmount > 0

  useEffect(() => {
    if (!hasAmount || !currency1) {
      setRates([])
      return
    }

    let cancelled = false
    const fetchRates = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await getLatestExchangeRates(currency1)
        if (cancelled) return
        const forward = data.filter(item => item.base === currency1)
        setRates(forward)
      } catch {
        if (!cancelled) setError("Failed to load rates")
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    fetchRates()
    return () => { cancelled = true }
  }, [currency1, amount])

  if (!hasAmount) {
    return (
      <div className="py-10 text-center">
        <h3 className="text-neutral-100 text-preset-2 mb-4">No comparison available</h3>
        <span className="text-neutral-200 text-preset-4">Enter an amount in SEND above to see what your <br /> money is worth in other currencies.</span>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 py-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} height={56} borderRadius={12} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-10 text-center">
        <span className="text-red-400 text-preset-4">{error}</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 bg-neutral-700 p-4 rounded-lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between mt-4 mb-4 uppercase text-preset-4 text-neutral-200">
        <span className="flex items-center gap-2">
          Multi-Currency 
          <span className="text-preset-3-med text-neutral-50">
            {amount} from {currency1}
          </span>
        </span>
        <span>{rates.length} pairs</span>
      </div>
      {rates.map(({ quote, rate }) => {
        const currencyData = currencies[quote]
        if (!currencyData) return null

        const converted = parseFloat((numAmount * rate).toFixed(2))
        const isFavorited = favorites.some(f => f.base === currency1 && f.quote === quote)

        return (
          <div
            key={quote}
            className="flex items-center justify-between bg-neutral-600 border border-neutral-500 rounded-xl px-4 py-3"
          >
            <div className="flex items-center gap-4">
              <img
                src={`/flags/${currencyData.countryCode.toLowerCase()}.webp`}
                alt={currencyData.country}
                className="w-6 h-4 object-cover rounded-sm"
              />
              <div className="flex flex-col gap-4">
                <span className="text-preset-4 text-neutral-50">{quote}</span>
                <span className="text-preset-5 text-neutral-200">{currencyData.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-4">
                <span className="text-preset-3">
                  {converted.toLocaleString()}
                </span>
                <span className="text-preset-6 text-right text-neutral-200">
                  @ {rate.toLocaleString()}
                </span>
              </div>
              <button
                type="button"
                onClick={() => isFavorited ? removeFavorite(currency1, quote) : addFavorite(currency1, quote)}
                className="hover:cursor-pointer"
                aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorited 
                  ? 
                    <div className="p-2 rounded-md border border-lime-500">
                      <StarIcon className="w-4 h-4 text-lime-500" />
                    </div> 
                  : 
                    <div className="p-2 rounded-md border border-neutral-500">
                      <StarIconOutline className="w-4 h-4 text-neutral-50" />
                    </div>
                }
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Compare
