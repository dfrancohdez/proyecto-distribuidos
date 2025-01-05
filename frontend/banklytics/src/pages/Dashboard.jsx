import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChartCard from "../components/ChartCard";
import TableCard from "../components/TableCard";
import "../styles/Colors.css";
import "boxicons/css/boxicons.min.css";

function Dashboard() {
  // Estado para mostrar/ocultar el menú
  const [showMenu, setShowMenu] = useState(false);
  const [username, setUsername] = useState("Usuario"); // Estado para el nombre del usuario
  const navigate = useNavigate(); // Para redirección

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar token
    localStorage.removeItem("username"); // Eliminar nombre
    navigate("/"); // Redirigir al login
  };

  // Obtener el nombre del usuario al cargar el componente
  useEffect(() => {
    // Obtener el token y mostrarlo en consola
    const token = localStorage.getItem("token");
    console.log("Token almacenado:", token);

    const storedUsername = localStorage.getItem("username"); // Obtener el nombre
    console.log("Nombre almacenado:", storedUsername);

    if (storedUsername) {
      setUsername(storedUsername); // Actualizar estado del nombre
    } else {
      console.log("No se encontró el nombre en localStorage.");
    }
  }, []);

  // Datos para las gráficas
  const fileName = "Reporte_2024";
  const fileDate = "31/12/2024";

  const pieData = {
    labels: ["LED 32", "USB", "Disco duro", "Teclado", "Monitor", "Lector"],
    datasets: [
      {
        data: [28, 8, 20, 11, 8, 25],
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
  };

  const barData = {
    labels: ["Luz", "TV", "Agua", "Botanas", "Internet"],
    datasets: [
      {
        label: "Movimientos",
        data: [10, 15, 12, 18, 20],
        backgroundColor: [
          "#F87171",
          "#60A5FA",
          "#FACC15",
          "#34D399",
          "#A78BFA",
        ],
      },
    ],
  };

  // Cerrar menú al hacer clic fuera
  const closeMenu = () => setShowMenu(false);

  return (
    <div
      className="flex h-screen w-full kodchasan-extralight"
      onClick={closeMenu} // Cierra el menú al hacer clic fuera
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido Principal */}
      <div
        className="flex-1 p-6 bg-gray-50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <h1 className="text-2xl text-gray-800">Información General</h1>

          <div className="flex items-center gap-4">
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <i className="bx bxs-file text-gray-500 scale-150 hover:textPurpple cursor-pointer"></i>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>

            {/* Menú desplegable del usuario */}
            <div className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer hover:textPurpple"
                onClick={(e) => {
                  e.stopPropagation(); // Evita que se cierre el menú al hacer clic dentro
                  setShowMenu(!showMenu); // Mostrar menú
                }}
              >
                <i className="bx bxs-user-circle text-2xl text-gray-500 scale-150 hover:textPurpple"></i>
                <span className="text-gray-800 hover:textPurpple">
                  {username} {/* Mostrar el nombre del usuario */}
                </span>
              </div>

              {/* Menú desplegable */}
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                  <ul className="py-1">
                    <li
                      onClick={() => navigate("/profile")} // Redirige a perfil
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Ver perfil
                    </li>
                    <li
                      onClick={handleLogout} // Cerrar sesión
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                    >
                      Cerrar sesión
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
              <button className="px-4 py-1 text-sm bgPurpple text-white rounded-full hover:bg-white hover:textPurpple hover:borderPurpple transition duration-200">
                Ver más
              </button>
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
              <button className="px-4 py-1 text-sm bgPurpple text-white rounded-full hover:bg-white hover:textPurpple hover:borderPurpple transition duration-200">
                Ver más
              </button>
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
