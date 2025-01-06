import { S3Client, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({ region: "us-east-1" });

export const deleteFileS3 = async(key) => {
    const params = {
        Bucket: "banklytics-storage",
        Key: key,
    }

    const command = new DeleteObjectCommand(params);
    try {
        const response = await client.send(command);
        return response;
    } catch (error) {
        return { message: "Error deleting file", error: error.message };
    }
}

export const getObjectFile = async(key) => {
    const params = {
        Bucket: "banklytics-storage",
        Key: key,
    }

    const command = new GetObjectCommand(params);
    try {
        const response = await client.send(command);
        return response;
    } catch (error) {
        return { message: "Error getting file", error: error.message };
    }
}