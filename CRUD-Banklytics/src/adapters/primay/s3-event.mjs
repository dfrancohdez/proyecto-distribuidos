import { addFileUC } from "../../domain/use_cases/uc_addFile.mjs";

export const s3Event = async (event) => {
    const stage = "dev";

    const createdObj = event.Records[0].s3.object.key;
    const eventName = event.Records[0].eventName;

    if (eventName !== "ObjectCreated:Put") {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Not a Put event" }),
        };
    }

    const parts = createdObj.split("_");
    const user = parts[0];
    const file = parts[1];

    const response = await addFileUC(stage, user, file);
    return response;
}