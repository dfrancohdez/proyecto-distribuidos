import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChartCard from "../components/ChartCard";
import TableCard from "../components/TableCard";
import "../styles/Colors.css";
import "boxicons/css/boxicons.min.css";

function Dashboard() {
  const [showMenu, setShowMenu] = useState(false); // Estado para el menú del perfil
  const [username, setUsername] = useState("Usuario"); // Estado para el nombre del usuario
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
  }); // Estado para los datos de la gráfica de pastel
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
  }); // Estado para los datos de la gráfica de barras
  const navigate = useNavigate(); // Para redirección

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar token
    localStorage.removeItem("username"); // Eliminar nombre
    navigate("/"); // Redirigir al login
  };

  // Obtener el nombre del usuario al cargar el componente
  useEffect(() => {
    const storedUsername = localStorage.getItem("username"); // Obtener el nombre
    if (storedUsername) {
      setUsername(storedUsername); // Actualizar estado del nombre
    }
  }, []);

  // Función para recibir datos del componente Sidebar
  const handleDataFromSidebar = ({ original, grouped, sorted }) => {
    console.log("Arreglo original recibido:", original);
    console.log("Arreglo agrupado por clase:", grouped);
    console.log("Arreglo ordenado por monto:", sorted);

    // Preparar los datos para la gráfica de pastel
    const pieChartLabels = Object.keys(grouped); // Clases (categorías)
    const pieChartData = Object.values(grouped).map((items) => items.length); // Cantidad de objetos por clase

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

    // Preparar los datos para la gráfica de barras
    const barChartLabels = sorted.map((item) => item.Concepto); // Conceptos del arreglo ordenado
    const barChartData = sorted.map((item) => item.Monto); // Montos del arreglo ordenado

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
  };

  // Cerrar menú al hacer clic fuera
  const closeMenu = () => setShowMenu(false);

  return (
    <div
      className="flex h-screen w-full kodchasan-extralight"
      onClick={closeMenu} // Cierra el menú al hacer clic fuera
    >
      {/* Sidebar */}
      <Sidebar onData={handleDataFromSidebar} />

      {/* Contenido Principal */}
      <div
        className="flex-1 p-6 bg-gray-50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <h1 className="text-2xl text-gray-800">Información General</h1>

          <div className="flex items-center gap-4">
            <i className="bx bxs-user-circle text-2xl text-gray-500 scale-150 hover:textPurpple"></i>
            <span
              className="text-gray-800 hover:textPurpple cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // Evitar cerrar menú
                setShowMenu(!showMenu); // Alternar menú
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

        {/* Encabezado de Gráficas */}
        <div className="flex justify-between items-center mb-4 px-4">
          <span className="text-lg text-gray-500 hover:textPurpple cursor-pointer">
            Reporte de archivo
          </span>
        </div>

        {/* Sección de Gráficas */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Gráfica de Categorías (Circular) */}
          <div className="p-4 bg-white rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">Categorías</h2>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-72 h-72 mb-4">
                <ChartCard title="" data={pieData} type="pie" />
              </div>
            </div>
          </div>

          {/* Gráfica de Movimientos (Barras) */}
          <div className="p-4 bg-white rounded-lg flex flex-col justify-center">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">Movimientos</h2>
            </div>
            <div className="flex justify-center items-center h-80">
              <div className="w-96 h-80">
                <ChartCard title="" data={barData} type="bar" />
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Tabla */}
        <TableCard />
      </div>
    </div>
  );
}

export default Dashboard;
