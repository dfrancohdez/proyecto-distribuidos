import { getAllFilesUC } from "../../domain/use_cases/uc_getAllFiles.mjs";
import { deleteFileUC } from "../../domain/use_cases/uc_deleteFile.mjs";
import { validateTokenUC } from "../../domain/use_cases/uc_validate_token.mjs";
import { getTransactionsUC } from "../../domain/use_cases/uc_getTransactions.mjs";

export const apiFiles = async (event) => {
    const headers = event["headers"];
    const xMytoken = headers["x-token"];

    const response = (statusCode, body) => {
        return {
            statusCode,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
              "Access-Control-Allow-Headers": "Content-Type,Authorization,x-token,x-file-name",
            },
            body: JSON.stringify(body),
        };
    };

    const stage = event.requestContext.stage;
    const resource = event.resource;
    const method = event.httpMethod;
    const payload = await validateTokenUC(xMytoken);
    if (!payload) {
        return response(401, { message: "Invalid token" });
    }

    const user = payload["cognito:username"];
    
    try{
        if(resource === "/bank-statements/files") {
          if(method === "GET") {
            const productItems = await getAllFilesUC(stage, user);
            return response(productItems.httpStatus, { files: productItems.message });
          } else{
            return response(405, { message: "Method not allowed" });
          }
        } else if(resource === "/bank-statements/files/{keyArchivo}"){
          const file = event.pathParameters.keyArchivo;
          if(method === "DELETE") {
            const deletedProduct = await deleteFileUC(stage, user, file);
            return response(deletedProduct.httpStatus, { file: deletedProduct.message });
          } else if(method === "GET") {
            const transactions = await getTransactionsUC(user, file);

            if (transactions.transactions) {
              return response(200, { data: transactions.transactions });
            } else {
              return response(500, { message: "Error getting transactions", error: transactions.error });
            }
            
          } else{
            return response(405, { message: "Method not allowed" });
          }
        } else{
          return response(404, { message: "Resource not found" });
        }
      } catch(err){
        console.error("Error processing request", err);
        return response(500, { message: "Error processing request", error: err.message });
    }
}