import { useState } from "react"
import Skeleton from "react-loading-skeleton"
import StarOutline from "../assets/icon-star.svg"
import CurrencyPicker from "./CurrencyPicker"
import { ArrowDownUp, ArrowLeftRight } from "lucide-react"

const CheckRate = ({ currency1 = "USD", setCurrency1, currency2 = "EUR", setCurrency2}) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-preset-2">CHECK THE RATE</h1>
      {isLoading
      ? 
        <Skeleton height={223} borderRadius={20} />
      :
        <div className="bg-neutral-700 rounded-xl">
          <form className="border-b-2 border-dashed border-neutral-500 dark:border-neutral-200 dark:bg-neutral-50 p-5">
            {/* Send & Receive */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 *:p-5 *:border-2 *:border-neutral-500 *:rounded-xl *:bg-neutral-500/50 dark:*:border-neutral-100 dark:*:bg-neutral-50">
              <div className="w-full">
                <p className="text-preset-4 text-neutral-100 mb-5">SEND</p>
                <div className="flex flex-row items-center justify-between gap-4">
                  <input 
                    type="number" 
                    className="no-spinner w-full bg-transparent border-0 border-b border-transparent focus:border-neutral-50 focus:outline-none focus:ring-0 text-preset-1 text-neutral-200" placeholder="0" 
                  />
                  <CurrencyPicker defaultCurrency={currency1} setDefaultCurrency={setCurrency1} />
                </div>
              </div>
              <button className="hidden md:block">
                <ArrowLeftRight />
              </button>
              <button className="md:hidden">
                <ArrowDownUp />
              </button>
              <div className="w-full">
                <p className="text-preset-4 text-neutral-100 mb-5">RECEIVE</p>
                <div className="flex flex-row items-center justify-between gap-4">
                  <input 
                    type="number" 
                    className="no-spinner w-full bg-transparent border-0 border-b border-neutral-600 focus:border-lime-500 focus:outline-none focus:ring-0 text-preset-1 text-lime-500" placeholder="0" 
                  />
                  <CurrencyPicker defaultCurrency={currency2} setDefaultCurrency={setCurrency2} />
                </div>
              </div>
            </div>
          </form>
          <div className="p-5 gap-6 flex flex-col items-center md:justify-between md:flex-row text-center md:text-left ">
            {/* rate */}
            <span className="text-preset-6 md:text-preset-5">1 USD = 0.8530 EUR</span>
            {/* buttons */}
            <div className="flex flex-row gap-2">
              <button className="button-outline flex gap-2 hover:cursor-pointer">
                <img src={StarOutline} alt="favorite" />
                Favorite
              </button>
              <button className="button-outline hover:cursor-pointer">
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