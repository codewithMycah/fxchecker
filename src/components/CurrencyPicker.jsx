import { useState } from "react"
import { currencies } from "../data/countries"
import ArrowIcon from "../assets/Arrow"
import CheckIcon from "../assets/icon-check.svg"

const popularCurrencyCodes = ["USD", "EUR", "GBP"]

const otherCurrencies = Object.values(currencies)
  .filter((currency) => !popularCurrencyCodes.includes(currency.code))
  .sort((a, b) => a.code.localeCompare(b.code))

const popularCurrencies = popularCurrencyCodes.map(
  (code) => currencies[code]
)

const groupedCurrencies = [
  {
    label: "Popular",
    count: popularCurrencies.length,
    options: popularCurrencies,
  },
  {
    label: "Other Currencies",
    count: otherCurrencies.length,
    options: otherCurrencies,
  },
]

export default function CurrencyPicker({ defaultCurrency, setDefaultCurrency }) {
  const selectedCurrency = Object.values(currencies)
    .filter((currency) => currency.code === defaultCurrency)

  const [selected, setSelected] = useState(selectedCurrency[0])
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (currency) => {
    setDefaultCurrency(currency)
    setSelected(currency)
    setIsOpen(false)
  }

  return (
    <div className="relative min-w-30">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-xl px-4 py-3 flex items-center justify-between bg-neutral-500 hover:bg-neutral-400"
      >
        <span className="flex items-center gap-3">
          <img
            src={`/flags/${selected.countryCode.toLowerCase()}.webp`}
            alt={selected.country}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-preset-4 text-neutral-50">{selected.code}</span>
        </span>

        <span><ArrowIcon /></span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full min-w-80 z-20 mt-2 w-full rounded-xl border border-neutral-400 bg-neutral-600 shadow-lg max-h-80 overflow-y-auto">
          {groupedCurrencies.map((group) => (
            <div key={group.label}>
              <div className="mx-4 my-2 py-4 text-preset-5 uppercase text-neutral-200 border-b-2 border-neutral-500 flex items-center justify-between">
                <span>{group.label} </span>
                <span>{group.count}</span>
              </div>

              {group.options.map((currency) => (
                <button
                  key={currency.code}
                  type="button"
                  onClick={() => handleSelect(currency)}
                  className="w-full px-4 py-4 text-left hover:border flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={`/flags/${currency.countryCode.toLowerCase()}.webp`}
                      alt={currency.country}
                      className="w-6 h-6 rounded-full object-cover"
                    />

                    <span className="text-preset-4 text-neutral-50">
                      {currency.code}
                    </span>

                    <span className="text-preset-5 text-neutral-200">
                      {currency.name}
                    </span>
                  </div>

                  {selected.code === currency.code && (
                    <img src={CheckIcon} alt="" />
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}