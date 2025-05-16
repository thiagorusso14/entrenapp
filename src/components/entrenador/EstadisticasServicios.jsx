import React from "react";

function EstadisticasServicios() {
  const estadisticas = [
    {
      servicio: "Servicio 1",
      total: 306,
      valoraciones: {
        Excelente: 120,
        Bueno: 100,
        Normal: 50,
        Malo: 20,
        Pésimo: 16,
      },
      comentarios: ["El mejor entrenador de todos", "Gracias por el servicio"],
    },
    {
      servicio: "Servicio 2",
      total: 245,
      valoraciones: {
        Excelente: 101,
        Bueno: 89,
        Normal: 30,
        Malo: 15,
        Pésimo: 10,
      },
      comentarios: ["Muy profesional", "Gran experiencia"],
    },
    {
      servicio: "Servicio 3",
      total: 210,
      valoraciones: {
        Excelente: 84,
        Bueno: 70,
        Normal: 25,
        Malo: 17,
        Pésimo: 14,
      },
      comentarios: [],
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-900 mb-8">
        Estadísticas de tus servicios
      </h2>

      <div className="space-y-8">
        {estadisticas.map((e, idx) => (
          <div key={idx} className="bg-indigo-100 p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-1">{e.servicio}</h3>
            <p className="text-sm text-gray-700 mb-2">
              Contrataciones en total: {e.total}
            </p>
            <ul className="text-sm text-gray-600 mb-4">
              {Object.entries(e.valoraciones).map(([nivel, cantidad]) => (
                <li key={nivel}>
                  {nivel} ({cantidad})
                </li>
              ))}
            </ul>

            {e.comentarios.map((comentario, i) => (
              <div key={i} className="mb-4">
                <p className="text-sm font-semibold text-gray-800 mb-1">
                  "{comentario}"
                </p>
                <input
                  type="text"
                  placeholder="Responder:"
                  className="w-full rounded-md border border-gray-300 px-4 py-2"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EstadisticasServicios;
