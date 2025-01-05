function FileList() {
  const files = ["Archivo 1", "Archivo 2", "Archivo 3"];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-full">
      {/* Título con raya horizontal */}
      <h3 className="text-purple-600 text-lg mb-4 border-b pb-4">
        Mis archivos
      </h3>

      {/* Lista de archivos */}
      <ul className="space-y-4">
        {files.map((file, index) => (
          <li key={index} className="flex justify-between items-center">
            {/* Nombre del archivo */}
            <span className="text-gray-400 text-sm">{file}</span>
            {/* Botón Eliminar */}
            <button className="px-4 py-1 text-sm bg-red-300 text-white rounded-full hover:bg-red-400 transition duration-200">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;
