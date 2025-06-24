import React, { useEffect, useState } from "react";
import api from "../../axios/axios";

function GestionServicios() {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const { data } = await api.get("/services/active");
        setServicios(data);
      } catch (error) {
        console.error("Error al obtener los servicios activos", error);
      }
    };

    fetchServicios();
  }, []);

  const getColorStyle = (estado) => {
    switch (estado) {
      case "Pendiente":
        return "border border-indigo-400 bg-white";
      case "Aceptado":
        return "bg-blue-200";
      case "Cancelado":
        return "bg-red-200";
      case "Completado":
        return "bg-green-200";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-indigo-900 mb-6">Gestión de servicios</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicios.map((s, i) => (
          <div
            key={s._id || i}
            className={`rounded-xl shadow-md p-4 ${getColorStyle(s.status || "Pendiente")}`}
          >
            <h3 className="text-indigo-900 font-semibold mb-2">{s.name}</h3>
            <p className="text-sm text-gray-700">Cliente: {s.trainer?.name || "No especificado"}</p>
            <p className="text-sm text-gray-700">Estado: {s.status || "Pendiente"}</p>
            <p className="text-sm text-gray-700">Horario: {s.time || "Sin definir"}</p>

            <div className="mt-2">
              <label className="text-sm text-gray-700 block mb-1">Fecha:</label>
              <input
                type="date"
                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                value={s.date ? s.date.slice(0, 10) : ""}
                readOnly
              />
            </div>

            <div className="mt-4 w-full">
              <label className="block text-sm text-gray-700 mb-1">Adjuntar archivo:</label>
              <input
                type="file"
                className="block w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-md file:px-4 file:py-1 file:border-0 file:bg-indigo-600 file:text-white file:rounded-md"
              />
            </div>

            <div className="mt-4 flex gap-2 flex-wrap">
              {s.status === "Pendiente" && (
                <>
                  <button className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">
                    Aceptar
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">
                    Rechazar
                  </button>
                </>
              )}
              {s.status === "Aceptado" && (
                <button className="bg-red-600 text-white px-3 py-1 rounded-md text-sm">
                  Cancelar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GestionServicios;
