import ExchangeIcon from "../assets/icon-exchange.svg"
import ArrowIcon from "../assets/Arrow"

const CheckRate = () => {

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-preset-2">CHECK THE RATE</h1>
      <div className="bg-neutral-700 rounded-2xl p-5">
        <form>
          {/* Send & Receive */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 *:p-5 *:border-2 *:border-neutral-500 *:rounded-xl">
            <div className="w-full ">
              <p className="text-preset-4 text-neutral-100 mb-5">SEND</p>
              <div className="flex flex-row items-center justify-between">
                <input type="text" className="w-full text-preset-1 text-neutral-200" placeholder="0" />
              </div>
            </div>
            <div>
              <img src={ExchangeIcon} alt="" className="rotate-90 md:rotate-0" />
            </div>
            <div className="w-full">
              <p className="text-preset-4 text-neutral-100 mb-5">RECEIVE</p>
              <div className="flex flex-row items-center justify-between gap-4">
                <input type="text" className="w-full text-preset-1 text-neutral-200" placeholder="0" />
                <div className="bg-neutral-500 border-2 border-neutral-400 p-2.5 rounded-xl flex flex-row items-center justify-items-center gap-2">
                  USD <ArrowIcon />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CheckRate