import { useState, useEffect } from "react"
import Skeleton from "react-loading-skeleton"
import { StarIcon } from "@heroicons/react/24/solid"
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline"
import CurrencyPicker from "./CurrencyPicker"
import { ArrowDownUp, ArrowLeftRight } from "lucide-react"
import { getExchangeRate } from "../services/api"

const CheckRate = ({
  currency1 = "USD", setCurrency1,
  currency2 = "EUR", setCurrency2,
  amount, setAmount,
  rate, setRate,
  onSwap,
  onFavorite,
  onLog,
  favorites = [],
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const isFavorited = favorites.some(f => f.base === currency1 && f.quote === currency2)

  useEffect(() => {
    if (!currency1 || !currency2) return
    if (currency1 === currency2) {
      setRate(1)
      return
    }

    let cancelled = false
    const fetchRate = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await getExchangeRate(currency1, currency2)
        if (!cancelled) setRate(data.rate)
      } catch {
        if (!cancelled) setError("Failed to fetch rate")
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    fetchRate()
    return () => { cancelled = true }
  }, [currency1, currency2, setRate])

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/,/g, "")

    // Allow only numbers and one decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value)
    }
  }

  const formatInput = (value) => {
    if (!value) return ""

    const [whole, decimal] = value.split(".")

    const formattedWhole = Number(whole || 0).toLocaleString()

    if (value.endsWith(".")) {
      return `${formattedWhole}.`
    }

    return decimal !== undefined
      ? `${formattedWhole}.${decimal}`
      : formattedWhole
  }

  const receiveAmount = amount && rate
    ? parseFloat((parseFloat(amount) * rate).toFixed(2)).toLocaleString()
    : ""

  const rateDisplay = isLoading
    ? "Loading..."
    : error
    ? error
    : rate !== null
    ? `1 ${currency1} = ${rate} ${currency2}`
    : "—"

  const canLog = amount && parseFloat(amount) > 0 && rate !== null

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-preset-2">CHECK THE RATE</h1>
      {isLoading && !rate
      ?
        <Skeleton height={223} borderRadius={20} />
      :
        <div className="bg-neutral-700 rounded-xl">
          <form className="border-b-2 border-dashed border-neutral-500 p-5" onSubmit={e => e.preventDefault()}>
            {/* Send & Receive */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 *:p-5 *:border-2 *:border-neutral-500 *:rounded-xl *:bg-neutral-500/50">
              <div className="w-full">
                <p className="text-preset-4 text-neutral-100 mb-5">SEND</p>
                <div className="flex flex-row items-center justify-between gap-4">
                  <input
                    type="text"
                    value={formatInput(amount)}
                    onChange={handleAmountChange}
                    className="no-spinner w-full bg-transparent border-0 border-b border-transparent focus:border-neutral-50 focus:outline-none focus:ring-0 text-preset-1 text-neutral-200"
                    placeholder="0"
                  />
                  <CurrencyPicker defaultCurrency={currency1} setDefaultCurrency={setCurrency1} />
                </div>
              </div>
              <button type="button" className="hidden md:block" onClick={onSwap}>
                <ArrowLeftRight />
              </button>
              <button type="button" className="md:hidden" onClick={onSwap}>
                <ArrowDownUp />
              </button>
              <div className="w-full">
                <p className="text-preset-4 text-neutral-100 mb-5">RECEIVE</p>
                <div className="flex flex-row items-center justify-between gap-4">
                  <input
                    type="text"
                    readOnly
                    value={receiveAmount}
                    className="no-spinner w-full bg-transparent border-0 border-b border-neutral-600 focus:border-lime-500 focus:outline-none focus:ring-0 text-preset-1 text-receive"
                    placeholder="0"
                  />
                  <CurrencyPicker defaultCurrency={currency2} setDefaultCurrency={setCurrency2} />
                </div>
              </div>
            </div>
          </form>
          <div className="p-5 gap-6 flex flex-col items-center md:justify-between md:flex-row text-center md:text-left">
            {/* rate */}
            <span className="text-preset-6 md:text-preset-5">{rateDisplay}</span>
            {/* buttons */}
            <div className="flex flex-row gap-2">
              <button
                type="button"
                onClick={() => onFavorite(currency1, currency2)}
                className={isFavorited ? "button-filled flex gap-2 hover:cursor-pointer" : "button-outline flex gap-2 hover:cursor-pointer"}
              >
               {isFavorited ? <StarIcon className="w-4 h-4 text-neutral-900" /> : <StarIconOutline className="w-4 h-4 text-neutral-50" />}
                {isFavorited ? "Favorited" : "Favorite"}
              </button>
              <button
                type="button"
                onClick={onLog}
                disabled={!canLog}
                className="button-outline hover:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Log Conversion
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default CheckRate
