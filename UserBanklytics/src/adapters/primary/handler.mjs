import { registerUser } from '../../domain/use_cases/registerUser.mjs';
import { loginUser } from '../../domain/use_cases/loginUser.mjs';
import { updateUser } from '../../domain/use_cases/updateUser.mjs';
import { forgotPassword } from '../../domain/use_cases/forgotPassword.mjs';
import { resetPassword } from '../../domain/use_cases/resetPassword.mjs';
import { confirmEmail } from '../../domain/use_cases/confirmEmail.mjs';
import { response } from '../../utils/response.mjs';

export const handler = async (event) => {
    try {
        const route = event.routeKey || event.resource || '';

        if (route.includes('register')) {
            return await registerUser(event);
        } else if (route.includes('login')) {
            return await loginUser(event);
        } else if (route.includes('update')) {
            return await updateUser(event);
        } else if (route.includes('forgot-password')) {
            return await forgotPassword(event);
        } else if (route.includes('reset-password')) {
            return await resetPassword(event);
        } else if (route.includes('confirm-email')) {
            return await confirmEmail(event);
        } else {
            return response(404, { error: 'Ruta no válida.' });
        }
    } catch (error) {
        return response(400, { error: error.message });
    }
};



