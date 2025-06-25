import React, { useEffect, useState } from "react";
import api from "../../axios/axios";

function GestionServicios() {
  const [bookings, setBookings] = useState([]);
  const [fileUrls, setFileUrls] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const fetchBookings = async () => {
    try {
      const { data } = await api.get(`/booking/trainer/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(data);
    } catch (error) {
      console.error("Error al obtener los bookings del entrenador", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleInputChange = (serviceId, value) => {
    setFileUrls((prev) => ({ ...prev, [serviceId]: value }));
  };

  const handleAgregarArchivo = async (serviceId) => {
    if (!fileUrls[serviceId]) return alert("Ingresá una URL válida.");

    try {
      await api.put(
        `/services/${serviceId}/add-file`,
        { url: fileUrls[serviceId] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Archivo agregado con éxito");
      setFileUrls((prev) => ({ ...prev, [serviceId]: "" })); // Limpiar campo
    } catch (err) {
      console.log("Error al agregar archivo:", err);
      alert("No se pudo agregar el archivo");
    }
  };

  const handleAccion = async (bookingId, accion) => {
    try {
      await api.post(`/booking/status/${user._id}`, {
        bookingId,
        action: accion
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBookings();
    } catch (error) {
      console.log("Error al actualizar estado del booking:", error);
      alert("Hubo un problema al actualizar el estado del booking");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-indigo-900 mb-6">Gestión de reservas</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-600">No tenés reservas todavía.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="rounded-xl shadow-md p-4 bg-white border border-gray-300"
            >
              <h3 className="text-indigo-900 font-semibold mb-2">{b.service?.name}</h3>
              <p className="text-sm text-gray-700">Fecha: {b.service?.date?.slice(0, 10)}</p>
              <p className="text-sm text-gray-700">Hora: {b.service?.time}</p>
              <p className="text-sm text-gray-700">Usuario: {b.user?.name} {b.user?.lastName}</p>
              <p className="text-sm text-gray-700">Estado: {b.status}</p>

              {b.status === "PENDING" && (
                <div className="flex gap-2 mt-3">
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
                  className="mt-3 bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                >
                  Cancelar clase
                </button>
              )}

              {b.service?.sharedFiles?.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-semibold text-indigo-800 mb-1">Archivos compartidos:</p>
                  <ul className="list-disc list-inside text-sm text-blue-700">
                    {b.service.sharedFiles.map((url, i) => (
                      <li key={i}>
                        <a href={url} target="_blank" rel="noopener noreferrer" className="underline">
                          Archivo {i + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {b.status === "CONFIRMED" && (
                <div className="mt-4">
                  <input
                    type="text"
                    value={fileUrls[b.service._id] || ""}
                    onChange={(e) => handleInputChange(b.service._id, e.target.value)}
                    placeholder="URL del archivo"
                    className="w-full mb-2 border border-gray-300 px-2 py-1 rounded"
                  />
                  <button
                    onClick={() => handleAgregarArchivo(b.service._id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Enviar archivo
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GestionServicios;
