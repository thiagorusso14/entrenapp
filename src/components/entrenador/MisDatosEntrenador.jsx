import React, { useState, useEffect } from "react";
import api from "../../axios/axios";

const MisDatosEntrenador = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [editando, setEditando] = useState(false);
  const [entrenador, setEntrenador] = useState({
    name: "",
    lastName: "",
    mail: "",
    birth: "",
  });

  useEffect(() => {
    const fetchEntrenador = async () => {
      if (!user?._id || !token) return;

      try {
        const { data } = await api.get(`/users/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Si tu backend devuelve { user: {...} }, entonces:
        const userData = data.user || data; // admite ambas respuestas

        setEntrenador({
          name: userData.name,
          lastName: userData.lastName,
          mail: userData.mail,
          birth: userData.birth?.split("T")[0] || "",
        });
      } catch (error) {
        console.error("Error al cargar datos del entrenador:", error.response?.data || error.message);
      }
    };

    fetchEntrenador();
  }, [user?._id, token]);

  const handleChange = (e) => {
    setEntrenador({
      ...entrenador,
      [e.target.name]: e.target.value,
    });
  };

  const handleGuardar = async (e) => {
    e.preventDefault();

    try {
      await api.patch(`/users/${user._id}`, entrenador, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Datos actualizados correctamente");
      setEditando(false);
    } catch (error) {
      console.error("Error al guardar los cambios:", error.response?.data || error.message);
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
