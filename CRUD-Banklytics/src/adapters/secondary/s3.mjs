import { S3Client, DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({ region: "us-east-1" });

export const deleteFileS3 = async(key, bucket) => {
    const params1 = {
        Bucket: `${bucket}`,
        Key: `processed/${key}`,
    }

    const params2 = {
        Bucket: `${bucket}`,
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

export const getObjectFile = async(key, bucket) => {
    const params = {
        Bucket: `${bucket}`,
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

export const putObjectFile = async(key, body, bucket) => {
    const fileExtension = key.substring(key.lastIndexOf('.')).toLowerCase();
    const params = {
        Bucket: `${bucket}`,
        Key: `incoming/${key}`,
        Body: body,
        ContentType: fileExtension === '.csv' ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }

    const command = new PutObjectCommand(params);
    try {
        const response = await client.send(command);
        return response;
    } catch (error) {
        return { message: "Error putting file", error: error.message };
    }
}