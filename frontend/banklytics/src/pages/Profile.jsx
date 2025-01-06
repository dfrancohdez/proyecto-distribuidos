import { useState, useEffect } from "react";
import "../styles/Colors.css";
import ProfileCard from "../components/ProfileCard";
import FileList from "../components/FileList"; // Lista de archivos
import BackgroundShapes from "../components/BackgroundShapes";
import "boxicons/css/boxicons.min.css";
import { useNavigate } from "react-router-dom"; // Para regresar y redirigir
import { toast } from "react-toastify";
function Profile() {
  const [username, setUsername] = useState("Usuario");
  const [email, setEmail] = useState("Correo no disponible");
  const [showMenu, setShowMenu] = useState(false); // Estado para mostrar/ocultar el menú
  const navigate = useNavigate(); // Navegación para el botón regresar

  useEffect(() => {
    // Cargar datos del localStorage
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");

    setUsername(storedUsername || "Usuario");
    setEmail(storedEmail || "Correo no disponible");
  }, []);

  // Función para actualizar solo el nombre
  const handleUpdate = async (newName) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: email, // Mantener el correo actual
            name: newName, // Solo actualiza el nombre
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        //alert("Nombre actualizado con éxito.");

        toast.success("Nombre actualizado con éxito.", {
          position: "bottom-center",
          
        });
        // Actualizar datos en localStorage
        localStorage.setItem("username", newName);

        // Actualizar estado local
        setUsername(newName);
      } else {
        //alert(result.error || "Error al actualizar el nombre.");
        toast.error(result.error || "Error al actualizar el nombre.", {
          position: "bottom-center",
                            
        });
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
      //alert("Ocurrió un error inesperado.");
      toast.error("Ocurrió un error inesperado.", {
        position: "bottom-center",
                          
      });
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.clear(); // Eliminar todos los datos guardados
    navigate("/"); // Redirige al login
  };

  return (
    <div className="h-screen w-full kodchasan-extralight bg-gray-50">
      {/* Nav superior con perfil */}
      <div className="w-full z-20 p-6 fixed top-0 left-0">
        <div className="flex items-center justify-between border-b pb-4">
          <h1 className="text-2xl text-gray-800">Mi Perfil</h1>
          <div className="flex items-center gap-4 relative">
            <div className="w-px h-8 bg-gray-300"></div>

            {/* Perfil con menú desplegable */}
            <div
              className="flex items-center gap-2 cursor-pointer hover:textPurpple"
              onClick={() => setShowMenu(!showMenu)} // Alternar menú
            >
              <i className="bx bxs-user-circle text-2xl text-gray-500 scale-150 hover:textPurpple"></i>
              <span className="text-gray-800 hover:textPurpple">
                {username}
              </span>
            </div>

            {/* Menú desplegable */}
            {showMenu && (
              <div className="absolute top-10 right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                <ul className="py-1">
                  <li
                    onClick={handleLogout} // Cerrar sesión
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                  >
                    Cerrar Sesión
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fondo con figuras decorativas */}
      <BackgroundShapes>
        <div className="flex flex-col justify-start items-center mt-24 p-6 gap-10">
          {/* Contenedor principal */}
          <div className="flex justify-center items-start gap-10 w-4/5 h-auto p-8 bg-white/25 backdrop-blur-md rounded-lg shadow-lg">
            {/* Tarjeta de Perfil */}
            <div className="w-1/3 flex flex-col justify-center items-center">
              <ProfileCard
                username={username}
                email={email}
                onUpdate={handleUpdate}
              />
            </div>

            {/* Lista de Archivos */}
            <div className="w-2/3">
              <FileList />
            </div>
          </div>

          {/* Botón Regresar */}
          <div className="flex w-full mt-6">
            <button
              className="px-6 py-2 ml-32 text-sm bgPurpple text-white rounded-full hover:bg-white hover:textPurpple hover:borderPurpple transition duration-200"
              onClick={() => navigate("/dashboard")} // Regresa al dashboard
            >
              Regresar
            </button>
          </div>
        </div>
      </BackgroundShapes>
    </div>
  );
}

export default Profile;
