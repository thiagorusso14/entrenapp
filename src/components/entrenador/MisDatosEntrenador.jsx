import React, { useState, useEffect } from "react";
import api from "../../axios/axios";

const MisDatosEntrenador = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [editando, setEditando] = useState(false);
  const [entrenador, setEntrenador] = useState({
    name: "",
    lastName: "",
    mail: "",
    birth: "",
  });

  // Obtener datos reales al montar
  useEffect(() => {
    const fetchEntrenador = async () => {
      try {
        const { data } = await api.get(`/users/${user._id}`);
        setEntrenador({
          name: data.name,
          lastName: data.lastName,
          mail: data.mail,
          birth: data.birth?.split("T")[0] || "",
        });
      } catch (error) {
        console.error("Error al cargar datos del entrenador:", error);
      }
    };

    fetchEntrenador();
  }, [user._id]);

  const handleChange = (e) => {
    setEntrenador({
      ...entrenador,
      [e.target.name]: e.target.value,
    });
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/users/${user._id}`, entrenador);
      alert("Datos actualizados correctamente");
      setEditando(false);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      alert("No se pudieron guardar los cambios");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-indigo-900">Mis datos</h1>

      <div className="bg-indigo-200 rounded-xl shadow-md p-6 w-full max-w-md text-indigo-900 space-y-4">
        {editando ? (
          <>
            <Input label="Nombre" name="name" value={entrenador.name} onChange={handleChange} />
            <Input label="Apellido" name="lastName" value={entrenador.lastName} onChange={handleChange} />
            <Input label="Correo" name="mail" type="email" value={entrenador.mail} onChange={handleChange} />
            <Input label="Fecha de nacimiento" name="birth" type="date" value={entrenador.birth} onChange={handleChange} />
            <button
              onClick={handleGuardar}
              className="bg-indigo-900 text-white py-2 px-4 rounded hover:bg-indigo-800"
            >
              Guardar cambios
            </button>
          </>
        ) : (
          <>
            <p><strong>Nombre:</strong> {entrenador.name}</p>
            <p><strong>Apellido:</strong> {entrenador.lastName}</p>
            <p><strong>Correo:</strong> {entrenador.mail}</p>
            <p><strong>Nacimiento:</strong> {entrenador.birth}</p>
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

const Input = ({ label, ...props }) => (
  <div>
    <label className="block font-semibold mb-1">{label}:</label>
    <input
      {...props}
      className="w-full rounded p-2"
      placeholder={label}
    />
  </div>
);

export default MisDatosEntrenador;
