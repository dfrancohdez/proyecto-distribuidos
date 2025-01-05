import { cognito, CLIENT_ID } from '../../config/awsConfig.mjs';
import { response } from '../../utils/response.mjs';

export const registerUser = async (event) => {
    try {
        const body = JSON.parse(event.body || '{}');
        const { email, password, name } = body;

        const params = {
            ClientId: CLIENT_ID,
            Username: email,
            Password: password,
            UserAttributes: [
                { Name: 'email', Value: email },
                { Name: 'name', Value: name },
            ],
        };

        await cognito.signUp(params).promise();
        return response(201, { message: 'Registro exitoso. Revisa tu correo para confirmar tu cuenta.' });
    } catch (error) {
        return response(400, { error: error.message });
    }
};
