function TableCategories() {
  return (
    <div className="p-4 bg-white">
      {/* Encabezado con botón */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg">Tabla de movimientos por categoría</h3>
      </div>
      {/* Contenido de la tabla */}
      <div className="h-48 border rounded-lg p-2 text-sm text-gray-500">
        Aquí van los movimientos cargados.
      </div>
    </div>
  );
}

export default TableCategories;
