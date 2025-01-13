import { putObjectFile } from "../../adapters/secondary/s3.mjs";

export const uploadFileRepo = async (user, file, data) => {
    console.log("Uploading file to S3");
    const response = await putObjectFile(`${user}_${file}`, data);

    if (response.$metadata.httpStatusCode === 200) {
        return {
            httpStatus: 200,
            message: "File uploaded"
        };
    } else {
        return {
            httpStatus: 500,
            message: "Error uploading file"
        };
    }
}