import { apiFiles } from "./src/adapters/primay/apigtw-event.mjs";
import { s3Event } from "./src/adapters/primay/s3-event.mjs";

export const handler = async (event, context) => {
    console.log("***EVENT:",event);
    console.log("***CONTEXT:",context);
  
    if (event["resource"]) {
      return await apiFiles(event);
    } else if (event.Records[0].s3) {
      return await s3Event(event);
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Bad Request" })
      };
    }
  }