import ArchivoCard from "./ArchivoCard";
import {
  uploadFile,
  getUserFiles,
  deleteFile,
  getTransactions,
} from "../api/statements"; // API para subir archivo
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function Sidebar({ onData }) {
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingFiles, setIsUploadingFiles] = useState(false);
  const [archivos, setArchivos] = useState([]);

  const fetchFiles = async () => {
    setIsUploadingFiles(true);
    try {
      const result = await getUserFiles();
      console.log("Resultado de archivos:", result);
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

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileSelect = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".csv, .xlsx"; // Formatos aceptados

    fileInput.onchange = async (event) => {
      const file = event.target.files[0]; // Obtener archivo seleccionado

      if (file) {
        const fileExists = archivos.some(
          (archivo) => archivo.filename === file.name
        );

        if (fileExists) {
          toast.warning(`El archivo "${file.name}" ya ha sido subido.`, {
            position: "bottom-center",
          });
          return; // Detener la carga si el archivo ya existe
        }

        const confirmUpload = window.confirm(
          `¿Subir el archivo: ${file.name}?`
        );

        if (confirmUpload) {
          try {
            setIsUploading(true); // Estado de carga activado

            toast.info("Subiendo archivo...", {
              position: "bottom-center",
              autoClose: 2000, // Mantener el toast visible por 2 segundos
            });

            const result = await uploadFile(file);
            console.log("Resultado:", result);

            toast.info("Procesando archivo...", {
              position: "bottom-center",
              autoClose: 25000, // Mantener el toast visible por 25 segundos
            });

            await new Promise((resolve) => setTimeout(resolve, 25000)); // Retardo de 25 segundos

            toast.success(
              "Archivo subido con éxito. En caso de no aparecer, recargue la página.",
              {
                position: "bottom-center",
              }
            );

            fetchFiles();
          } catch (error) {
            console.error("Error al subir archivo:", error);
            toast.error("Hubo un error al subir el archivo.", {
              position: "bottom-center",
            });
          } finally {
            setIsUploading(false); // Finalizar estado de carga
          }
        }
      }
    };

    fileInput.click();
  };

  const handleFileTransactions = async (filename) => {
    try {
      const result = await getTransactions(filename);
      console.log("Resultado de transacciones:", result);

      const transacResult = result.data || []; // Aquí están los datos del excel
      console.log("Transacciones recibidas:", transacResult);

      // Agrupar por categoría (clase)
      const groupedByClass = transacResult.reduce((acc, item) => {
        const clase = item.Clase || "Sin Clase"; // Usa "Sin Clase" si no tiene categoría
        if (!acc[clase]) {
          acc[clase] = [];
        }
        acc[clase].push(item);
        return acc;
      }, {});

      console.log("Datos agrupados por clase:", groupedByClass);

      // Ordenar de mayor a menor por monto
      const sortedByAmount = [...transacResult].sort(
        (a, b) => b.Monto - a.Monto
      );

      console.log(
        "Datos ordenados de mayor a menor por monto:",
        sortedByAmount
      );

      // Enviar datos agrupados, ordenados y originales al Dashboard
      onData({
        filename: filename,
        original: transacResult,
        grouped: groupedByClass,
        sorted: sortedByAmount,
      });
    } catch (error) {
      console.error("Error al obtener transacciones:", error);
      toast.error("Error al obtener las transacciones.", {
        position: "bottom-center",
      });
    }
  };

  const handleDeleteFile = async (filename) => {
    try {
      const confirmDelete = window.confirm(
        `¿Eliminar el archivo: ${filename}?`
      );

      if (confirmDelete) {
        const result = await deleteFile(filename);
        console.log("Resultado de eliminación:", result);

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
    <div className="w-1/4 h-full bg-white border-r p-4">
      <h2 className="text-lg mb-4 border-b-2 border-gray-200 pb-2">
        Mis archivos
      </h2>

      {isUploadingFiles ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader size={40} color={"#eaeaea"} loading={isUploadingFiles} />
        </div>
      ) : (
        <ul className="space-y-4">
          {archivos.length > 0 ? (
            archivos.map((archivo, index) => (
              <li key={index}>
                <ArchivoCard
                  titulo={archivo.filename}
                  fecha={archivo.uploadDate}
                  onClick={() => handleFileTransactions(archivo.filename)}
                  onDelete={() => handleDeleteFile(archivo.filename)}
                />
              </li>
            ))
          ) : (
            <li>No se encontraron archivos.</li>
          )}
        </ul>
      )}

      <div className="flex justify-center mt-4">
        <button
          className={`w-36 bgPurpple text-white py-2 rounded-full hover:bg-white hover:textPurpple hover:borderPurpple transition duration-200 ${
            isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleFileSelect}
          disabled={isUploading}
        >
          {isUploading ? "Cargando..." : "Cargar archivo"}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
