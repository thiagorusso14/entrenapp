import React, { useState } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

function RegistroServicios() {
  const [servicios, setServicios] = useState([
    {
      nombre: "Servicio1",
      categoria: "Localizada",
      duracion: "60min",
      precio: "$10.000",
      disponibilidad: "mañana",
      publicado: false,
    },
    {
      nombre: "Servicio2",
      categoria: "Crossfit",
      duracion: "45min",
      precio: "$12.000",
      disponibilidad: "noche",
      publicado: true,
    },
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoServicio, setNuevoServicio] = useState({
    nombre: "",
    categoria: "",
    duracion: "",
    precio: "",
    disponibilidad: "",
    publicado: false,
  });

  const handleToggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoServicio((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgregarServicio = () => {
    setServicios((prev) => [...prev, nuevoServicio]);
    setNuevoServicio({
      nombre: "",
      categoria: "",
      duracion: "",
      precio: "",
      disponibilidad: "",
      publicado: false,
    });
    setMostrarFormulario(false);
  };

  const togglePublicado = (index) => {
    const nuevos = [...servicios];
    nuevos[index].publicado = !nuevos[index].publicado;
    setServicios(nuevos);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="bg-[#6c6fa9] text-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg md:text-xl font-bold">Servicios</h2>
          <button
            onClick={handleToggleFormulario}
            className="bg-white text-[#6c6fa9] px-2 py-1 rounded-full text-sm hover:bg-gray-100 flex items-center gap-1"
          >
            <FaPlus /> Nuevo servicio
          </button>
        </div>

        {/* FORMULARIO CONDICIONAL */}
        {mostrarFormulario && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-white p-4 rounded-lg text-black">
            <input
              name="nombre"
              value={nuevoServicio.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              className="p-2 rounded border"
            />
            <input
              name="categoria"
              value={nuevoServicio.categoria}
              onChange={handleChange}
              placeholder="Categoría"
              className="p-2 rounded border"
            />
            <input
              name="duracion"
              value={nuevoServicio.duracion}
              onChange={handleChange}
              placeholder="Duración"
              className="p-2 rounded border"
            />
            <input
              name="precio"
              value={nuevoServicio.precio}
              onChange={handleChange}
              placeholder="Precio"
              className="p-2 rounded border"
            />
            <input
              name="disponibilidad"
              value={nuevoServicio.disponibilidad}
              onChange={handleChange}
              placeholder="Disponibilidad horaria"
              className="p-2 rounded border"
            />
            <button
              onClick={handleAgregarServicio}
              className="bg-[#6c6fa9] text-white py-2 rounded hover:bg-[#5a5e9a] col-span-1 md:col-span-3"
            >
              Publicar servicio
            </button>
          </div>
        )}

        {/* TABLA */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-white">
            <thead>
              <tr className="border-b border-white/30 text-white uppercase text-xs">
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Categoría</th>
                <th className="px-4 py-2">Duración</th>
                <th className="px-4 py-2">Precio</th>
                <th className="px-4 py-2">Disponibilidad</th>
                <th className="px-4 py-2">Publicado</th>
                <th className="px-4 py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((s, i) => (
                <tr key={i} className="border-t border-white/20">
                  <td className="px-4 py-2">{s.nombre}</td>
                  <td className="px-4 py-2">{s.categoria}</td>
                  <td className="px-4 py-2">{s.duracion}</td>
                  <td className="px-4 py-2">{s.precio}</td>
                  <td className="px-4 py-2">{s.disponibilidad}</td>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={s.publicado}
                      onChange={() => togglePublicado(i)}
                      className="accent-white w-4 h-4 cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-2 flex gap-4 justify-center items-center">
                    <FaEdit className="cursor-pointer text-white text-sm" />
                    <FaTrash className="cursor-pointer text-red-300 text-sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RegistroServicios;
