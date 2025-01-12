import { uploadFileRepo } from "../repositories/uploadFile.mjs";

export const uploadFileUC = async (user, file, data) => {
    return await uploadFileRepo(user, file, data);
}