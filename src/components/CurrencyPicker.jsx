import { useState } from "react"
import { currencies } from "../data/countries"
import ArrowIcon from "../assets/Arrow"
import CheckIcon from "../assets/icon-check.svg"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"

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
    options: popularCurrencies,
  },
  {
    label: "Other Currencies",
    options: otherCurrencies,
  },
]

export default function CurrencyPicker({ defaultCurrency, setDefaultCurrency }) {
  const selectedCurrency = Object.values(currencies).find(
    (currency) => currency.code === defaultCurrency
  )

  const [selected, setSelected] = useState(selectedCurrency)
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const handleSelect = (currency) => {
    setDefaultCurrency(currency.code)
    setSelected(currency)
    setIsOpen(false)
    setSearchTerm("")
  }

  const filteredGroups = groupedCurrencies
    .map((group) => {
      const filteredOptions = group.options.filter((currency) => {
        const search = searchTerm.toLowerCase()

        return (
          currency.code.toLowerCase().includes(search) ||
          currency.name.toLowerCase().includes(search) ||
          currency.country.toLowerCase().includes(search)
        )
      })

      return {
        ...group,
        count: filteredOptions.length,
        options: filteredOptions,
      }
    })
    .filter((group) => group.options.length > 0)

  return (
    <div className="relative min-w-30">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-xl px-4 py-3 flex items-center justify-between bg-neutral-500 hover:bg-neutral-400 hover:cursor-pointer"
      >
        <span className="flex items-center gap-3">
          <img
            src={`/flags/${selected.countryCode.toLowerCase()}.webp`}
            alt={selected.country}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-preset-4 text-neutral-50">{selected.code}</span>
        </span>

        <span>
          <ArrowIcon />
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full min-w-80 z-20 mt-2 w-full rounded-xl border border-neutral-400 bg-neutral-600 shadow-lg max-h-80 overflow-y-auto scrollbar-hide">
          <div className="sticky top-0 z-10 bg-neutral-600 p-2">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-50 pointer-events-none" />

              <input
                type="text"
                placeholder="Search currencies..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-200 bg-transparent text-neutral-50 placeholder:text-neutral-300"
              />
            </div>
          </div>

          {filteredGroups.length === 0 ? (
            <p className="px-4 py-6 text-preset-5 text-neutral-200">
              No currency found.
            </p>
          ) : (
            filteredGroups.map((group) => (
              <div key={group.label}>
                <div className="mx-4 my-2 py-3 text-preset-5 uppercase text-neutral-200 border-b-2 border-neutral-500 flex items-center justify-between">
                  <span>{group.label}</span>
                  <span>{group.count}</span>
                </div>
                <div className="px-2">
                  {group.options.map((currency) => (
                    <button
                      key={currency.code}
                      type="button"
                      onClick={() => handleSelect(currency)}
                      className="w-full px-2 py-4 text-left hover:border hover:border-neutral-200 hover:rounded-md flex items-center justify-between"
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
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}