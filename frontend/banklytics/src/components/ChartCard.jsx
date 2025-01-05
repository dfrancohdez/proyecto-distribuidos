import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

// Registro de elementos necesarios
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

function ChartCard({ title, data, type }) {
  const chartOptions = {
    plugins: {
      legend: {
        display: false, // Ocultar leyendas automáticas
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-full">
      {type === "pie" && <Pie data={data} options={chartOptions} />}
      {type === "bar" && <Bar data={data} options={chartOptions} />}
    </div>
  );
}

export default ChartCard;
