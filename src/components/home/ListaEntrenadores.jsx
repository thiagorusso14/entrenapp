import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "../../context/search/searchContext";
import ContratarServicio from "../usuario/ContratarServicio";
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaUserTie } from "react-icons/fa";

const ListaEntrenadores = () => {
  const { services } = useContext(SearchContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleOpenDrawer = (servicio) => {
    setSelectedService(servicio);
    setIsDrawerOpen(true);
  };

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
            .map((servicio) => (
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
                  <p className="flex items-center gap-2">
                    🕒 Hora: {servicio.time}
                  </p>
                  <p className="text-green-300 font-bold">
                    ${servicio.price}
                  </p>
                  <p><strong>Modalidad:</strong> {servicio.mode}</p>
                </div>

                {user ? (
                  <button
                    onClick={() => handleOpenDrawer(servicio)}
                    className="bg-white text-indigo-800 py-2 px-4 rounded-full hover:bg-gray-100 transition w-full text-center font-semibold"
                  >
                    Contratar servicio
                  </button>
                ) : (
                  <Link to="/login" className="w-full">
                    <button className="bg-yellow-400 hover:bg-yellow-300 text-indigo-900 px-4 py-2 rounded-full w-full font-semibold transition">
                      Registrarse
                    </button>
                  </Link>
                )}
              </div>
            ))}
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
