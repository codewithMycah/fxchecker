import { useState } from "react"
import ArrowIcon from "../assets/Arrow"
import History from "./History"

const tabs = ["history", "compare", "favorites", "log"];

const Details = ({ currency1, currency2 }) => {
  const [selected, setSelected] = useState("history")
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (tab) => {
    setSelected(tab)
    setIsOpen(false)
  }

  return (
    <div className="mt-10">
      <div className="relative w-full md:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full rounded-xl px-4 py-4 flex items-center justify-between bg-neutral-700 border border-neutral-400 hover:bg-neutral-400"
        >
          <span className="text-preset-3 uppercase">{selected}</span>
          <span><ArrowIcon /></span>
        </button>

        {isOpen && (
          <div className="absolute w-full z-20 mt-2 rounded-xl bg-neutral-700 border border-neutral-600 flex flex-col">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => handleSelect(tab)}
                className="mx-4 my-2 py-4 text-left text-preset-3 uppercase text-neutral-50"
              >
                <span>{tab}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:flex border-b border-neutral-600">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelected(tab)}
            className={`px-6 py-4 uppercase text-neutral-50 text-preset-3 border-b-2 ${
              selected === tab
                ? "border-lime-500"
                : "border-transparent"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {selected === "history" && (
          <History
            currency1={currency1}
            currency2={currency2}
          />
        )}

        {selected === "compare" && "Compare"}
        {selected === "favorites" && "Favorites"}
        {selected === "log" && "Log"}
      </div>
    </div>
  )
}

export default Details