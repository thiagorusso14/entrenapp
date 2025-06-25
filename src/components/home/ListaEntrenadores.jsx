import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContratarServicio from "../usuario/ContratarServicio";
import api from "../../axios/axios";

const ListaEntrenadores = () => {
  const [services, setServices] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleOpenDrawer = (servicio) => {
    setSelectedService(servicio);
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await api.get("/services/active");
        setServices(data);
      } catch (error) {
        console.error("Error al obtener servicios activos:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="bg-white py-12 px-4 md:px-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Entrenadores disponibles</h2>

      {services.length === 0 ? (
        <p className="text-center text-gray-500">No hay servicios para mostrar.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((servicio) => (
            <div
              key={servicio._id}
              className="bg-indigo-800 rounded-2xl p-6 shadow-lg text-white flex flex-col items-center"
            >
              <img
                src={servicio.trainer?.photo || "/default-profile.jpg"}
                alt={servicio.trainer?.name || "Entrenador"}
                className="w-28 h-28 object-cover rounded-full mb-4 border-4 border-white shadow-md"
              />
              <h3 className="text-lg font-bold underline">
                {servicio.trainer?.name || "Entrenador"}
              </h3>
              <p className="mt-1">{servicio.category}</p>
              <p className="text-yellow-300 font-semibold mt-1">
                ${servicio.price} / hr
              </p>

              <div className="text-sm text-left mt-4 w-full">
                <p className="font-semibold">Zona: {servicio.zone}</p>
                <p className="font-semibold">Modalidad: {servicio.mode}</p>
                <p className="font-semibold">Duración: {servicio.duration} min</p>
                <p className="font-semibold">Fecha: {new Date(servicio.date).toLocaleDateString()}</p>
                <p className="font-semibold">Hora: {servicio.time}</p>
              </div>

              {user ? (
                <button
                  onClick={() => handleOpenDrawer(servicio)}
                  className="mt-6 bg-yellow-400 hover:bg-yellow-300 text-indigo-900 px-4 py-2 rounded-full transition duration-300 font-semibold"
                >
                  Contratar servicio
                </button>
              ) : (
                <Link to="/login">
                  <button className="mt-6 bg-yellow-400 hover:bg-yellow-300 text-indigo-900 px-4 py-2 rounded-full transition duration-300 font-semibold">
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
