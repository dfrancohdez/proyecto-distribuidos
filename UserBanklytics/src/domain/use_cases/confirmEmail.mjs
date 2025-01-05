import { cognito, CLIENT_ID } from '../../config/awsConfig.mjs';
import { response } from '../../utils/response.mjs';

export const confirmEmail = async (event) => {
    try {
        const body = JSON.parse(event.body || '{}');
        const { email, code } = body;

        const params = {
            ClientId: CLIENT_ID,
            Username: email,
            ConfirmationCode: code,
        };

        await cognito.confirmSignUp(params).promise();
        return response(200, { message: 'Correo confirmado con éxito.' });
    } catch (error) {
        return response(400, { error: error.message });
    }
};
