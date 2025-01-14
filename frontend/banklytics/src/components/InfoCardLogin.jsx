import "../styles/InfoCardLogin.css";
import logoImage from "../assets/LogoWhite.png"; // Ruta al logo en src/assets/images

function InfoCard({ title, description }) {
  return (
    <div className="flex flex-col justify-center items-center bgPurpple text-white p-8 rounded-3xl LoginCard mx-auto">
      <h2 className="text-lg mb-2">Banklytics</h2>
      {/* Renderizar el logo */}
      <img src={logoImage} alt="Banklytics Logo" className="w-60 h-60 mb-4" />
      <p className="text-center text-sm leading-relaxed">
        Accede a tu espacio seguro para analizar tus movimientos bancarios.
        Gestiona tus archivos, consulta estadísticas y descubre patrones con
        tecnología de Machine Learning. Todo en un solo lugar, fácil y rápido.
        ¡Empieza ahora!
      </p>
    </div>
  );
}

export default InfoCard;
