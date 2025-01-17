import { useState } from "react";
import { toast } from "react-toastify";
import { forgotPassword, resetPassword } from "../api/auth";

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
      const response = await forgotPassword(email); // Llamada a la API para enviar código

      const result = await response.json();
      if (response.ok) {
        //alert(result.message || "Código enviado al correo.");
        toast.success(result.message || "Código enviado al correo.", {
          position: "bottom-center",
          
        });
        setStep(2); // Avanza al paso 2
      } else {
        //alert(result.error || "Error al enviar el código.");
        toast.error(result.error || "Error al enviar el código.", {
          position: "bottom-center",
                            
        });
      }
    } catch (error) {
      console.error("Error:", error);
      //alert("Hubo un error.");
      toast.error("Hubo un error.", {
        position: "bottom-center",               
      });
    }
  };

  // **Paso 2: Validar código ingresado**
  const handleValidateCode = async (event) => {
    event.preventDefault();

    if (!code || code.trim().length !== 6) {
      //alert("Código inválido. Debe ser de 6 dígitos.");
      toast.error("Código inválido. Debe ser de 6 dígitos.", {
        position: "bottom-center",               
      });
      return;
    }

    setStoredCode(code.trim()); // Almacena el código temporalmente
    //alert("Código validado. Continúa con el cambio de contraseña.");
    toast.success("Código validado. Continúa con el cambio de contraseña.", {
      position: "bottom-center",
                        
    });
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
      const response = await resetPassword(email, storedCode, password); // Llamada a la API para restablecer contraseña

      const result = await response.json();
      if (response.ok) {
        setSuccess(true); // Muestra el mensaje final
        setStep(4); // Avanza al paso 4 (Confirmación final)
      } else {
        //alert(result.error || "Error al restablecer contraseña.");
        toast.error(result.error || "Error al restablecer contraseña.", {
          position: "bottom-center",
                            
        });
      }
    } catch (error) {
      console.error("Error:", error);
      //alert("Hubo un error.");
      toast.error("Hubo un error.", {
        position: "bottom-center",
                          
      });
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
