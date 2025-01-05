import { cognito, CLIENT_ID } from '../../config/awsConfig.mjs';
import { response } from '../../utils/response.mjs';

export const forgotPassword = async (event) => {
    try {
        const body = JSON.parse(event.body || '{}');
        const { email } = body;

        const params = {
            ClientId: CLIENT_ID,
            Username: email,
        };

        await cognito.forgotPassword(params).promise();
        return response(200, { message: 'Código enviado al correo.' });
    } catch (error) {
        return response(400, { error: error.message });
    }
};
