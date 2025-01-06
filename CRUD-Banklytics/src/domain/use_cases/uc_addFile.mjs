import { addFile } from "../../adapters/secondary/dynamodb.mjs";

export const addFileUC = async(stage, user, file) => {
    return await addFile(stage, user, file);
}