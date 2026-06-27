import { useState } from "react"
import ArrowIcon from "../assets/Arrow"
import History from "./History"
import Compare from "./Compare"
import Favorites from "./Favorites"
import Log from "./Log"

const Details = ({
  currency1, currency2,
  amount,
  favorites,
  conversionLog,
  addFavorite, removeFavorite, loadFavorite,
  clearLog, removeLogEntry,
}) => {
  const [selected, setSelected] = useState("history")
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (tab) => {
    setSelected(tab)
    setIsOpen(false)
  }

  const tabContent = {
    history:   <History currency1={currency1} currency2={currency2} />,
    compare:   <Compare currency1={currency1} amount={amount} favorites={favorites} addFavorite={addFavorite} removeFavorite={removeFavorite} />,
    favorites: <Favorites favorites={favorites} loadFavorite={loadFavorite} removeFavorite={removeFavorite} currency1={currency1} currency2={currency2} />,
    log:       <Log conversionLog={conversionLog} clearLog={clearLog} removeLogEntry={removeLogEntry} />,
  }

  const badges = {
    favorites: favorites.length,
    log: conversionLog.length,
  }

  return (
    <div className="mt-10">
      <div className="relative w-full md:hidden">
        <div
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full rounded-xl px-4 py-4 flex items-center justify-between bg-neutral-700 border border-neutral-400 hover:bg-neutral-400"
        >
          <span className="text-preset-3 uppercase">{selected}</span>
          <span><ArrowIcon /></span>
        </div>

        {isOpen && (
          <div className="absolute w-full z-20 mt-2 p-2 rounded-xl bg-neutral-700 border border-neutral-600 flex flex-col">
            {Object.keys(tabContent).map((tab) => (
              <div
                key={tab}
                type="button"
                onClick={() => handleSelect(tab)}
                className="flex items-center justify-between m-3 text-left text-preset-3 uppercase text-neutral-50"
              >
                <span className="inline-flex items-center justify-center leading-none">{tab}</span>
                {badges[tab] !== undefined && (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-lime-500 text-badge text-preset-6">
                    {badges[tab]}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:flex border-b border-neutral-600">
        {Object.keys(tabContent).map((tab) => (
          <div
            key={tab}
            onClick={() => setSelected(tab)}
            className={`px-6 py-4 uppercase text-neutral-50 text-preset-3 border-b-2 flex items-center justify-between gap-2 ${
              selected === tab
                ? "border-lime-500"
                : "border-transparent"
            }`}
          >
            <span className="inline-flex items-center justify-center leading-none">{tab}</span>
            {badges[tab] !== undefined && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-lime-500 text-badge text-preset-6">
                {badges[tab]}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4">
        {tabContent[selected]}
      </div>
    </div>
  )
}

export default Details
