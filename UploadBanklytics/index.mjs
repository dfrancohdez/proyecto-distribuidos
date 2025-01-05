import AWS from 'aws-sdk';
import dotenv from 'dotenv';

// Configuración inicial
dotenv.config();
AWS.config.update({ region: process.env.AWS_R });

const s3 = new AWS.S3();

// Respuesta estándar
const response = (statusCode, body) => {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/octet-stream",
            "Access-Control-Allow-Origin": "*", // Habilita CORS
            "Access-Control-Allow-Methods": "OPTIONS,POST", // Métodos permitidos
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Credentials": true, // Encabezados permitidos
        },
        body: JSON.stringify(body),
    };
};

// Función principal
export const handler = async (event) => {
    try {
        console.log("Evento recibido:", JSON.stringify(event)); // Log para depuración

        // **Manejo explícito del preflight OPTIONS**
        if (event.httpMethod === 'OPTIONS') {
            console.log("Solicitud OPTIONS recibida.");
            return response(200, { message: "CORS habilitado." }); // Responde al preflight
        }

        // Validar que el archivo llegue como binario
        if (!event.body || !event.isBase64Encoded) {
            console.error("Archivo no enviado como binario.");
            return response(400, { error: "El archivo no fue enviado como binario o está vacío." });
        }

        // Obtener parámetros desde query string
        const queryParams = event.queryStringParameters || {};
        const fileName = queryParams.fileName; // Nombre del archivo

        if (!fileName) {
            console.error("Falta el nombre del archivo.");
            return response(400, { error: "Falta el nombre del archivo (fileName)." });
        }

        // Validar extensiones permitidas
        const allowedExtensions = ['.csv', '.xlsx'];
        const fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
            console.error(`Formato no permitido: ${fileExtension}`);
            return response(400, { error: `Formato no permitido. Solo se aceptan: ${allowedExtensions.join(', ')}` });
        }

        // Nombre del bucket desde variables de entorno
        const BUCKET_NAME = process.env.BUCKET_NAME;
        if (!BUCKET_NAME) {
            throw new Error("El nombre del bucket no está configurado.");
        }

        // Parámetros para S3
        const params = {
            Bucket: BUCKET_NAME,
            Key: `bank-statements/${Date.now()}_${fileName}`,
            Body: Buffer.from(event.body, 'base64'), // Convierte Base64 a binario
            ContentType: fileExtension === '.csv' ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        };

        console.log("Subiendo archivo a S3 con parámetros:", params);

        // Subir el archivo a S3
        await s3.putObject(params).promise();

        // Respuesta exitosa
        console.log("Archivo subido con éxito.");
        return response(200, {
            message: "Archivo subido con éxito.",
            fileKey: params.Key,
        });

    } catch (error) {
        console.error("Error al subir archivo:", error);
        return response(500, { error: error.message });
    }
};

