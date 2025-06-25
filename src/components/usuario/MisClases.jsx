import { useEffect, useState } from "react";
import api from "../../axios/axios";

const MisClases = () => {
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const { data } = await api.get(`/booking/user/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setClases(data.bookings || []);
      } catch (error) {
        console.error("Error al traer clases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClases();
  }, []);

  const cancelarClase = async (bookingId) => {
    const confirmar = confirm("¿Seguro que querés cancelar esta clase?");
    if (!confirmar) return;

    try {
      await api.post(`/booking/user/classes/${bookingId}/cancel`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setClases((prev) => prev.map(c =>
        c._id === bookingId ? { ...c, status: "CANCELLED" } : c
      ));
    } catch (error) {
      console.error("Error al cancelar clase:", error);
      alert("Error al cancelar la clase.");
    }
  };

  const getCardColor = (status) => {
    switch (status) {
      case "CANCELLED":
        return "bg-gray-300";
      case "CONFIRMED":
        return "bg-green-300";
      default:
        return "bg-indigo-300";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-indigo-900 mb-6">Mis clases</h1>

      {loading ? (
        <p>Cargando clases...</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {clases.length === 0 ? (
            <p>No tenés clases todavía.</p>
          ) : (
            clases.map((clase) => (
              <div
                key={clase._id}
                className={`rounded-xl p-4 shadow-md w-72 relative text-indigo-900 ${getCardColor(clase.status)}`}
              >
                <div className="mb-2 font-semibold">
                  Fecha: {new Date(clase.service.date).toLocaleDateString()} <br />
                  Hora: {clase.service.time}
                </div>
                <div className="text-sm">
                  <p><strong>Coach:</strong> {clase.trainer?.name} {clase.trainer?.lastName}</p>
                  <p><strong>Clase:</strong> {clase.service?.name}</p>
                  <p><strong>Modalidad:</strong> {clase.service?.mode}</p>
                  <p><strong>Duración:</strong> {clase.service?.duration} min</p>
                  <p><strong>Precio:</strong> ${clase.service?.price.toLocaleString()}</p>
                  <p><strong>Estado:</strong> {clase.status}</p>
                  {clase.service?.sharedFiles?.length > 0 && clase.status != 'CANCELLED' && (
                    <div className="mt-3">
                      <p className="text-sm font-semibold text-indigo-800 mb-1">Material compartido:</p>
                      <ul className="list-disc list-inside text-sm text-blue-700">
                        {clase.service.sharedFiles.map((url, i) => (
                          <li key={i}>
                            <a href={url} target="_blank" rel="noopener noreferrer" className="underline">
                              Archivo {i + 1}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {clase.status !== "CANCELLED" && (
                  <button
                    onClick={() => cancelarClase(clase._id)}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MisClases;
