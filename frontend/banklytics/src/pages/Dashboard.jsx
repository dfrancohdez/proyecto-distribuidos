import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChartCard from "../components/ChartCard";
import "../styles/Colors.css";
import "boxicons/css/boxicons.min.css";

function Dashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const [username, setUsername] = useState("Usuario");
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
          "#36A2EB",
        ],
      },
    ],
  });
  const [tableData, setTableData] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(2);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleDataFromSidebar = ({ original, grouped, sorted }) => {
    console.log("Arreglo original recibido:", original);
    console.log("Arreglo agrupado por clase:", grouped);
    console.log("Arreglo ordenado por monto:", sorted);

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
            "#36A2EB",
          ],
        },
      ],
    });

    setTableData(original);
    setGroupedData(grouped);
    setSortedData(sorted);
  };

  const closeMenu = () => setShowMenu(false);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentTableData = tableData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className="flex h-screen w-full kodchasan-extralight"
      onClick={closeMenu}
    >
      <Sidebar onData={handleDataFromSidebar} />

      <div
        className="flex-1 p-6 bg-gray-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <h1 className="text-2xl text-gray-800">Información General</h1>

          <div className="flex items-center gap-4">
            <i className="bx bxs-user-circle text-2xl text-gray-500 scale-150 hover:textPurpple"></i>
            <span
              className="text-gray-800 hover:textPurpple cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
            >
              {username}
            </span>
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

        <div className="flex justify-between items-center mb-4 px-4">
          <span className="text-lg text-gray-500 hover:textPurpple cursor-pointer">
            Reporte de archivo
          </span>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="p-4 bg-white rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">Categorías</h2>
              <button
                className="px-4 py-1 text-sm bgPurpple text-white rounded-full hover:bg-white hover:textPurpple hover:borderPurpple transition duration-200"
                onClick={() =>
                  navigate("/categories", { state: { groupedData } })
                }
              >
                Ver más
              </button>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-72 h-72 mb-4">
                <ChartCard
                  title="Gráfica de Categorías"
                  data={pieData}
                  type="pie"
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg flex flex-col justify-center">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">Movimientos</h2>
              <button
                className="px-4 py-1 text-sm bgPurpple text-white rounded-full hover:bg-white hover:textPurpple hover:borderPurpple transition duration-200"
                onClick={() =>
                  navigate("/movements", { state: { sortedData } })
                }
              >
                Ver más
              </button>
            </div>
            <div className="flex justify-center items-center h-80">
              <div className="w-96 h-80">
                <ChartCard
                  title="Gráfica de Movimientos"
                  data={barData}
                  type="bar"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg">
          <h2 className="text-xl mb-4">Movimientos</h2>
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Fecha</th>
                <th className="border px-4 py-2">Concepto</th>
                <th className="border px-4 py-2">Monto</th>
                <th className="border px-4 py-2">Clase</th>
              </tr>
            </thead>
            <tbody>
              {currentTableData.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.Fecha}</td>
                  <td className="border px-4 py-2">{item.Concepto}</td>
                  <td className="border px-4 py-2">{item.Monto}</td>
                  <td className="border px-4 py-2">{item.Clase}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            {Array.from(
              { length: Math.ceil(tableData.length / rowsPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`mx-1 px-3 py-1 border rounded ${
                    currentPage === index + 1
                      ? "bgPurpple text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
