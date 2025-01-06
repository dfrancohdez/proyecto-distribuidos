
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
    }
};

function TableCard() {
  //datos
  const [tableData, setTableData] = useState([
    [ '2024-05-06', '1971.6','Pago de servicios', 'ES5485-2558-7876-3521' , 'ES5485-2558-7876-3521'],
    [ '2024-05-24', '300','Pago de servicios', 'ES5485-2558-7876-3521', 'ES5485-2558-7876-3521' ],
    // ...
  ]);

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
      <div className="border rounded-lg p-2 text-sm text-gray-500">
        <DataTable options={options} data={tableData} className="display">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Concepto</th>
              <th>Orígen</th>
              <th>Destino</th>
            </tr>
          </thead>
        </DataTable>
      </div>
    </div>
  );
}

export default TableCard;
