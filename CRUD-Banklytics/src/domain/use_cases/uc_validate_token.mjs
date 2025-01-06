import { validateTokenRepo } from "../repositories/validate_token.mjs";

export const validateTokenUC = async (token) => {
    return await validateTokenRepo(token);
}