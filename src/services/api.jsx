import axios from "axios";
import { currencies } from "../data/countries";
import { getRandomItems } from "../utils/getRandomItems";

const createAPIInstance = (baseURL) => {
    return axios.create({ baseURL, });
}

const API_BASE_URL = "https://api.frankfurter.dev/v2"

const api = createAPIInstance(`${API_BASE_URL}`)

export const getLatestExchangeRates = async (base) => {
  const countryCodes = Object.keys(currencies)

  const randomCountryCodes = getRandomItems(countryCodes, 8)

  try {
    const response = await api.get(`/rates?base=${base}&quotes=${randomCountryCodes.join(",")}`)

    const pairs = response?.data.flatMap(({ base, quote, rate }) => [
      {
        base: base,
        quote: quote,
        pair: `${base}/${quote}`,
        rate,
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

export const getExchangeRate = async (base, quote) => {
  const response = await api.get(`/rates?base=${base}&quotes=${quote}`)
  const { rate } = response.data[0]
  return { rate }
}

const getLastWeekday = (date) => {
  const d = new Date(date)
  while (d.getDay() === 0 || d.getDay() === 6) {
    d.setDate(d.getDate() - 1)
  }
  return d.toISOString().split("T")[0]
}

export const getDateRange = (rangeKey) => {
  const to = new Date()
  const from = new Date()

  const adjustFrom = {
    oneDay:      () => from.setDate(from.getDate() - 4),
    oneWeek:     () => from.setDate(from.getDate() - 7),
    oneMonth:    () => from.setMonth(from.getMonth() - 1),
    threeMonths: () => from.setMonth(from.getMonth() - 3),
    oneYear:     () => from.setFullYear(from.getFullYear() - 1),
    fiveYears:   () => from.setFullYear(from.getFullYear() - 5),
  }

  adjustFrom[rangeKey]?.()

  const dateFrom = rangeKey === "oneDay"
    ? getLastWeekday(from)
    : from.toISOString().split("T")[0]

  const dateTo = getLastWeekday(to)

  return { dateFrom, dateTo }
}

export const getRateMap = async (base, date = null) => {
  const countryCodes = Object.keys(currencies)
  const url = date
    ? `/rates?base=${base}&quotes=${countryCodes.join(",")}&date=${date}`
    : `/rates?base=${base}&quotes=${countryCodes.join(",")}`
  const response = await api.get(url)
  const map = { [base]: 1 }
  response.data.forEach(({ quote, rate }) => {
    map[quote] = rate
  })
  return map
}

export const getHistoricalRateRange = async (base, quote, dateFrom, dateTo) => {
  const response = await api.get(
    `/rates?base=${base}&quotes=${quote}&from=${dateFrom}&to=${dateTo}`
  )
  return response.data.map(({ date, rate }) => ({ date, rate }))
}
