import React, { useState } from "react";

const MisDatos = () => {
  const [editando, setEditando] = useState(false);
  const [usuario, setUsuario] = useState({
    nombre: "Daniel",
    apellido: "Lopez",
    correo: "DanielLopez@gmail.com",
    pais: "Argentina",
  });

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    setEditando(false);
    console.log("Datos guardados:", usuario);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-indigo-900">Mis datos</h1>

      <div className="bg-indigo-200 rounded-xl shadow-md p-6 w-full max-w-md text-indigo-900 space-y-4">
        {editando ? (
          <>
            <div>
              <label className="block font-semibold mb-1">Nombre:</label>
              <input
                name="nombre"
                value={usuario.nombre}
                onChange={handleChange}
                className="w-full rounded p-2"
                placeholder="Nombre"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Apellido:</label>
              <input
                name="apellido"
                value={usuario.apellido}
                onChange={handleChange}
                className="w-full rounded p-2"
                placeholder="Apellido"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Correo:</label>
              <input
                name="correo"
                value={usuario.correo}
                onChange={handleChange}
                className="w-full rounded p-2"
                placeholder="Correo"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">País:</label>
              <input
                name="pais"
                value={usuario.pais}
                onChange={handleChange}
                className="w-full rounded p-2"
                placeholder="País"
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
            <p><strong>Nombre:</strong> {usuario.nombre}</p>
            <p><strong>Apellido:</strong> {usuario.apellido}</p>
            <p><strong>Correo:</strong> {usuario.correo}</p>
            <p><strong>País:</strong> {usuario.pais}</p>
            <button
              onClick={() => setEditando(true)}
              className="mt-4 bg-yellow-400 text-indigo-900 py-2 px-4 rounded hover:bg-yellow-500"
            >
              Editar datos
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MisDatos;
