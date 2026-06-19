import { useState } from "react"
import CheckRate from "../components/CheckRate"
import Details from "../components/Details"

const Home = () => {
  const [currency1, setCurrency1] = useState("USD")
  const [currency2, setCurrency2] = useState("EUR")

  return (
    <div className="mx-auto max-w-6xl px-8 py-12">
      <CheckRate currency1={currency1} setCurrency1={setCurrency1} currency2={currency2} setCurrency2={setCurrency2} />
      <Details currency1={currency1} currency2={currency2} />
    </div>
  )
}

export default Home