import React, { useState } from "react";

const MisDatosEntrenador = () => {
  const [editando, setEditando] = useState(false);
  const [entrenador, setEntrenador] = useState({
    nombre: "Carla",
    apellido: "Gómez",
    correo: "carla.entrenadora@gmail.com",
    pais: "Argentina",
    especialidad: "CrossFit",
    experiencia: "5 años",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntrenador((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGuardar = () => {
    setEditando(false);
    console.log("Datos guardados:", entrenador);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-indigo-900">Mis datos</h1>

      <div className="bg-indigo-200 rounded-xl shadow-md p-6 w-full max-w-md text-indigo-900 space-y-4">
        {editando ? (
          <>
            <div>
              <label className="font-semibold block mb-1">Nombre:</label>
              <input
                name="nombre"
                value={entrenador.nombre}
                onChange={handleChange}
                className="w-full rounded p-2"
                placeholder="Nombre"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1">Apellido:</label>
              <input
                name="apellido"
                value={entrenador.apellido}
                onChange={handleChange}
                className="w-full rounded p-2"
                placeholder="Apellido"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1">Correo:</label>
              <input
                name="correo"
                value={entrenador.correo}
                onChange={handleChange}
                className="w-full rounded p-2"
                placeholder="Correo"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1">País:</label>
              <input
                name="pais"
                value={entrenador.pais}
                onChange={handleChange}
                className="w-full rounded p-2"
                placeholder="País"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1">Especialidad:</label>
              <input
                name="especialidad"
                value={entrenador.especialidad}
                onChange={handleChange}
                className="w-full rounded p-2"
                placeholder="Especialidad"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1">Experiencia:</label>
              <input
                name="experiencia"
                value={entrenador.experiencia}
                onChange={handleChange}
                className="w-full rounded p-2"
                placeholder="Experiencia"
              />
            </div>
            <button
              onClick={handleGuardar}
              className="bg-indigo-900 text-white py-2 px-4 rounded hover:bg-indigo-800"
            >
              Guardar cambios
            </button>
          </>
        ) : (
          <>
            <p><strong>Nombre:</strong> {entrenador.nombre}</p>
            <p><strong>Apellido:</strong> {entrenador.apellido}</p>
            <p><strong>Correo:</strong> {entrenador.correo}</p>
            <p><strong>País:</strong> {entrenador.pais}</p>
            <p><strong>Especialidad:</strong> {entrenador.especialidad}</p>
            <p><strong>Experiencia:</strong> {entrenador.experiencia}</p>
            <button
              onClick={() => setEditando(true)}
              className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-400"
            >
              Editar datos
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MisDatosEntrenador;
