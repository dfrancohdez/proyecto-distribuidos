import ArchivoCard from "./ArchivoCard";
import { uploadFile, getUserFiles, deleteFile, getTransactions } from "../api/statements"; // API para subir archivo
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function Sidebar() {
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingFiles, setIsUploadingFiles] = useState(false);
  const [archivos, setArchivos] = useState([]);
  const [transacciones, setTransacciones] = useState([]);

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

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0'); // Obtener día y agregar ceros iniciales
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Obtener mes y agregar ceros iniciales
    const year = date.getFullYear(); // Obtener año
    return `${day}-${month}-${year}`; // Retornar la fecha en formato DD-MM-YYYY
  }

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
        const fileExists = archivos.some((archivo) => archivo.filename === file.name);

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
              autoClose: 2000, // Mantener el toast visible por 3 segundos
            });

            // Subir el archivo usando la API
            const result = await uploadFile(file);
            console.log("Resultado:", result); // Mostrar respuesta en consola

            toast.info("Procesando archivo...", {
              position: "bottom-center",
              autoClose: 20000, // Mantener el toast visible por 15 segundos
            });
        
            // Retardo de 15 segundos
            await new Promise((resolve) => setTimeout(resolve, 20000));

            //alert("Archivo subido con éxito.");
            toast.success("Archivo subido con éxito. En caso de no aparecer su archivo, recargue la página en unos minutos", {
              position: "bottom-center",
            });

            fetchFiles();
            // Actualizar lista de archivos
            // setArchivos((prevArchivos) => [
            //   ...prevArchivos,
            //   { filename: file.name, uploadDate: formatDate(new Date()) },
            // ]);

          } catch (error) {
            console.error("Error al subir archivo:", error);
            //alert("Hubo un error al subir el archivo.");
            toast.error("Hubo un error al subir el archivo.", {
              position: "bottom-center",
                                
            });
          } finally {
            setIsUploading(false); // Finalizar estado de carga
          }
        }
      }
    };

    fileInput.click(); // Abrir el selector de archivos
  };

  const handleFileTransactions = async (filename) => {
    try {
      const result = await getTransactions(filename);
      console.log("Resultado de transacciones:", result);

      const transacResult = result.data || []; //Aquí están los datos del excel
      console.log("Transacciones:", transacResult);

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

        const newTransac = transacciones.filter(
          (archivo) => archivo.name !== filename
        );
        setTransacciones(newTransac);
        
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
      {/* Título con raya debajo */}
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
                  onDelete={() => handleDeleteFile(archivo.filename)}/>
              </li>
            ))
          ) : (
            <li>No se encontraron archivos.</li>
          )}
        </ul>
      )}

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
