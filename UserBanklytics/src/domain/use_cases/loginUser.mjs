import { cognito, USER_POOL_ID, CLIENT_ID } from '../../config/awsConfig.mjs';
import { response } from '../../utils/response.mjs';

export const loginUser = async (event) => {
    try {
        const body = JSON.parse(event.body || '{}');
        const { email, password } = body;

        const params = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: CLIENT_ID,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
            },
        };

        const authResponse = await cognito.initiateAuth(params).promise();

        const userParams = {
            UserPoolId: USER_POOL_ID,
            Username: email,
        };

        const userInfo = await cognito.adminGetUser(userParams).promise();
        const name = userInfo.UserAttributes.find(attr => attr.Name === "name")?.Value || "Usuario";
        const emailAttr = userInfo.UserAttributes.find(attr => attr.Name === "email")?.Value || email;

        return response(200, {
            token: authResponse.AuthenticationResult?.IdToken,
            username: name,
            email: emailAttr,
        });
    } catch (error) {
        return response(400, { error: error.message });
    }
};
