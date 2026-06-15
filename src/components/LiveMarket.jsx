import { useEffect, useState } from "react"
import { getLatestExchangeRates } from "../services/api"
import BaseQuoteRate from "./BaseQuoteRate"

const LiveMarket = () => {
  const [exchangeRates, setExchangeRates] = useState([])

  useEffect(() => {
    const fetchLatestExchangeRates = async () => {
      try {
        const data = await getLatestExchangeRates("USD")
        setExchangeRates(data.slice(0,10))
      } catch (err) {
        console.error(err)
      }
    }
    fetchLatestExchangeRates()
  }, [])

  return (
    <div className="h-12 flex flex-row items-center">
      <div className="bg-lime-500 flex flex-row items-center px-4 py-4">
        <div className="w-3 h-3 rounded-full bg-neutral-900" />
        <span className="ml-2 uppercase text-neutral-900 text-nowrap text-preset-6 md:text-preset-5">Live Markets</span>
      </div>
      {/* Today's Rate and Percent Change */}
      {exchangeRates && exchangeRates.map(({base, quote, pair, rate}, index) => (
        <BaseQuoteRate key={index} base={base} quote={quote} pair={pair} rate={rate} />
      ))}
    </div>
  )
}

export default LiveMarket