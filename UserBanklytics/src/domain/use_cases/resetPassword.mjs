import { cognito, CLIENT_ID } from '../../config/awsConfig.mjs';
import { response } from '../../utils/response.mjs';

export const resetPassword = async (event) => {
    try {
        const body = JSON.parse(event.body || '{}');
        const { email, code, password } = body;

        const params = {
            ClientId: CLIENT_ID,
            Username: email,
            ConfirmationCode: code,
            Password: password,
        };

        await cognito.confirmForgotPassword(params).promise();
        return response(200, { message: 'Contraseña restablecida con éxito.' });
    } catch (error) {
        return response(400, { error: error.message });
    }
};
