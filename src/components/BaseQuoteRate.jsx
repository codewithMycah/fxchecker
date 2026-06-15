import { useEffect, useState } from "react"
import { getPreviousExchangeRateByBaseQuote } from "../services/api"
import ArrowIcon from "../assets/Arrow"

const BaseQuoteRate = ({base, quote, pair, rate}) => {
  const [percentChange, setPercentChange] = useState(null)

  useEffect(() => {
    const previousExchangeRate = async () => {
      try {
        const yesterday = await getPreviousExchangeRateByBaseQuote(base, quote)

        const latestRate = rate
        const previousRate = yesterday[0].rate

        const percentChangeVal = ((latestRate - previousRate) / previousRate) * 100
        setPercentChange(percentChangeVal.toFixed(2))
      } catch (err) {
        console.error(err)
      }
    }
    previousExchangeRate()
  }, [base, quote, rate])

  return (
    <div className="h-full bg-neutral-700 dark:bg-neutral-50 border-l-2 border-neutral-500 dark:border-neutral-100 flex flex-row items-center gap-2 px-4 py-4 text-preset-6 md:text-preset-5">
      <span className="text-neutral-200 dark:text-neutral-500">{pair}</span>
      <span className="text-neutral-50 dark:text-neutral-900">{rate}</span>
      {percentChange && percentChange >= 0 
        ? <span className="text-green-500 flex flex-row items-center gap-1"><ArrowIcon className="rotate-180" />+{percentChange}%</span>
        : <span className="text-red-500 flex flex-row items-center gap-1"><ArrowIcon />{percentChange}%</span>
      }
    </div>
  )
}

export default BaseQuoteRate