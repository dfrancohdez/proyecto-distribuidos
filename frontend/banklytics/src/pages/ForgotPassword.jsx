import { useState } from "react";

function ForgotPassword() {
  // Estados para los pasos y datos
  const [step, setStep] = useState(1); // Controla el paso actual
  const [email, setEmail] = useState(""); // Almacena el email
  const [code, setCode] = useState(""); // Almacena el código
  const [storedCode, setStoredCode] = useState(""); // Código almacenado temporalmente
  const [password, setPassword] = useState(""); // Nueva contraseña
  const [success, setSuccess] = useState(false); // Estado para confirmar éxito

  // **Paso 1: Enviar código al correo**
  const handleForgotPassword = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert(result.message || "Código enviado al correo.");
        setStep(2); // Avanza al paso 2
      } else {
        alert(result.error || "Error al enviar el código.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error.");
    }
  };

  // **Paso 2: Validar código ingresado**
  const handleValidateCode = async (event) => {
    event.preventDefault();

    if (!code || code.trim().length !== 6) {
      alert("Código inválido. Debe ser de 6 dígitos.");
      return;
    }

    setStoredCode(code.trim()); // Almacena el código temporalmente
    alert("Código validado. Continúa con el cambio de contraseña.");
    setStep(3); // Avanza al paso 3
  };

  // **Paso 3: Restablecer contraseña**
  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (!password || password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code: storedCode, password }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setSuccess(true); // Muestra el mensaje final
        setStep(4); // Avanza al paso 4 (Confirmación final)
      } else {
        alert(result.error || "Error al restablecer contraseña.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error.");
    }
  };

  return (
    <div className="flex h-screen w-full kodchasan-extralight">
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-8">
        {/* Paso 1: Enviar código */}
        {step === 1 && (
          <>
            <h1 className="text-4xl textPurpple mb-8">Recuperar contraseña</h1>
            <form className="w-full max-w-sm" onSubmit={handleForgotPassword}>
              <input
                type="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-500"
              />
              <button
                type="submit"
                className="flex justify-center items-center mx-auto mt-6 px-4 py-2 bgPurpple text-white rounded-full hover:bg-white hover:textPurpple transition duration-200"
              >
                Enviar código
              </button>
            </form>
          </>
        )}

        {/* Paso 2: Validar código */}
        {step === 2 && (
          <>
            <h1 className="text-4xl textPurpple mb-8">Validar código</h1>
            <form className="w-full max-w-sm" onSubmit={handleValidateCode}>
              <input
                type="text"
                placeholder="Código de verificación"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-500"
              />
              <button
                type="submit"
                className="flex justify-center items-center mx-auto mt-6 px-4 py-2 bgPurpple text-white rounded-full hover:bg-white hover:textPurpple transition duration-200"
              >
                Validar código
              </button>
            </form>
          </>
        )}

        {/* Paso 3: Restablecer contraseña */}
        {step === 3 && (
          <>
            <h1 className="text-4xl textPurpple mb-8">
              Restablecer contraseña
            </h1>
            <form className="w-full max-w-sm" onSubmit={handleResetPassword}>
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-500"
              />
              <button
                type="submit"
                className="flex justify-center items-center mx-auto mt-6 px-4 py-2 bgPurpple text-white rounded-full hover:bg-white hover:textPurpple transition duration-200"
              >
                Restablecer contraseña
              </button>
            </form>
          </>
        )}

        {/* Paso 4: Confirmación final */}
        {step === 4 && success && (
          <>
            <h1 className="text-4xl textPurpple mb-8">
              Contraseña restablecida
            </h1>
            <p className="text-gray-500 mb-8">
              Tu contraseña ha sido restablecida con éxito.
            </p>
            <a
              href="/"
              className="px-4 py-2 bgPurpple text-white rounded-full hover:bg-white hover:textPurpple transition duration-200"
            >
              Ir al inicio de sesión
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
