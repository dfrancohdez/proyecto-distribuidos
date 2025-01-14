import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getUserFiles } from "../api/statements";
import { ClipLoader } from "react-spinners";
import { deleteFile } from "../api/statements"; // API para eliminar archivo

function FileList() {
  const files = ["Archivo 1", "Archivo 2", "Archivo 3"];
  const [isUploadingFiles, setIsUploadingFiles] = useState(false);
  const [archivos, setArchivos] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      setIsUploadingFiles(true);
      try {
        const result = await getUserFiles();
        // console.log("Resultado de archivos:", result);
        const files = result.files || [];
        if (files && files.length > 0) {
          setArchivos(files);
        } else {
          setArchivos([]);
        }
      } catch (error) {
        console.error("Error al obtener archivos:", error);
        toast.error("Error al obtener los archivos.", {
          position: "bottom-center",
        });
      } finally {
        setIsUploadingFiles(false);
      }
    };

    fetchFiles();
  }, []);

  const handleDeleteFile = async (filename) => {
    try {
      const confirmDelete = window.confirm(
        `¿Eliminar el archivo: ${filename}?`
      );

      if (confirmDelete) {
        const result = await deleteFile(filename);
        // console.log("Resultado de eliminación:", result);

        const newFiles = archivos.filter(
          (archivo) => archivo.filename !== filename
        );
        setArchivos(newFiles);
        
        toast.success("Archivo eliminado con éxito.", {
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.error("Error al eliminar archivo:", error);
      toast.error("Error al eliminar el archivo.", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-full">
      {/* Título con raya horizontal */}
      <h3 className="text-purple-600 text-lg mb-4 border-b pb-4">
        Mis archivos
      </h3>

      {/* Lista de archivos */}
      {isUploadingFiles ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader size={40} color={"#eaeaea"} loading={isUploadingFiles} />
        </div>
      ) : (
        <ul className="space-y-4">
          {archivos.length > 0 ? (
            archivos.map((file, index) => (
              <li key={index} className="flex justify-between items-center">
                {/* Nombre del archivo */}
                <span className="text-gray-400 text-sm">{file.filename}</span>
                {/* Botón Eliminar */}
                <button className="px-4 py-1 text-sm bg-red-300 text-white rounded-full hover:bg-red-400 transition duration-200"
                  onClick={() => handleDeleteFile(file.filename)}
                >
                  Eliminar
                </button>
              </li>
            ))
          ) : (
            <li>No se encontraron archivos.</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default FileList;
