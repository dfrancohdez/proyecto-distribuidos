import { putObjectFile } from "../../adapters/secondary/s3.mjs";

export const uploadFileRepo = async (user, file, data, stage) => {
    console.log("Uploading file to S3");
    const bucket = stage === "prod" ? "banklytics-storage" : "movements-files-banklytics"
    const response = await putObjectFile(`${user}_${file}`, data, bucket);

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