import axios from "axios";
import { currencies } from "../data/countries";

const createAPIInstance = (baseURL) => {
    return axios.create({ baseURL, });
}

const API_BASE_URL = "https://api.frankfurter.dev/v2"

const api = createAPIInstance(`${API_BASE_URL}`)

export const getLatestExchangeRates = async (base) => {
  const countryCodes = Object.keys(currencies)

  try {
    const response = await api.get(`/rates?base=${base}&quotes=${countryCodes.join(",")}`)
    
    const pairs = response?.data.flatMap(({ base, quote, rate }) => [
      {
        base: base,
        quote: quote,
        pair: `${base}/${quote}`,
        rate,
      },
      {
        base: base,
        quote: quote,
        pair: `${quote}/${base}`,
        rate: Number((1 / rate).toFixed(2)),
      },
    ]);

    return pairs
  } catch (err) {
    console.error(err.response?.data?.message || 'Unable to fetch latest exchange rates')
  }
}

export const getPreviousExchangeRateByBaseQuote = async(base, quote) => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const formattedDate = yesterday.toISOString().split("T")[0]

  try {
    const response = await api.get(`/rates?base=${base}&quotes=${quote}&date=${formattedDate}`)
    return response.data
  } catch (err) {
    console.error(err.response?.data?.message || 'Unable to fetch previous day exchange rates')
  }
}