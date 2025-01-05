export const response = (statusCode, body) => {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // Cambia "*" por tu dominio si es necesario
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
            "Access-Control-Allow-Headers": "Content-Type,Authorization",
        },
        body: JSON.stringify(body),
    };
};
