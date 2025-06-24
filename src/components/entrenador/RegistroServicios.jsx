import React, { useState } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import api from "../../axios/axios";

function RegistroServicios() {
  const [servicios, setServicios] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoServicio, setNuevoServicio] = useState({
    nombre: "",
    zona: "",
    modalidad: "",
    precio: "",
    duracion: "",
    categoria: "",
    publicado: false,
  });

  const zonas = [
    "PALERMO", "BELGRANO", "CABALLITO", "ALMAGRO",
    "PARQUE_PATRICIOS", "BOEDO", "AVELLANEDA", "ONLINE"
  ];

  const modalidades = ["PRESENCIAL", "ONLINE"];
  const duraciones = [30, 45, 60, 90, 120];
  const categorias = ["GYM", "BOXEO", "ESTIRAMIENTO", "YOGA", "PILATES", "FUNCIONAL"];

  const handleToggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoServicio((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgregarServicio = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const body = {
        name: nuevoServicio.nombre,
        zone: nuevoServicio.zona,
        mode: nuevoServicio.modalidad,
        price: parseInt(nuevoServicio.precio),
        duration: parseInt(nuevoServicio.duracion),
        category: nuevoServicio.categoria,
        published: true,
        trainer: user._id,
      };

      const { data } = await api.post("/services", body);

      setServicios((prev) => [...prev, data]);

      setNuevoServicio({
        nombre: "",
        zona: "",
        modalidad: "",
        precio: "",
        duracion: "",
        categoria: "",
        publicado: false,
      });

      setMostrarFormulario(false);
      alert("Servicio publicado correctamente");
    } catch (err) {
      console.error("Error al publicar servicio:", err);
      alert("Error al crear el servicio");
    }
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

        {mostrarFormulario && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-white p-4 rounded-lg text-black">
            <input
              name="nombre"
              value={nuevoServicio.nombre}
              onChange={handleChange}
              placeholder="Nombre del servicio"
              className="p-2 rounded border"
            />

            <select
              name="zona"
              value={nuevoServicio.zona}
              onChange={handleChange}
              className="p-2 rounded border"
            >
              <option value="">Zona</option>
              {zonas.map((z) => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>

            <select
              name="modalidad"
              value={nuevoServicio.modalidad}
              onChange={handleChange}
              className="p-2 rounded border"
            >
              <option value="">Modalidad</option>
              {modalidades.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            <input
              name="precio"
              value={nuevoServicio.precio}
              onChange={handleChange}
              placeholder="Precio máximo ($)"
              type="number"
              className="p-2 rounded border"
            />

            <select
              name="duracion"
              value={nuevoServicio.duracion}
              onChange={handleChange}
              className="p-2 rounded border"
            >
              <option value="">Duración (minutos)</option>
              {duraciones.map((d) => (
                <option key={d} value={d}>{d} minutos</option>
              ))}
            </select>

            <select
              name="categoria"
              value={nuevoServicio.categoria}
              onChange={handleChange}
              className="p-2 rounded border"
            >
              <option value="">Categoría</option>
              {categorias.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <button
              onClick={handleAgregarServicio}
              className="bg-[#6c6fa9] text-white py-2 rounded hover:bg-[#5a5e9a] col-span-1 md:col-span-3"
            >
              Publicar servicio
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-white">
            <thead>
              <tr className="border-b border-white/30 text-white uppercase text-xs">
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Categoría</th>
                <th className="px-4 py-2">Duración</th>
                <th className="px-4 py-2">Precio</th>
                <th className="px-4 py-2">Zona</th>
                <th className="px-4 py-2">Modalidad</th>
                <th className="px-4 py-2">Publicado</th>
                <th className="px-4 py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((s, i) => (
                <tr key={i} className="border-t border-white/20">
                  <td className="px-4 py-2">{s.name}</td>
                  <td className="px-4 py-2">{s.category}</td>
                  <td className="px-4 py-2">{s.duration} min</td>
                  <td className="px-4 py-2">${s.price}</td>
                  <td className="px-4 py-2">{s.zone}</td>
                  <td className="px-4 py-2">{s.mode}</td>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={s.published}
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
