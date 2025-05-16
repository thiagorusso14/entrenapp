import React from "react";
import { useParams } from "react-router-dom";

const ContratarServicio = () => {
  const { id } = useParams();

  // Simular carga de datos
  const servicio = {
    id,
    entrenador: "Coach Juan",
    categoria: "Musculación",
    precio: 9000,
    duracion: "1 hora",
    descripcion: "Clases intensas de musculación",
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Contratar servicio</h2>
      <div className="bg-white shadow-md p-6 rounded-lg space-y-4">
        <p><strong>Entrenador:</strong> {servicio.entrenador}</p>
        <p><strong>Categoría:</strong> {servicio.categoria}</p>
        <p><strong>Duración:</strong> {servicio.duracion}</p>
        <p><strong>Precio:</strong> ${servicio.precio}</p>
        <p><strong>Descripción:</strong> {servicio.descripcion}</p>

        <label className="block mt-4">
          <span className="text-gray-700">Elegí un horario:</span>
          <select className="mt-1 block w-full border p-2 rounded-md">
            <option>Lunes 10:00</option>
            <option>Miércoles 14:00</option>
            <option>Viernes 18:00</option>
          </select>
        </label>

        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">
          Confirmar contratación
        </button>
      </div>
    </div>
  );
};

export default ContratarServicio;
