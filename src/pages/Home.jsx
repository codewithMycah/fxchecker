import { useState } from "react"
import CheckRate from "../components/CheckRate"
import Details from "../components/Details"

const Home = () => {
  const [currency1, setCurrency1] = useState("USD")
  const [currency2, setCurrency2] = useState("EUR")
  const [amount, setAmount] = useState("")
  const [rate, setRate] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [conversionLog, setConversionLog] = useState([])

  const handleSwap = () => {
    setCurrency1(currency2)
    setCurrency2(currency1)
  }

  const addFavorite = (base, quote) => {
    setFavorites((prev) => {
      const already = prev.some(
        (f) => f.base === base && f.quote === quote
      )

      if (already) {
        return prev.filter(
          (f) => !(f.base === base && f.quote === quote)
        )
      }

      return [...prev, { base, quote }]
    })
  }

  const removeFavorite = (base, quote) => {
    setFavorites(prev => prev.filter(f => !(f.base === base && f.quote === quote)))
  }

  const addToLog = () => {
    const numAmount = parseFloat(amount)
    if (!numAmount || numAmount <= 0 || rate === null) return
    const entry = {
      id: Date.now(),
      timestamp: new Date(),
      amount: numAmount,
      currency1,
      currency2,
      converted: parseFloat((numAmount * rate).toFixed(4)),
    }
    setConversionLog(prev => [entry, ...prev])
  }

  const removeLogEntry = (id) => {
    setConversionLog(prev => prev.filter(e => e.id !== id))
  }

  const clearLog = () => setConversionLog([])

  const loadFavorite = (base, quote) => {
    setCurrency1(base)
    setCurrency2(quote)
  }

  return (
    <div className="mx-auto max-w-6xl px-8 py-12">
      <CheckRate
        currency1={currency1} setCurrency1={setCurrency1}
        currency2={currency2} setCurrency2={setCurrency2}
        amount={amount} setAmount={setAmount}
        rate={rate} setRate={setRate}
        onSwap={handleSwap}
        onFavorite={addFavorite}
        onLog={addToLog}
        favorites={favorites}
      />
      <Details
        currency1={currency1}
        currency2={currency2}
        amount={amount}
        favorites={favorites}
        conversionLog={conversionLog}
        addFavorite={addFavorite}
        removeFavorite={removeFavorite}
        loadFavorite={loadFavorite}
        clearLog={clearLog}
        removeLogEntry={removeLogEntry}
      />
    </div>
  )
}

export default Home
