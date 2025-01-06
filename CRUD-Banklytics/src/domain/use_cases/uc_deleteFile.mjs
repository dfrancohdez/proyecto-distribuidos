import { deleteFileRepo } from "../repositories/deleteFile.mjs";

export const deleteFileUC = async(stage, user, file) => {
    return await deleteFileRepo(stage, user, file);
}