import ArchivoCard from "./ArchivoCard";
import { uploadFile } from "../api/statements"; // API para subir archivo
import { useState } from "react";

function Sidebar() {
  const [isUploading, setIsUploading] = useState(false); // Estado de carga

  // Manejar la selección del archivo
  const handleFileSelect = async () => {
    // Crear un input para seleccionar archivo
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".csv, .xlsx"; // Formatos aceptados

    // Evento cuando se selecciona un archivo
    fileInput.onchange = async (event) => {
      const file = event.target.files[0]; // Obtener archivo seleccionado

      if (file) {
        const confirmUpload = window.confirm(
          `¿Subir el archivo: ${file.name}?`
        );

        if (confirmUpload) {
          try {
            setIsUploading(true); // Estado de carga activado

            // Subir el archivo usando la API
            const result = await uploadFile(file);
            console.log("Resultado:", result); // Mostrar respuesta en consola

            alert("Archivo subido con éxito.");
          } catch (error) {
            console.error("Error al subir archivo:", error);
            alert("Hubo un error al subir el archivo.");
          } finally {
            setIsUploading(false); // Finalizar estado de carga
          }
        }
      }
    };

    fileInput.click(); // Abrir el selector de archivos
  };

  return (
    <div className="w-1/4 h-full bg-white border-r p-4">
      {/* Título con raya debajo */}
      <h2 className="text-lg mb-4 border-b-2 border-gray-200 pb-2">
        Mis archivos
      </h2>

      {/* Lista de archivos */}
      <ul className="space-y-4">
        <li>
          <ArchivoCard titulo="Archivo 1" fecha="dd-mm-yy" />
        </li>
        <li>
          <ArchivoCard titulo="Archivo 2" fecha="dd-mm-yy" />
        </li>
        <li>
          <ArchivoCard titulo="Archivo 3" fecha="dd-mm-yy" />
        </li>
      </ul>

      {/* Botón de carga */}
      <div className="flex justify-center mt-4">
        <button
          className={`w-36 bgPurpple text-white py-2 rounded-full hover:bg-white hover:textPurpple hover:borderPurpple transition duration-200 ${
            isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleFileSelect} // Ejecuta selección de archivo
          disabled={isUploading} // Desactiva botón durante la carga
        >
          {isUploading ? "Cargando..." : "Cargar archivo"}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
