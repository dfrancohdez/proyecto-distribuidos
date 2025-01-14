import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ChartCardMovements from "../components/ChartCardMovements";
import "../styles/Colors.css";
import "boxicons/css/boxicons.min.css";
import TableMovements from "../components/TableMovements";

function Movements() {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("Usuario");
  const [showMenu, setShowMenu] = useState(false);
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [
      {
        label: "Montos por Concepto",
        data: [],
        backgroundColor: [
          "#F87171",
          "#60A5FA",
          "#FACC15",
          "#34D399",
          "#A78BFA",
          "#FF9F40",
        ],
      },
    ],
  });
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Obtener datos del estado y configurar usuario y tabla
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    if (location.state && location.state.sortedData) {
      const sorted = location.state.sortedData;

      // Configurar la gráfica de barras
      const barChartLabels = sorted.map((item) => item.Concepto);
      const barChartData = sorted.map((item) => item.Monto);

      setBarData({
        labels: barChartLabels,
        datasets: [
          {
            label: "Montos por Concepto",
            data: barChartData,
            backgroundColor: [
              "#F87171",
              "#60A5FA",
              "#FACC15",
              "#34D399",
              "#A78BFA",
              "#FF9F40",
            ],
          },
        ],
      });

      // Configurar datos de la tabla
      setTableData(sorted);
    }
  }, [location.state]);

  // Calcular los datos para la página actual
  //const indexOfLastRow = currentPage * rowsPerPage;
  //const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  //const currentTableData = tableData.slice(indexOfFirstRow, indexOfLastRow);

  // Cambiar página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="flex h-screen w-full kodchasan-extralight">
      {/* Contenido Principal */}
      <div className="flex-1 p-6 bg-gray-50">
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <h1 className="text-2xl text-gray-800">Información de Movimientos</h1>

          <div className="flex items-center gap-4">
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer hover:textPurpple"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
              >
                <i className="bx bxs-user-circle text-2xl text-gray-500 scale-150 hover:textPurpple"></i>
                <span className="text-gray-800 hover:textPurpple">
                  {username}
                </span>
              </div>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <ul className="py-1">
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate("/profile")}
                    >
                      Ver Perfil
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                      onClick={handleLogout}
                    >
                      Cerrar Sesión
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Encabezado de Gráficas */}
        <div className="flex justify-between items-center mb-4 px-4">
          <span className="text-lg text-gray-500 hover:textPurpple cursor-pointer">
            Archivo: Reporte_2024
          </span>
          <span className="text-lg text-gray-500">Fecha: 31/12/2024</span>
        </div>

        {/* Sección de Gráficas */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Gráfica de Movimientos (Barras) */}
          <div className="p-4 bg-white rounded-lg shadow-lg flex flex-col justify-center">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">Movimientos</h2>
            </div>
            <div className="flex justify-center items-center h-80">
              {/* Gráfica de barras */}
              <div className="h-80 justify-center items-center flex w-full">
                <ChartCardMovements title="" data={barData} type="bar" />
              </div>
            </div>
          </div>

          {/* Tabla con movimientos ordenados */}
          <TableMovements tableData={tableData} /> 
        </div>

        {/* Botón Regresar */}
        <div className="flex mt-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2 text-sm bgPurpple text-white rounded-full hover:bg-white hover:textPurpple hover:borderPurpple transition duration-200"
          >
            Regresar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Movements;
