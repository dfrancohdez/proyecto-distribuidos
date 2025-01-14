import { useState, useEffect } from "react";
import "boxicons/css/boxicons.min.css";
import "../styles/Colors.css";

function ProfileCard({ username, email, onUpdate }) {
  // Estados para edición
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(username); // Inicializa con el valor actual

  // Actualiza los valores si cambian los props
  useEffect(() => {
    setNewUsername(username); // Mantén sincronizado el nombre
  }, [username]); // Se ejecuta cuando cambian los props

  // Manejar el clic en el lápiz
  const handleEditClick = () => {
    setIsEditing(!isEditing); // Cambiar entre edición y vista
  };

  // Guardar cambios
  const handleSave = () => {
    onUpdate(newUsername); // Solo actualiza el nombre
    setIsEditing(false); // Salir del modo edición
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-96 h-auto scale-110 justify-center items-center">
      {/* Ícono de perfil */}
      <div className="flex justify-center mb-4">
        <i className="bx bxs-user-circle textPurpple text-8xl"></i>
      </div>

      {/* Sección Nombre */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-purple-600 text-sm font-medium">Nombre</h3>
          {isEditing ? (
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="text-gray-400 text-sm border rounded p-1"
            />
          ) : (
            <p className="text-gray-400 text-sm">{username}</p>
          )}
        </div>
      </div>

      {/* Sección Correo (Solo Lectura) */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-purple-600 text-sm font-medium">Correo</h3>
          <p className="text-gray-400 text-sm">{email}</p>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end">
        <i
          className={`bx ${
            isEditing ? "bx-check" : "bx-edit-alt"
          } text-purple-500 text-lg cursor-pointer`}
          onClick={isEditing ? handleSave : handleEditClick}
        ></i>
      </div>
    </div>
  );
}

export default ProfileCard;
