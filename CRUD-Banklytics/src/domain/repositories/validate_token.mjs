import { validateToken } from "../../adapters/secondary/cognito.mjs";

export const validateTokenRepo = async (token) => {
    const response = await validateToken(token);
    return response;
}