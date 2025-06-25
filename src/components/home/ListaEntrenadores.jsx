import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "../../context/search/searchContext";
import ContratarServicio from "../usuario/ContratarServicio";
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaUserTie } from "react-icons/fa";
import api from "../../axios/axios";

const ListaEntrenadores = () => {
  const { services } = useContext(SearchContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [comentarios, setComentarios] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  const handleOpenDrawer = (servicio) => {
    setSelectedService(servicio);
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const comentariosMap = {};
        const uniqueTrainerIds = [...new Set(services.map(s => s.trainer?._id).filter(Boolean))];

        const promises = uniqueTrainerIds.map(async (trainerId) => {
          const res = await api.get(`/reviews/${trainerId}`);
          comentariosMap[trainerId] = res.data.reviews || [];
        });

        await Promise.all(promises);
        setComentarios(comentariosMap);
      } catch (err) {
        console.error("Error al cargar comentarios:", err);
      }
    };

    if (services.length) {
      fetchComentarios();
    }
  }, [services]);

  return (
    <section className="bg-gray-100 py-12 px-4 md:px-12">
      <h2 className="text-4xl font-bold text-center mb-10 text-indigo-900">
        Entrenadores disponibles
      </h2>

      {services.length === 0 ? (
        <p className="text-center text-gray-500">No hay servicios para mostrar.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services
            .filter((servicio) => servicio.published)
            .map((servicio) => {
              const trainerId = servicio.trainer?._id;
              const resenas = comentarios[trainerId]?.slice(0, 2) || [];

              return (
                <div
                  key={servicio._id}
                  className="bg-indigo-800 rounded-2xl p-6 shadow-md text-white flex flex-col items-start justify-between"
                >
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-1">
                    <FaUserTie /> {servicio.trainer?.name} {servicio.trainer?.lastName}
                  </h3>

                  <p className="text-sm opacity-80 mb-2">{servicio.category}</p>

                  <div className="w-full text-sm space-y-1 mb-4">
                    <p><strong>Descripción:</strong> {servicio.name}</p>
                    <p className="flex items-center gap-2">
                      <FaMapMarkerAlt /> Zona: {servicio.zone}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaClock /> Duración: {servicio.duration} min
                    </p>
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt /> Fecha: {new Date(servicio.date).toLocaleDateString()}
                    </p>
                    <p className="flex items-center gap-2">🕒 Hora: {servicio.time}</p>
                    <p className="text-green-300 font-bold">${servicio.price}</p>
                    <p><strong>Modalidad:</strong> {servicio.mode}</p>
                  </div>

                  {/* Sección de comentarios */}
                  <div className="bg-white text-indigo-900 rounded-lg p-3 mb-4 w-full min-h-[50px]">
                    {resenas.length > 0 ? (
                      <>
                        <h4 className="font-semibold text-sm mb-2">Comentarios recientes:</h4>
                        {resenas.map((r, i) => (
                          <div key={i} className="text-sm mb-2 border-b pb-2 last:border-0 last:mb-0">
                            <p className="text-yellow-400">{"★".repeat(r.rating)}</p>
                            <p className="italic text-indigo-800">{r.comment}</p>
                            {r.trainerReply?.text && (
                              <div className="bg-indigo-100 rounded mt-1 px-2 py-1 text-xs text-indigo-900">
                                <strong>Respuesta del entrenador:</strong> <em>{r.trainerReply.text}</em>
                              </div>
                            )}
                          </div>
                        ))}
                      </>
                    ) : (
                      <p className="text-xs italic text-gray-500">Este entrenador aún no tiene reseñas.</p>
                    )}
                  </div>

                  <button
                    onClick={() => handleOpenDrawer(servicio)}
                    className="bg-white text-indigo-800 py-2 px-4 rounded-full hover:bg-gray-100 transition w-full text-center font-semibold"
                  >
                    {user ? "Contratar servicio" : "Iniciar sesión"}
                  </button>
                </div>
              );
            })}
        </div>
      )}

      {isDrawerOpen && (
        <ContratarServicio
          onClose={() => setIsDrawerOpen(false)}
          servicio={selectedService}
        />
      )}
    </section>
  );
};

export default ListaEntrenadores;
