const API_URL = import.meta.env.VITE_API_URL;

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
        alert(error.message || "Error inesperado.");
        throw error; // Re-lanza el error
    }
};
