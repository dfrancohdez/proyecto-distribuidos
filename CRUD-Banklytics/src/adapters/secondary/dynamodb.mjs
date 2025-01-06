import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient, PutCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });
const doClient = DynamoDBDocumentClient.from(client);

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
