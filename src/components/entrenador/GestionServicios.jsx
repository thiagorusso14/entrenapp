import React, { useEffect, useState } from "react";
import api from "../../axios/axios";

function GestionServicios() {
  const [servicios, setServicios] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const fetchServicios = async () => {
    try {
      const { data } = await api.get(`/services/from/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServicios(data);
    } catch (error) {
      console.error("Error al obtener los servicios activos", error);
    }
  };

  useEffect(() => {
    fetchServicios();
  }, []);

  const handleAccion = async (bookingId, accion) => {
    try {
      await api.post(`/bookings/status/${user._id}`, {
        bookingId,
        action: accion
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchServicios(); // Actualiza los datos
    } catch (error) {
      console.error("Error al actualizar estado del servicio:", error);
      alert("Hubo un problema al actualizar el estado del servicio");
    }
  };

  const handleUploadFile = async (serviceId) => {
    const fileUrl = prompt("Pegá la URL pública del archivo (ej: Google Drive)");
    if (!fileUrl) return;

    try {
      await api.patch(`/services/upload-file/${serviceId}`, {
        fileUrl
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Archivo agregado correctamente");
      fetchServicios();
    } catch (error) {
      console.error("Error al subir archivo:", error);
      alert("Error al agregar el archivo al servicio");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-indigo-900 mb-6">Gestión de servicios</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicios.map((s) => (
          <div
            key={s._id}
            className="rounded-xl shadow-md p-4 bg-white border border-gray-300"
          >
            <h3 className="text-indigo-900 font-semibold mb-2">{s.name}</h3>
            <p className="text-sm text-gray-700">Categoría: {s.category}</p>
            <p className="text-sm text-gray-700">Modalidad: {s.mode}</p>
            <p className="text-sm text-gray-700">Zona: {s.zone}</p>
            <p className="text-sm text-gray-700">Fecha: {s.date?.slice(0, 10)}</p>
            <p className="text-sm text-gray-700">Hora: {s.time}</p>
            <p className="text-sm text-gray-700">Precio: ${s.price}</p>

            <div className="mt-4">
              <button
                onClick={() => handleUploadFile(s._id)}
                className="bg-indigo-600 text-white text-sm px-3 py-1 rounded hover:bg-indigo-700 mb-2"
              >
                Agregar archivo
              </button>
            </div>

            {s.bookings?.map((b) => (
              <div key={b._id} className="mt-4 bg-gray-100 p-3 rounded-md">
                <p className="text-sm text-gray-800 font-semibold">
                  Contratado por: {b.user?.name || "Usuario"}
                </p>
                <p className="text-sm text-gray-700 mb-2">Estado: {b.status}</p>

                {b.status === "PENDING" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccion(b._id, "CONFIRMED")}
                      className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Aceptar
                    </button>
                    <button
                      onClick={() => handleAccion(b._id, "CANCELLED")}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Rechazar
                    </button>
                  </div>
                )}
                {b.status === "CONFIRMED" && (
                  <button
                    onClick={() => handleAccion(b._id, "CANCELLED")}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Cancelar clase
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GestionServicios;
