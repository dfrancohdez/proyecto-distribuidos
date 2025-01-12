import { getAllFiles } from "../../adapters/secondary/dynamodb.mjs";

export const getAllFilesRepo = async(stage, user) => {
    console.log("Getting all user files");
    const query = await getAllFiles(stage, user);
    if (query.Items) {
        const items = query.Items;
        const formatted = items.map((item) => ({
            filename: item.sk,
            uploadDate: item.uploadDate
        }));
        return { httpStatus: 200, message: formatted };
    } else {
        return { httpStatus: 404, message: "No products found" };
    }
}