import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import { CognitoJwtVerifier } from "aws-jwt-verify";

const verifier = CognitoJwtVerifier.create({
    userPoolId: "us-east-1_Um7HlhofP",
    tokenUse: "id",
    clientId: "2i7josdnsh1honiqfpgniq0ruc",
});

export const validateToken = async (token) => {
    try {
        const payload = await verifier.verify(token);
        //console.log("Token is valid. Payload:", payload);
        return payload;
    } catch (err) {
        //console.error("Token not valid!", err);
        return null;
    }
}

// Configuración inicial
dotenv.config();
AWS.config.update({ region: process.env.AWS_R });

const s3 = new AWS.S3();

// Respuesta estándar
const response = (statusCode, body) => {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // Habilita CORS
            "Access-Control-Allow-Methods": "OPTIONS,POST",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Credentials": true,
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
            return response(200, { message: "CORS habilitado." });
        }

        // Validar encabezado de autorización
        const authHeader = event.headers["x-token"];
        if (!authHeader) {
            console.error("Falta el encabezado de autorización.");
            return response(401, { error: "No autorizado. Falta el token." });
        }

        // Decodificar el token para obtener el ID del usuario
        const token = authHeader; // Asume formato "Bearer <token>"
        let userId;
        try {
            const decoded = await validateToken(authHeader); // Reemplaza con tu clave secreta JWT
            userId = decoded["cognito:username"]; // Cambia "id" si tu token tiene otra estructura
        } catch (err) {
            console.error("Token inválido:", err);
            return response(401, { error: "Token inválido o expirado." });
        }

        console.log("ID del usuario extraído del token:", userId);

        // Validar que el archivo llegue como binario
        if (!event.body || !event.isBase64Encoded) {
            console.error("Archivo no enviado como binario.");
            return response(400, { error: "El archivo no fue enviado como binario o está vacío." });
        }

        // Obtener parámetros desde query string
        const queryParams = event.queryStringParameters || {};
        const fileName = event.headers["x-file-name"]; // Nombre del archivo

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
            Key: `${userId}_${fileName}`, // Usar el ID del usuario en lugar de la fecha
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


