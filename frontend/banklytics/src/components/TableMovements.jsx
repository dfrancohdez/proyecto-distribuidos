

import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
//import DT from 'datatables.net-bs5';

import { useState } from 'react';
DataTable.use(DT);

const options = {
    language: {
      processing: "Procesando...",
      search: "Buscar:",
      lengthMenu: "Mostrar _MENU_ registros",
      info: "Mostrando del _START_ al _END_ de _TOTAL_ registros",
      infoEmpty: "Mostrando 0 registros",
      infoFiltered: "(filtrado de _MAX_ registros totales)",
      loadingRecords: "Cargando registros...",
      zeroRecords: "No se encontraron resultados",
      emptyTable: "No hay datos disponibles en la tabla",
      paginate: {
        first: "Primero",
        previous: "Anterior",
        next: "Siguiente",
        last: "Último"
      }
    },
    columns: [
      { title: "Fecha", data: "Fecha" },
      { title: "Monto", data: "Monto" },
      { title: "Concepto", data: "Concepto" },
      { title: "Clase", data: "Clase" },
    ],
    pageLength: 5, // Número inicial de filas por página
    lengthMenu: [2, 5, 10, 20, 50], // Opciones de paginación personalizadas
};

function TableMovements({tableData}) {



  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white">
      {/* Encabezado con botón */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg">Movimientos Ordenados</h2>
      </div>
      {/* Contenido de la tabla */}
      <div className="border rounded-lg p-2 text-sm text-gray-500">
        <DataTable  columns={options.columns} options={options} data={tableData} className="display"/>
      </div>
    </div>
  );
}

export default TableMovements;

