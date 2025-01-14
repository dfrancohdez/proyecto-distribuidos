import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChartCard from "../components/ChartCard";
import "../styles/Colors.css";
import "../styles/Dashboard.css"
import "boxicons/css/boxicons.min.css";
import TableCard from "../components/TableCard";

function Dashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const [username, setUsername] = useState("Usuario");
  const [filename, setFilename] = useState("");
  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  });
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [
      {
        label: "Montos por Concepto",
        data: [],
        backgroundColor: [
          "#F87171",
          "#60A5FA",
          "#FACC15",
          "#34D399",
          "#A78BFA",
          "#FF9F40",
          "#36A2EB",
        ],
      },
    ],
  });
  const [lineData, setLineData] = useState({
    labels: [],
    datasets: [
      {
        label: "Frecuencia por Percentil",
        data: [],
        borderColor: "#4BC0C0",
        borderWidth: 2,
        fill: false,
      },
    ],
  });

  const [tableData, setTableData] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const navigate = useNavigate();

  function calcularDistribucionFrecuencia(datos, numIntervalos) {
    const valoresMonto = datos.map(dato => dato.Monto).reverse();
    const dataLen = datos.length;
    const min = Math.min(...valoresMonto);
    const max = Math.max(...valoresMonto);
    const intervaloAncho = (max - min) / numIntervalos;
    const num = Array(101).fill(0).map((_, i) => i);
    const percentiles = Array(101).fill(0).map((_, idx) => {
      if (idx === 0) return min;
      if (idx === 100) return max;

      let x = (dataLen * idx) / 100;

      let E = Math.floor(x);
      let D = x - E;

      let P;
      if (D === 0) {
        P = (valoresMonto[(E-1)] + valoresMonto[(E-1)+1]) / 2;
      } else {
        P = valoresMonto[(E-1)+1];
      }

      return P;
    });

    let indices = [];
    let anterior = 0;
    let valores = []
    percentiles.forEach((valor, idx) => {
      if (idx === 0){
        indices.push(0);
        anterior = valor;
        valores.push(valor);
        return;
      }

      if (idx === 100){
        indices.push(100);
        valores.push(valor);
        return;
      }

      if (valor === anterior){
        return;
      } else {
        indices.push(idx);
        anterior = valor;
        valores.push(valor);
        return;
      }
    });
  
    return { indices: indices, percentiles: valores };
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("sortedData");
    localStorage.removeItem("groupedData");
    localStorage.removeItem("originalData");
    navigate("/");
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    if (localStorage.getItem("sortedData") && localStorage.getItem("groupedData") && localStorage.getItem("originalData") && localStorage.getItem("filename")) {
      const sorted = JSON.parse(localStorage.getItem("sortedData"));
      const grouped = JSON.parse(localStorage.getItem("groupedData"));
      const original = JSON.parse(localStorage.getItem("originalData"));
      const filename = localStorage.getItem("filename");

      handleDataFromSidebar({ filename, original, grouped, sorted });
    }
  }, []);

  const handleDataFromSidebar = ({ filename, original, grouped, sorted }) => {
    console.log("Arreglo original recibido:", original);
    console.log("Arreglo agrupado por clase:", grouped);
    console.log("Arreglo ordenado por monto:", sorted);

    const pieChartLabels = Object.keys(grouped);
    const pieChartData = Object.values(grouped).map((items) => items.length);

    setPieData({
      labels: pieChartLabels,
      datasets: [
        {
          data: pieChartData,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    });

    const barChartLabels = sorted.map((item) => item.Concepto);
    const barChartData = sorted.map((item) => item.Monto);

    setBarData({
      labels: barChartLabels,
      datasets: [
        {
          label: "Montos por Concepto",
          data: barChartData,
          backgroundColor: [
            "#F87171",
            "#60A5FA",
            "#FACC15",
            "#34D399",
            "#A78BFA",
            "#FF9F40",
            "#36A2EB",
          ],
        },
      ],
    });

    const numIntervalos = 100;
    const { indices, percentiles } = calcularDistribucionFrecuencia(sorted, numIntervalos);

    console.log("Percentiles:", percentiles);
    console.log("num:", indices);

    setLineData({
      labels: percentiles,
      datasets: [
        {
          label: "Percentil",
          data: indices,
          borderColor: "#4BC0C0",
          borderWidth: 2,
          fill: false,
        },
      ],
    });

    setTableData(original);
    setGroupedData(grouped);
    setSortedData(sorted);
    setFilename(filename);

    localStorage.setItem("filename", filename);
    localStorage.setItem("originalData", JSON.stringify(original));
    localStorage.setItem("groupedData", JSON.stringify(grouped));
    localStorage.setItem("sortedData", JSON.stringify(sorted));
  };

  const closeMenu = () => setShowMenu(false);

  return (
    <div
      className="flex min-h-screen max-h-full w-full kodchasan-extralight"
      onClick={closeMenu}
    >
      <Sidebar onData={handleDataFromSidebar} />

      <div
        className="flex-1 p-6 bg-gray-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <h1 className="text-2xl text-gray-800">Información General</h1>

          <div className="flex items-center gap-4">
            <i className="bx bxs-user-circle text-2xl text-gray-500 scale-150 hover:textPurpple"></i>
            <span
              className="text-gray-800 hover:textPurpple cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
            >
              {username}
            </span>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                <ul className="py-1">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/profile")}
                  >
                    Ver Perfil
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mb-4 px-4">
          <span className="text-lg text-gray-500 hover:textPurpple cursor-pointer">
            Reporte de archivo: {filename}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">Categorías</h2>
              <button
                className="px-4 py-1 text-sm bgPurpple text-white rounded-full hover:bg-white hover:textPurpple hover:borderPurpple transition duration-200"
                onClick={() =>
                  navigate("/categories", { state: { groupedData } })
                }
              >
                Ver más
              </button>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-72 h-72 mb-4">
                <ChartCard
                  title="Gráfica de Categorías"
                  data={pieData}
                  type="pie"
                />
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow-lg flex flex-col justify-center">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">Movimientos</h2>
              <button
                className="px-4 py-1 text-sm bgPurpple text-white rounded-full hover:bg-white hover:textPurpple hover:borderPurpple transition duration-200"
                onClick={() =>
                  navigate("/movements", { state: { sortedData } })
                }
              >
                Ver más
              </button>
            </div>
            <div className="flex justify-center items-center h-80">
              <div className="w-96 h-80">
                <ChartCard
                  title="Gráfica de Movimientos"
                  data={barData}
                  type="bar"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h1 className="text-xl mb-4">Monto mayor</h1>
            <p className="text-sm text-gray-800"> Concepto: {sortedData[0]?.Concepto}</p>
            <p className="text-sm text-gray-800"> Monto: $ {sortedData[0]?.Monto}</p>
            <p className="text-sm text-gray-800"> Fecha: {sortedData[0]?.Fecha}</p>
            <p className="text-sm text-gray-800"> Categoría: {sortedData[0]?.Clase}</p>
            <p className="text-sm text-gray-800"> Cuenta origen: {sortedData[0]? sortedData[0]["Cuenta Bancaria Origen"] : null}</p>
            <p className="text-sm text-gray-800"> Cuenta Destino: {sortedData[0]? sortedData[0]["Cuenta Bancaria Destino"] : null}</p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h1 className="text-xl mb-4">Monto menor</h1>
            <p className="text-sm text-gray-800"> Concepto: {sortedData[sortedData.length-1]?.Concepto}</p>
            <p className="text-sm text-gray-800"> Monto: $ {sortedData[sortedData.length-1]?.Monto}</p>
            <p className="text-sm text-gray-800"> Fecha: {sortedData[sortedData.length-1]?.Fecha}</p>
            <p className="text-sm text-gray-800"> Categoría: {sortedData[sortedData.length-1]?.Clase}</p>
            <p className="text-sm text-gray-800"> Cuenta origen: {sortedData[sortedData.length-1]? sortedData[sortedData.length-1]["Cuenta Bancaria Origen"] : null}</p>
            <p className="text-sm text-gray-800"> Cuenta Destino: {sortedData[sortedData.length-1]? sortedData[sortedData.length-1]["Cuenta Bancaria Destino"] : null}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6">
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Percentiles</h2>
            <div className="w-full h-80">
              <ChartCard
                title="Gráfica de Percentiles"
                data={lineData}
                type="line"
              />
            </div>
          </div>
        </div>

        <TableCard tableData={tableData}/>
      </div>
    </div>
  );
}

export default Dashboard;
