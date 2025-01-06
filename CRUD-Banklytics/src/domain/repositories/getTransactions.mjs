import { getObjectFile } from "../../adapters/secondary/s3.mjs";

export const getTransactionsRepo = async (user, file) => {
    return await getObjectFile(`${user}_${file}`);
}