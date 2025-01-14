import { uploadFileRepo } from "../repositories/uploadFile.mjs";

export const uploadFileUC = async (user, file, data, stage) => {
    return await uploadFileRepo(user, file, data, stage);
}