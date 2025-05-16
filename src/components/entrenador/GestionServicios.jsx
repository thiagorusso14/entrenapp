import React from "react";

function GestionServicios() {
  const servicios = [
    {
      nombre: "Servicio 1",
      cliente: "Pepe",
      estado: "Pendiente",
      horario: "10:00am - 11:00am",
      fecha: "2025-03-16",
    },
    {
      nombre: "Servicio 2",
      cliente: "Marta",
      estado: "Aceptado",
      horario: "15:00pm - 16:00pm",
      fecha: "2025-05-24",
    },
    {
      nombre: "Servicio 3",
      cliente: "Juan",
      estado: "Cancelado",
      horario: "18:00pm - 19:00pm",
      fecha: "2025-04-23",
    },
    {
      nombre: "Servicio 4",
      cliente: "Sofía",
      estado: "Completado",
      horario: "15:00pm - 16:00pm",
      fecha: "2025-03-11",
    },
  ];

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
            key={i}
            className={`rounded-xl shadow-md p-4 ${getColorStyle(s.estado)}`}
          >
            <h3 className="text-indigo-900 font-semibold mb-2">{s.nombre}</h3>
            <p className="text-sm text-gray-700">Cliente: {s.cliente}</p>
            <p className="text-sm text-gray-700">Estado: {s.estado}</p>
            <p className="text-sm text-gray-700">Horario: {s.horario}</p>

            <div className="mt-2">
              <label className="text-sm text-gray-700 block mb-1">Fecha:</label>
              <input
                type="date"
                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                value={s.fecha}
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
              {s.estado === "Pendiente" && (
                <>
                  <button className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">
                    Aceptar
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">
                    Rechazar
                  </button>
                </>
              )}
              {s.estado === "Aceptado" && (
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
