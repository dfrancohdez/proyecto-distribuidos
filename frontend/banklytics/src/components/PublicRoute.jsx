import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Verifica si hay token almacenado

  // Si hay token, redirige al dashboard
  if (token) {
    return <Navigate to="/dashboard" />;
  }

  // Si no hay token, permite el acceso a la página pública
  return children;
};

export default PublicRoute;
