import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip
)

const sampleRates = [
  { date: "May 20", rate: 0.9215 },
  { date: "May 23", rate: 0.9231 },
  { date: "May 26", rate: 0.9208 },
  { date: "May 29", rate: 0.9264 },
  { date: "Jun 1", rate: 0.9292 },
  { date: "Jun 4", rate: 0.9278 },
  { date: "Jun 7", rate: 0.9316 },
  { date: "Jun 10", rate: 0.9341 },
  { date: "Jun 13", rate: 0.9327 },
  { date: "Jun 16", rate: 0.9358 },
  { date: "Jun 19", rate: 0.9372 },
]

const SampleChart = () => {
  const data = {
    labels: sampleRates.map((item) => item.date),
    datasets: [
      {
        label: "USD to EUR",
        data: sampleRates.map((item) => item.rate),
        borderColor: "#C8F169",
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 5,
        tension: 0.45,
        fill: "start",
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart

          if (!chartArea) return null

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          )

          gradient.addColorStop(0, "rgba(200,241,105,.35)")
          gradient.addColorStop(0.7, "rgba(200,241,105,.08)")
          gradient.addColorStop(1, "rgba(200,241,105,0)")

          return gradient
        },
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `1 USD = ${context.parsed.y} EUR`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#a3a3a3",
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(255,255,255,.06)",
        },
        ticks: {
          color: "#a3a3a3",
          callback: (value) => value.toFixed(4),
        },
      },
    },
  }

  return (
    <>
      <div className="h-72 mt-5">
        <Line data={data} options={options} />
      </div>
    </>
  )
}

export default SampleChart