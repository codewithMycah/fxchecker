import ArrowIcon from "../assets/Arrow"

const BaseQuoteRate = ({ pair, rate, percentChange }) => {
  const isPositive = percentChange !== null && percentChange >= 0
  const isNegative = percentChange !== null && percentChange < 0

  return (
    <div className="h-full bg-neutral-700 border-l-2 border-neutral-500 flex flex-row items-center gap-2 px-4 py-4 text-preset-6 md:text-preset-5">
      <span className="text-neutral-200">{pair}</span>
      <span className="text-neutral-50">{rate}</span>
      {isPositive && (
        <span className="text-green-500 flex flex-row items-center gap-1">
          <ArrowIcon className="rotate-180" />+{percentChange}%
        </span>
      )}
      {isNegative && (
        <span className="text-red-500 flex flex-row items-center gap-1">
          <ArrowIcon />{percentChange}%
        </span>
      )}
    </div>
  )
}

export default BaseQuoteRate
