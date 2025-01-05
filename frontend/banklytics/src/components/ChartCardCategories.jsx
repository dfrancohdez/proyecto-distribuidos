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

function ChartCardCategories({ title, data, type }) {
  // Opciones para el gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Permite cambiar el tamaño
    plugins: {
      legend: {
        display: true, // Mostrar leyendas
        position: "right", // Mueve las leyendas a la derecha
        labels: {
          boxWidth: 20, // Tamaño del cuadro de color
          padding: 20, // Espaciado entre las leyendas
          font: {
            size: 14, // Tamaño de la fuente
          },
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

export default ChartCardCategories;
