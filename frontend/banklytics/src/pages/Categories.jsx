import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ChartCardCategories from "../components/ChartCardCategories";
import TableCategories from "../components/TableCategories";
import "../styles/Colors.css";
import "boxicons/css/boxicons.min.css";

function Categories() {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("Usuario");
  const [showMenu, setShowMenu] = useState(false);
  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  });
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Movimientos por página

  // Obtener el usuario y los datos agrupados desde el estado de navegación
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    if (location.state && location.state.groupedData) {
      const grouped = location.state.groupedData;

      // Configurar la gráfica circular
      const pieChartLabels = Object.keys(grouped);
      const pieChartData = Object.values(grouped).map((items) => items.length);

      setPieData({
        labels: pieChartLabels,
        datasets: [
          {
            data: pieChartData,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
            ],
          },
        ],
      });

      // Convertir los datos agrupados en un solo arreglo para la tabla
      const flattenedData = Object.entries(grouped).flatMap(([clase, items]) =>
        items.map((item) => ({
          ...item,
          Clase: clase,
        }))
      );
      setTableData(flattenedData);
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
          <h1 className="text-2xl text-gray-800">Información de Categorías</h1>

          <div className="flex items-center gap-4">
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer hover:textPurpple"
                onClick={(e) => {
                  e.stopPropagation(); // Evitar cierre del menú
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
            Reporte de archivo
          </span>
        </div>

        {/* Sección de Gráficas */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Gráfica de Categorías (Circular) */}
          <div className="p-4 bg-white rounded-lg shadow-lg">
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

          {/* Tabla con datos agrupados */}
          <TableCategories tableData={tableData}/>
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

export default Categories;
