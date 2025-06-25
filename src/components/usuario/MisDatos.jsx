import React, { useState, useEffect } from "react";
import api from "../../axios/axios";

const MisDatos = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [editando, setEditando] = useState(false);
  const [usuario, setUsuario] = useState({
    name: "",
    lastName: "",
    mail: "",
    birth: "",
  });

  useEffect(() => {
    const fetchUsuario = async () => {
      if (!user?._id || !token) {
        console.warn("Falta el user ID o token");
        return;
      }

      try {
        const { data } = await api.get(`/users/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("🔎 Datos recibidos del backend:", data);
        const u = data.user || data;

        setUsuario({
          name: u.name,
          lastName: u.lastName,
          mail: u.mail,
          birth: u.birth?.split("T")[0] || "",
        });
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error.response?.data || error.message || error);
      }
    };

    fetchUsuario();
  }, [user?._id, token]);

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.patch(`/users/${user._id}`, usuario, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Datos actualizados correctamente");
      setEditando(false);
      window.location.reload(); // para refrescar nombre en sidebar
    } catch (error) {
      console.error("Error al guardar los cambios:", error.response?.data || error.message || error);
      alert("No se pudieron guardar los cambios");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-indigo-900">Mis datos</h1>

      <div className="bg-indigo-200 rounded-xl shadow-md p-6 w-full max-w-md text-indigo-900 space-y-4">
        {editando ? (
          <>
            <Input label="Nombre" name="name" value={usuario.name} onChange={handleChange} />
            <Input label="Apellido" name="lastName" value={usuario.lastName} onChange={handleChange} />
            <Input label="Correo" name="mail" type="email" value={usuario.mail} onChange={handleChange} />
            <Input label="Fecha de nacimiento" name="birth" type="date" value={usuario.birth} onChange={handleChange} />
            <button
              onClick={handleGuardar}
              className="bg-indigo-900 text-white py-2 px-4 rounded hover:bg-indigo-800"
            >
              Guardar cambios
            </button>
          </>
        ) : (
          <>
            <p><strong>Nombre:</strong> {usuario.name}</p>
            <p><strong>Apellido:</strong> {usuario.lastName}</p>
            <p><strong>Correo:</strong> {usuario.mail}</p>
            <p><strong>Nacimiento:</strong> {usuario.birth}</p>
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

export default MisDatos;
