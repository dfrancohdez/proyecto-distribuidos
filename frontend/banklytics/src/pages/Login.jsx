import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import InputField from "../components/InputField";
import Button from "../components/Button";
import InfoCard from "../components/InfoCardLogin";
import { toast } from "react-toastify";
import "../styles/Kodchasan.css";
import "../styles/Colors.css";
import { loginUser } from "../api/auth"; // Importar la función de login

function Login() {
  // Estados para capturar datos
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Declarar navigate

  // Manejar el envío del formulario
  const handleLogin = async (event) => {
    event.preventDefault(); // Evita recargar la página

    const data = {
      email,
      password,
    };

    // console.log("Datos enviados:", data); // Log para validar los datos antes de enviarlos

    try {
      const response = await loginUser(data); // Llamada a la API para iniciar sesión

      const result = await response.json();
      // console.log("Respuesta del servidor:", result);

      if (response.ok) {
        //alert("Inicio de sesión exitoso");
        toast.success("Inicio de sesión exitoso", {
          position: "bottom-center",
          
        });
        // Guardar los datos en localStorage
        localStorage.setItem("token", result.token); // Token
        localStorage.setItem("username", result.username); // Nombre
        localStorage.setItem("email", result.email); // Correo

        // Redirige al dashboard
        navigate("/dashboard");
      } else {
        //alert(result.error || "Error en el inicio de sesión");
        toast.error(result.error || "Error en el inicio de sesión", {
          position: "bottom-center",
                            
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="flex h-screen w-full kodchasan-extralight">
      {/* Sección izquierda */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-8">
        <h1 className="text-4xl textPurpple mb-8">Inicio de sesión</h1>
        <form className="w-full max-w-sm" onSubmit={handleLogin}>
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
            text="Ingresar"
          />
        </form>
        <div className="flex justify-between text-sm text-gray-500 mt-6 w-full max-w-sm">
          <a
            href="/register"
            className="hover:textPurpple transform hover:scale-110 transition-transform duration-300"
          >
            Registrarse
          </a>
          <a
            href="/forgot-password"
            className="hover:textPurpple transform hover:scale-110 transition-transform duration-300"
          >
            Olvide mi contraseña
          </a>
        </div>
      </div>

      {/* Sección derecha */}
      <div className="flex-1 flex flex-col h-full rounded-2xl justify-center items-center">
        <div className="justify-center items-center flex flex-col h-screen">
          <InfoCard
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

export default Login;
