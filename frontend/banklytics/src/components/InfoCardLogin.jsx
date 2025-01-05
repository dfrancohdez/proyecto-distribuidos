import "../styles/InfoCardLogin.css";

function InfoCard({ title, logoText, description }) {
  return (
    <div className="flex flex-col justify-center items-center bgPurpple text-white p-8 rounded-3xl LoginCard mx-auto">
      <h2 className="text-lg mb-2">Banklytics</h2>
      <div className="text-4xl mb-4">{logoText}</div>
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
