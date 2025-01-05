import ChartCardCategories from "../components/ChartCardCategories";
import TableCategories from "../components/TableCategories";
import "../styles/Colors.css";

// Importar los estilos de Boxicons
import "boxicons/css/boxicons.min.css";

function Categories() {
  // Variables para el nombre del archivo y la fecha
  const fileName = "Reporte_2024";
  const fileDate = "31/12/2024";

  // Datos para la gráfica circular (categorías)
  const pieData = {
    labels: ["LED 32", "USB", "Disco duro", "Teclado", "Monitor", "Lector"],
    datasets: [
      {
        data: [28, 8, 20, 11, 8, 25],
        backgroundColor: [
          "#FF6384", // Rojo
          "#36A2EB", // Azul
          "#FFCE56", // Amarillo
          "#4BC0C0", // Verde
          "#9966FF", // Morado
          "#FF9F40", // Naranja
        ],
      },
    ],
  };

  // Datos para la gráfica de barras (movimientos)
  const barData = {
    labels: ["Luz", "TV", "Agua", "Botanas", "Internet"],
    datasets: [
      {
        label: "Movimientos",
        data: [10, 15, 12, 18, 20],
        backgroundColor: [
          "#F87171", // Rojo claro
          "#60A5FA", // Azul claro
          "#FACC15", // Amarillo
          "#34D399", // Verde esmeralda
          "#A78BFA", // Morado claro
        ],
      },
    ],
  };

  return (
    <div className="flex h-screen w-full kodchasan-extralight">
      {/* Contenido Principal */}
      <div className="flex-1 p-6 bg-gray-50">
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <h1 className="text-2xl text-gray-800">Información de Categorías</h1>

          <div className="flex items-center gap-4">
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <i className="bx bxs-file text-gray-500 scale-150 hover:textPurpple cursor-pointer"></i>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="flex items-center gap-2 cursor-pointer hover:textPurpple">
              <i className="bx bxs-user-circle text-2xl text-gray-500 scale-150 hover:textPurpple"></i>
              <span className="text-gray-800 hover:textPurpple">Usuario</span>
            </div>
          </div>
        </div>

        {/* Encabezado de Gráficas */}
        <div className="flex justify-between items-center mb-4 px-4">
          <span className="text-lg text-gray-500 hover:textPurpple cursor-pointer">
            Archivo: {fileName}
          </span>
          <span className="text-lg text-gray-500">Fecha: {fileDate}</span>
        </div>

        {/* Sección de Gráficas */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Gráfica de Categorías (Circular) */}
          <div className="p-4 bg-white rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">Categorías</h2>
            </div>
            <div className="flex flex-col items-center">
              {/* Gráfica circular */}
              <div className="justify-center h-72 mb-4 w-full">
                <ChartCardCategories title="" data={pieData} type="pie" />
              </div>
            </div>
          </div>

          {/* Sección de Tabla */}
          <TableCategories />
        </div>

        {/* Botón Regresar */}
        <div className="flex mt-6">
          <button className="px-6 py-2 text-sm bgPurpple text-white rounded-full hover:bg-white hover:textPurpple hover:borderPurpple transition duration-200">
            Regresar
          </button>
        </div>
      </div>
    </div>
  );
}
export default Categories;
