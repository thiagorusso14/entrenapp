import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import api from "../../axios/axios";

function RegistroServicios() {
  const [servicios, setServicios] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editandoId, setEditandoId] = useState(null);

  const [formServicio, setFormServicio] = useState({
    descripcion: "",
    zona: "",
    modalidad: "",
    precio: "",
    duracion: "",
    categoria: "",
    publicado: false,
    fecha: "",
    hora: "",
  });

  const zonas = ["PALERMO", "BELGRANO", "CABALLITO", "ALMAGRO", "PARQUE_PATRICIOS", "BOEDO", "AVELLANEDA", "ONLINE"];
  const modalidades = ["PRESENCIAL", "ONLINE"];
  const duraciones = [30, 45, 60, 90, 120];
  const categorias = ["GYM", "BOXEO", "ESTIRAMIENTO", "YOGA", "PILATES", "FUNCIONAL"];

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const fetchServicios = async () => {
    try {
      const { data } = await api.get("/services/active");
      const filtrados = data.filter(s => s.trainer === user._id || s.trainer?._id === user._id);
      setServicios(filtrados);
    } catch (error) {
      console.error("Error al cargar servicios:", error);
    }
  };

  useEffect(() => {
    fetchServicios();
  }, [user._id]);

  const handleToggleFormulario = () => {
    setFormServicio({
      descripcion: "",
      zona: "",
      modalidad: "",
      precio: "",
      duracion: "",
      categoria: "",
      publicado: false,
      fecha: "",
      hora: "",
    });
    setEditandoId(null);
    setMostrarFormulario(!mostrarFormulario);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormServicio((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgregarServicio = async () => {
    try {
      const body = {
        name: formServicio.descripcion,
        zone: formServicio.zona,
        mode: formServicio.modalidad,
        price: parseInt(formServicio.precio),
        duration: parseInt(formServicio.duracion),
        category: formServicio.categoria,
        published: true,
        trainerId: user._id,
        date: formServicio.fecha,
        time: formServicio.hora,
      };

      const { data } = await api.post("/services", body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.service.trainer === user._id || data.service.trainer?._id === user._id) {
        setServicios((prev) => [...prev, data.service]);
      }

      handleToggleFormulario();
      alert("Servicio publicado correctamente");
    } catch (err) {
      console.log("Error al crear servicio:", err.response?.data || err.message || err);
      alert("Error al crear el servicio");
    }
  };

  const handleEditarServicio = async () => {
    try {
      const body = {
        name: formServicio.descripcion,
        zone: formServicio.zona,
        mode: formServicio.modalidad,
        price: parseInt(formServicio.precio),
        duration: parseInt(formServicio.duracion),
        category: formServicio.categoria,
        date: formServicio.fecha,
        time: formServicio.hora,
      };

      await api.patch(`/services/${editandoId}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchServicios();
      handleToggleFormulario();
      alert("Servicio actualizado correctamente");
    } catch (err) {
      console.error("Error al editar servicio:", err);
      alert("Error al actualizar el servicio");
    }
  };

  const handleTogglePublicado = async (id, publicado) => {
    try {
      const { data } = await api.put(`/services/${id}`, { published: !publicado }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setServicios((prev) =>
        prev.map((serv) =>
          serv._id === id ? { ...serv, published: data.service.published } : serv
        )
      );
    } catch (err) {
      console.log("Error al cambiar estado de publicación:", err.response?.data || err.message || err);
      alert("No se pudo cambiar el estado");
    }
  };

  const handleEliminarServicio = async (id) => {
    try {
      await api.delete(`/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setServicios((prev) => prev.filter((s) => s._id !== id));
      alert("Servicio eliminado correctamente");
    } catch (err) {
      console.error("Error al eliminar servicio:", err.response?.data || err);
      alert("No se pudo eliminar el servicio");
    }
  };

  const handleCargarEdicion = (servicio) => {
    setFormServicio({
      descripcion: servicio.name,
      zona: servicio.zone,
      modalidad: servicio.mode,
      precio: servicio.price,
      duracion: servicio.duration,
      categoria: servicio.category,
      publicado: servicio.published,
      fecha: servicio.date?.split("T")[0] || "",
      hora: servicio.time || "",
    });
    setEditandoId(servicio._id);
    setMostrarFormulario(true);
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
              name="descripcion"
              value={formServicio.descripcion}
              onChange={handleChange}
              placeholder="Descripción del servicio"
              className="p-2 rounded border"
            />
            <select name="zona" value={formServicio.zona} onChange={handleChange} className="p-2 rounded border">
              <option value="">Zona</option>
              {zonas.map((z) => <option key={z} value={z}>{z}</option>)}
            </select>
            <select name="modalidad" value={formServicio.modalidad} onChange={handleChange} className="p-2 rounded border">
              <option value="">Modalidad</option>
              {modalidades.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <input name="precio" value={formServicio.precio} onChange={handleChange} placeholder="Precio ($)" type="number" className="p-2 rounded border" />
            <select name="duracion" value={formServicio.duracion} onChange={handleChange} className="p-2 rounded border">
              <option value="">Duración (minutos)</option>
              {duraciones.map((d) => <option key={d} value={d}>{d} minutos</option>)}
            </select>
            <select name="categoria" value={formServicio.categoria} onChange={handleChange} className="p-2 rounded border">
              <option value="">Categoría</option>
              {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <input
              type="date"
              name="fecha"
              value={formServicio.fecha}
              onChange={handleChange}
              className="p-2 rounded border"
            />
            <input
              type="time"
              name="hora"
              value={formServicio.hora}
              onChange={handleChange}
              className="p-2 rounded border"
            />
            <button
              onClick={editandoId ? handleEditarServicio : handleAgregarServicio}
              className="bg-[#6c6fa9] text-white py-2 rounded hover:bg-[#5a5e9a] col-span-1 md:col-span-3"
            >
              {editandoId ? "Guardar cambios" : "Publicar servicio"}
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-white">
            <thead>
              <tr className="border-b border-white/30 uppercase text-xs">
                <th className="px-4 py-2">Descripción</th>
                <th className="px-4 py-2">Categoría</th>
                <th className="px-4 py-2">Duración</th>
                <th className="px-4 py-2">Precio</th>
                <th className="px-4 py-2">Zona</th>
                <th className="px-4 py-2">Modalidad</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Hora</th>
                <th className="px-4 py-2">Publicado</th>
                <th className="px-4 py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((s, i) => (
                <tr key={s._id || i} className="border-t border-white/20">
                  <td className="px-4 py-2">{s.name}</td>
                  <td className="px-4 py-2">{s.category}</td>
                  <td className="px-4 py-2">{s.duration} min</td>
                  <td className="px-4 py-2">${s.price}</td>
                  <td className="px-4 py-2">{s.zone}</td>
                  <td className="px-4 py-2">{s.mode}</td>
                  <td className="px-4 py-2">{s.date?.split("T")[0]}</td>
                  <td className="px-4 py-2">{s.time}</td>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={s.published}
                      onChange={() => handleTogglePublicado(s._id, s.published)}
                      className="accent-white w-4 h-4 cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-2 flex gap-4 justify-center items-center">
                    <FaEdit onClick={() => handleCargarEdicion(s)} className="cursor-pointer text-white text-sm" title="Editar" />
                    <FaTrash onClick={() => handleEliminarServicio(s._id)} className="cursor-pointer text-red-300 text-sm" title="Eliminar" />
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
