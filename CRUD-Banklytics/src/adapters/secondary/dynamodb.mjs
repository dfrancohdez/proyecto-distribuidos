import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient, PutCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });
const doClient = DynamoDBDocumentClient.from(client);

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0'); // Obtener día y agregar ceros iniciales
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Obtener mes y agregar ceros iniciales
    const year = date.getFullYear(); // Obtener año
    return `${day}-${month}-${year}`; // Retornar la fecha en formato DD-MM-YYYY
}

export const getAllFiles = async(stage, user) => {
    const params = {
        TableName: `${stage}-banklytics-db`,
        KeyConditionExpression: "pk = :pk",
        ExpressionAttributeValues: {
            ":pk": `USR#${user}`, //Valores de variables
        },
        ConsistentRead: true 
    }

    const command = new QueryCommand(params);
    const response = await doClient.send(command);
    return response; //Si no hay items, regresa un arreglo vacío
}

export const addFile = async(stage, user, file) => {
    const params = {
        TableName: `${stage}-banklytics-db`,
        Item: {
            pk: `USR#${user}`,
            sk: `${file}`,
            uploadDate: formatDate(new Date())
        },
        ReturnValues: "ALL_OLD",
        ConditionExpression: "attribute_not_exists(sk)",
    }

    const command = new PutCommand(params);
    try {
        const response = await doClient.send(command);
        return response;
    } catch (error) {
        if (error.name === "ConditionalCheckFailedException") {
            return {message: "File already exists"};
        }
        return error;
    }
}

export const deleteFile = async(stage, user, file) => {
    const params = {
        TableName: `${stage}-banklytics-db`,
        Key: {
            pk: `USR#${user}`,
            sk: `${file}`,
        },
        ReturnValues: "ALL_OLD",
        ConditionExpression: "attribute_exists(sk)",
    }

    const command = new DeleteCommand(params);
    try {
        const response = await doClient.send(command);
        return response;
    } catch (error) {
        if (error.name === "ConditionalCheckFailedException") {
            return { httpStatus: 404, message: "Product not found" };
        }
        return error;
    }
}
