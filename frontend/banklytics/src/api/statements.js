const API_URL = import.meta.env.VITE_API_URL;
import { toast } from "react-toastify";
export const uploadFile = async (file) => {
    try {
        // Crear un nombre único para el archivo
        const fileName = `${file.name}`;

        // Convertir archivo a formato binario (arrayBuffer)
        const binaryData = await file.arrayBuffer(); // Cambiado a binario

        // Hacer la solicitud POST
        const response = await fetch(`${API_URL}/bank-statements/files`, {
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream", // Enviar como binario
                "x-file-name": fileName, // Enviar nombre de archivo
                "x-token": localStorage.getItem("token"), // Enviar token de autenticación
            },
            body: binaryData, // Enviar directamente el binario
        });

        // Procesar la respuesta
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Error al subir el archivo.");
        }

        return result;
    } catch (error) {
        console.error("Error en uploadFile:", error.message);
        //alert(error.message || "Error inesperado.");
        toast.error(error.message || "Error inesperado.", {
            position: "bottom-center",
            
          });
        throw error; // Re-lanza el error
    }
};

export const getUserFiles = async () => {
    try {
        const response = await fetch(`${API_URL}/bank-statements/files`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-token": localStorage.getItem("token"),
            },
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Error al obtener los archivos.");
        }

        return result;
    } catch (error) {
        console.error("Error en getFiles:", error.message);
        throw error;
    }
};

export const deleteFile = async (fileId) => {
    try {
        const response = await fetch(`${API_URL}/bank-statements/files/${fileId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-token": localStorage.getItem("token"),
            },
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Error al eliminar el archivo.");
        }

        return result;
    } catch (error) {
        console.error("Error en deleteFile:", error.message);
        throw error;
    }
}

export const getTransactions = async (fileId) => {
    try {
        const response = await fetch(`${API_URL}/bank-statements/files/${fileId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-token": localStorage.getItem("token"),
            },
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Error al obtener las transacciones.");
        }

        return result;
    } catch (error) {
        console.error("Error en getTransactions:", error.message);
        throw error;
    }
}