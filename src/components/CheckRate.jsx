import ExchangeIcon from "../assets/icon-exchange.svg"
import StarOutline from "../assets/icon-star.svg"
import CurrencyPicker from "./CurrencyPicker"

const CheckRate = () => {

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-preset-2">CHECK THE RATE</h1>
      <div className="bg-neutral-700 rounded-2xl">
        <form className="border-b-2 border-dashed border-neutral-500 p-5">
          {/* Send & Receive */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 *:p-5 *:border-2 *:border-neutral-500 *:rounded-xl *:bg-neutral-500/50">
            <div className="w-full">
              <p className="text-preset-4 text-neutral-100 mb-5">SEND</p>
              <div className="flex flex-row items-center justify-between gap-4">
                <input type="text" className="w-full text-preset-1 text-neutral-200" placeholder="0" />
                <CurrencyPicker defaultCurrency="USD"/>
              </div>
            </div>
            <img src={ExchangeIcon} alt="Exchange" className="rotate-90 md:rotate-0" />
            <div className="w-full">
              <p className="text-preset-4 text-neutral-100 mb-5">RECEIVE</p>
              <div className="flex flex-row items-center justify-between gap-4">
                <input type="text" className="w-full text-preset-1 text-neutral-200" placeholder="0" />
                <CurrencyPicker defaultCurrency="EUR" />
              </div>
            </div>
          </div>
        </form>
        <div className="p-5 gap-6 flex flex-col items-center md:flex-row text-center md:text-left ">
          {/* rate */}
          <span className="text-preset-6 md:text-preset-5">1 USD = 0.8530 EUR</span>
          {/* buttons */}
          <div className="flex flex-row gap-2">
            <button className="button-outline flex gap-2">
              <img src={StarOutline} alt="favorite" />
              Favorite
            </button>
            <button className="button-outline">
              Log Conversion
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckRate