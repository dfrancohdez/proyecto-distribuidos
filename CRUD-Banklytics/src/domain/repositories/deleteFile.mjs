import { deleteFile } from "../../adapters/secondary/dynamodb.mjs";
import { deleteFileS3 } from "../../adapters/secondary/s3.mjs";

export const deleteFileRepo = async(stage, user, file) => {
    const response = await deleteFile(stage, user, file);
    const responseS3 = await deleteFileS3(`${user}_${file}`);

    if (response.message) {
        return response;
    } else {
        if (response.Attributes && responseS3.$metadata) {
            const deletedFile = {
                filename: item.sk
            };

            return {
                httpStatus: 200,
                message: deletedFile
            };    
        } else {
            return {
                httpStatus: 500,
                message: "Error deleting file"
            };
        }
    }
}