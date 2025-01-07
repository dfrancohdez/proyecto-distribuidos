import { S3Client, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({ region: "us-east-1" });

export const deleteFileS3 = async(key) => {
    const params1 = {
        Bucket: "banklytics-storage",
        Key: `processed/${key}`,
    }

    const params2 = {
        Bucket: "banklytics-storage",
        Key: `incoming/${key}`,
    }

    const command1 = new DeleteObjectCommand(params1);
    const command2 = new DeleteObjectCommand(params2);
    try {
        const response1 = await client.send(command1);
        const response2 = await client.send(command2);
        return response2;
    } catch (error) {
        return { message: "Error deleting file", error: error.message };
    }
}

export const getObjectFile = async(key) => {
    const params = {
        Bucket: "banklytics-storage",
        Key: `processed/${key}`,
    }

    const command = new GetObjectCommand(params);
    try {
        const response = await client.send(command);
        return response;
    } catch (error) {
        return { message: "Error getting file", error: error.message };
    }
}