import { getAllFilesRepo } from "../repositories/getAllFiles.mjs";

export const getAllFilesUC = async(stage, user) => {
    return await getAllFilesRepo(stage, user);
}