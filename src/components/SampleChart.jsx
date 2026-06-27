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
import { useTheme } from "./ThemeProvider"

ChartJS.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip
)

const formatLabel = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" })

const SampleChart = ({ chartData = [], currency1 = "USD", currency2 = "EUR" }) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const gridColor = isDark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.07)"
  const tickColor = isDark ? "#a3a3a3" : "#888888"
  const labels = chartData.map(item => formatLabel(item.date))
  const rates = chartData.map(item => item.rate)

  const data = {
    labels,
    datasets: [
      {
        label: `${currency1} to ${currency2}`,
        data: rates,
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
          label: (context) => `1 ${currency1} = ${context.parsed.y} ${currency2}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: tickColor,
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          color: gridColor,
        },
        ticks: {
          color: tickColor,
          callback: (value) => value.toFixed(4),
        },
      },
    },
  }

  return (
    <div className="h-72 mt-5">
      <Line data={data} options={options} />
    </div>
  )
}

export default SampleChart
