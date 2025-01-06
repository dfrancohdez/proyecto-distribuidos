import { addFile } from "../../adapters/secondary/dynamodb.mjs";

export const addFileRepo = async(stage, user, file) => {
    return await addFile(stage, user, file);
}