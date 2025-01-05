// auth.js

const API_URL = import.meta.env.VITE_API_URL;

// **Función para registrar usuario**
export async function registerUser(data) {
    const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return response.json();
}

// **Función para iniciar sesión**
export async function loginUser(data) {
    const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return response.json();
}

// **Función para recuperar cuenta**
export async function forgotPassword(email) {
    const response = await fetch(`${API_URL}/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });
    return response.json();
}

// **Función para restablecer contraseña**
export async function resetPassword(email, code, password) {
    const response = await fetch(`${API_URL}/users/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, password }),
    });
    return response.json();
}

// **Función para confirmar correo electrónico**
export async function confirmEmail(data) {
    const response = await fetch(`${API_URL}/users/confirm-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // { email, code }
    });
    return response.json();
}

// **Función para actualizar el perfil del usuario**
export async function updateUser(data) {
    const response = await fetch(`${API_URL}/users/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return response.json();
}

