import "../styles/Colors.css";
import { FaTrash } from "react-icons/fa"; // Importar ícono de basura

function ArchivoCard({ titulo, fecha, onDelete, onClick }) {
  return (
    <div 
      className="relative p-4 w-full h-36 bg-white border rounded-lg shadow-md hover:lightPurpple hover:scale-95 transition-transform duration-300 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* Botón de eliminar */}
      <button
        className="absolute top-2 left-2 text-red-600 hover:text-red-800"
        onClick={(e) => {
          e.stopPropagation(); // Evitar que el clic en el botón active el onClick del contenedor
          onDelete();
        }}
      >
        <FaTrash size={20} />
      </button>

      {/* Segunda curva (morado tenue) */}
      <div className="absolute inset-x-0 bottom-0 h-1/2">
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 left-0 w-full h-full"
        >
          <path
            fill="#E9D8FD" /* Morado tenue */
            d="M0,288L1440,0L1440,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Primera curva (morado fuerte) */}
      <div className="absolute inset-x-0 bottom-0 h-1/2">
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 left-0 w-full h-full"
        >
          <path fill="#9F7AEA" d="M0,32L720,320L0,320Z" />
        </svg>
      </div>

      {/* Texto del archivo alineado a la derecha */}
      <div className="relative z-10 flex flex-col items-end text-right">
        <h3 className="text-lg text-gray-800">{titulo}</h3>
        <p className="text-sm text-gray-500 mt-16">{fecha}</p>
      </div>
    </div>
  );
}

export default ArchivoCard;
