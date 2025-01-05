function TableCard() {
  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white">
      {/* Encabezado con botón */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg">Tabla de movimientos</h3>
        <button className="px-4 py-1 text-sm bgPurpple text-white rounded-full hover:bg-white hover:textPurpple hover:borderPurpple transition duration-200">
          Ver más
        </button>
      </div>
      {/* Contenido de la tabla */}
      <div className="h-48 border rounded-lg p-2 text-sm text-gray-500">
        Aquí van los movimientos cargados.
      </div>
    </div>
  );
}

export default TableCard;
