import { useParams } from "react-router-dom";
import api from "../../axios/axios";
import { useEffect, useState } from "react";
import WalletBrick from "../MercadoPago/WalletBrick";

const ContratarServicio = ({ onClose, servicio }) => {
  const { id } = useParams(); // en este componente no es necesario
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const contratarServicio = async () => {
      try {
        // 1. Crear la reserva (booking)
        await api.post(`/bookings/${user._id}`, {
          serviceId: servicio._id,
        });

        // 2. Generar preferencia de pago
        const { data } = await api.post('/services/create-preference', {
          title: `${servicio.name} - ${servicio.trainer.name}`,
          unit_price: servicio.price,
        });

        setPreferenceId(data.preferenceId);
      } catch (err) {
        console.error("Error al contratar servicio:", err);
        setError("No se pudo contratar el servicio.");
      } finally {
        setLoading(false);
      }
    };

    contratarServicio();
  }, []);

  if (loading) return <div className="text-center text-white">Cargando...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white shadow-md p-6 rounded-lg max-w-lg w-full space-y-4">
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-red-600 text-lg font-light border px-3 rounded-md border-red-600"
        >
          x
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Contratar servicio</h2>
        <p><strong>Entrenador:</strong> {servicio.trainer.name}</p>
        <p><strong>Clase:</strong> {servicio.name}</p>
        <p><strong>Categoría:</strong> {servicio.category}</p>
        <p><strong>Duración:</strong> {servicio.duration}min</p>
        <p><strong>Precio:</strong> ${servicio.price}</p>
        <p><strong>Modalidad:</strong> {servicio.mode}</p>
        <p><strong>Fecha:</strong> {new Date(servicio.date).toLocaleDateString()}</p>
        <p><strong>Hora:</strong> {servicio.time}</p>

        {/* Si hay preferenceId, mostrar botón de pago */}
        {preferenceId && <WalletBrick servicio={servicio} />}
      </div>
    </div>
  );
};

export default ContratarServicio;
