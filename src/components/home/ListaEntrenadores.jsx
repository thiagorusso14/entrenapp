import React from "react";
import { Link } from "react-router-dom";

const entrenadoresMock = [
  {
    id: 1,
    nombre: "Coach Agustin",
    categoria: "Pilates",
    precio: 15000,
    imagen: "/agustin.jpg",
    comentarios: ["Muy bueno", "Clases excelentes"],
  },
  {
    id: 2,
    nombre: "Coach Juan",
    categoria: "Musculación",
    precio: 9000,
    imagen: "/agustin.jpg",
    comentarios: ["Gran entrenador", "Resultados visibles"],
  },
  {
    id: 3,
    nombre: "Coach Angel",
    categoria: "Yoga",
    precio: 12000,
    imagen: "/agustin.jpg",
    comentarios: ["Excelente guía", "Muy profesional"],
  },
];

const ListaEntrenadores = () => {
  return (
    <section className="bg-white py-12 px-4 md:px-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Entrenadores disponibles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {entrenadoresMock.map((entrenador) => (
          <div
            key={entrenador.id}
            className="bg-indigo-800 rounded-2xl p-6 shadow-lg text-white flex flex-col items-center"
          >
            <img
              src={entrenador.imagen}
              alt={entrenador.nombre}
              className="w-28 h-28 object-cover rounded-full mb-4 border-4 border-white shadow-md"
            />
            <h3 className="text-lg font-bold underline">{entrenador.nombre}</h3>
            <p className="mt-1">{entrenador.categoria}</p>
            <p className="text-yellow-300 font-semibold mt-1">${entrenador.precio} / hr</p>

            <div className="text-sm text-left mt-4 w-full">
              <p className="font-semibold">Comentarios:</p>
              {entrenador.comentarios.map((c, i) => (
                <p key={i} className="text-gray-200 pl-2">• {c}</p>
              ))}
            </div>

            <Link to={`/usuario/contratar/${entrenador.id}`} className="mt-auto">
              <button className="mt-6 bg-yellow-400 hover:bg-yellow-300 text-indigo-900 px-4 py-2 rounded-full transition duration-300 font-semibold">
                Contratar servicio
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ListaEntrenadores;
