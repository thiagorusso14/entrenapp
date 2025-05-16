import { useState } from "react";

const clasesMock = [
  {
    id: 1,
    fecha: "Lunes 15/06/2025",
    horario: "14:00pm – 15:00pm",
    coach: "Juan",
    clase: "Yoga",
    modalidad: "Presencial",
    precio: 10000,
  },
  {
    id: 2,
    fecha: "Martes 16/06/2025",
    horario: "14:00pm – 15:00pm",
    coach: "Pepe",
    clase: "Musculación",
    modalidad: "Virtual",
    precio: 15000,
  },
  {
    id: 3,
    fecha: "Miércoles 17/06/2025",
    horario: "15:00pm – 16:00pm",
    coach: "Daniel",
    clase: "Pilates",
    modalidad: "Virtual",
    precio: 12000,
  },
];

const MisClases = () => {
  const [clases, setClases] = useState(clasesMock);

  const cancelarClase = (id) => {
    const confirmar = confirm("¿Seguro que querés cancelar esta clase?");
    if (confirmar) {
      setClases((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-indigo-900 mb-6">Mis clases</h1>

      <div className="flex flex-wrap gap-6">
        {clases.map((clase) => (
          <div
            key={clase.id}
            className="bg-indigo-300 rounded-xl p-4 shadow-md w-72 text-indigo-900 relative"
          >
            <div className="mb-2 font-semibold">
              Fecha: {clase.fecha}
              <br />
              Horario: {clase.horario}
            </div>
            <div className="text-sm">
              <p><strong>Coach:</strong> {clase.coach}</p>
              <p><strong>Clase:</strong> {clase.clase}</p>
              <p><strong>Modalidad:</strong> {clase.modalidad}</p>
              <p><strong>Precio:</strong> ${clase.precio.toLocaleString()}</p>
            </div>

            <button
              onClick={() => cancelarClase(clase.id)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
            >
              Cancelar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MisClases;
