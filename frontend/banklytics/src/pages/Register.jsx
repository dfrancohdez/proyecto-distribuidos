import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar el hook
import InputField from "../components/InputField";
import Button from "../components/Button";
import InfoCardRegister from "../components/InfoCardRegister";
import { toast } from "react-toastify";
import "../styles/Kodchasan.css";
import "../styles/Colors.css";
import { registerUser, confirmEmail } from "../api/auth";

function Register() {
  // Estados para capturar datos
  const [step, setStep] = useState(1); // Controlar el paso actual
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState(""); // Código de verificación
  const navigate = useNavigate();

  // **Paso 1: Registro del usuario**
  const handleRegister = async (event) => {
    event.preventDefault(); // Evita recargar la página

    const data = {
      name,
      email,
      password,
    };

    // console.log("Datos enviados:", data); // Log para validar los datos antes de enviarlos

    try {
      const response = await registerUser(data); // Llamada a la API para registrar usuario

      const result = await response.json();
      // console.log("Respuesta del servidor:", result);

      if (response.ok) {
        //alert("Registro exitoso. Se ha enviado un código de confirmación.");
        toast.success("Registro exitoso. Se ha enviado un código de confirmación.", {
          position: "bottom-center",
          
        });
        setStep(2); // Avanza al siguiente paso (confirmar código)
      } else {
        //alert(result.error || "Error en el registro");
        toast.error(result.error || "Error en el registro", {
          position: "bottom-center",
                            
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  // **Paso 2: Confirmar el código**
  const handleConfirmCode = async (event) => {
    event.preventDefault();

    try {
      const response = await confirmEmail({ email, code }); // Llamada a la API para confirmar el código

      const result = await response.json();
      // console.log("Respuesta del servidor:", result);

      if (response.ok) {
        //alert("Correo confirmado con éxito. Ahora puedes iniciar sesión.");
        toast.success("Correo confirmado con éxito. Ahora puedes iniciar sesión.", {
          position: "bottom-center",
          
        });
        navigate("/"); // Redirige al login
      } else {
        //alert(result.error || "Error al confirmar el código.");
        toast.error(result.error || "Error al confirmar el código.", {
          position: "bottom-center",
                            
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="flex h-screen w-full kodchasan-extralight">
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-8">
        {step === 1 && (
          <>
            <h1 className="text-4xl textPurpple mb-8">Registro</h1>
            <form className="w-full max-w-sm" onSubmit={handleRegister}>
              <InputField
                label="Nombre"
                type="text"
                placeholder="Ingresa tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputField
                label="Correo"
                type="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                label="Contraseña"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                className="flex justify-center items-center mx-auto mt-6"
                text="Registrar"
              />
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-4xl textPurpple mb-8">Confirmar Código</h1>
            <form className="w-full max-w-sm" onSubmit={handleConfirmCode}>
              <InputField
                label="Código"
                type="text"
                placeholder="Ingresa el código recibido"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <Button
                className="flex justify-center items-center mx-auto mt-6"
                text="Confirmar"
              />
            </form>
          </>
        )}

        <div className="flex justify-between text-sm text-gray-500 mt-6 w-full max-w-sm">
          <a
            href="/"
            className="hover:textPurpple transform hover:scale-110 transition-transform duration-300"
          >
            Iniciar sesión
          </a>
          <a
            href="/forgot-password"
            className="hover:textPurpple transform hover:scale-110 transition-transform duration-300"
          >
            Olvide mi contraseña
          </a>
        </div>
      </div>

      <div className="flex-1 flex flex-col h-full rounded-2xl justify-center items-center">
        <div className="justify-center items-center flex flex-col h-screen">
          <InfoCardRegister
            title="BANKLYTICS"
            logoText="LOGO"
            description="Accede a tu espacio seguro para analizar tus movimientos bancarios.
            Gestiona tus archivos, consulta estadísticas y descubre patrones con
            tecnología de Machine Learning. Todo en un solo lugar, fácil y rápido.
            ¡Empieza ahora!"
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
