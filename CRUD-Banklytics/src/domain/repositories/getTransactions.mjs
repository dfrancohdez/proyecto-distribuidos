import { getObjectFile } from "../../adapters/secondary/s3.mjs";

export const getTransactionsRepo = async (user, file, stage) => {
    const bucket = stage === "prod" ? "banklytics-storage" : "movements-files-banklytics"
    return await getObjectFile(`${user}_${file}`, bucket);
}