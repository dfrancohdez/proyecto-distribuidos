import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Registro de elementos necesarios
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

function ChartCardMovements({ title, data, type }) {
  // Opciones para el gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Permite cambiar el tamaño
    plugins: {
      legend: {
        display: false, // Ocultar leyendas automáticas
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false, // No omitir etiquetas
          maxRotation: 45, // Rotar etiquetas si es necesario
          minRotation: 45,
        },
      },
    },
  };

  return (
    <div className="">
      <h3 className="text-lg mb-4">{title}</h3>
      <div className="h-[300px] w-[500px]">
        {" "}
        {/* Tamaño más grande */}
        {type === "pie" ? (
          <Pie data={data} options={options} />
        ) : type === "bar" ? (
          <Bar data={data} options={options} />
        ) : null}
      </div>
    </div>
  );
}

export default ChartCardMovements;
