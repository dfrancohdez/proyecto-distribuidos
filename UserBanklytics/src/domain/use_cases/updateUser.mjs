import { cognito, USER_POOL_ID } from '../../config/awsConfig.mjs';
import { response } from '../../utils/response.mjs';

export const updateUser = async (event) => {
    try {
        const body = JSON.parse(event.body || '{}');
        const { email, name } = body;

        const params = {
            UserPoolId: USER_POOL_ID,
            Username: email,
            UserAttributes: [{ Name: 'name', Value: name }],
        };

        await cognito.adminUpdateUserAttributes(params).promise();
        return response(200, { message: 'Usuario actualizado con éxito.' });
    } catch (error) {
        return response(400, { error: error.message });
    }
};

