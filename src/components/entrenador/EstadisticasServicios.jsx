import React, { useEffect, useState } from "react";
import api from "../../axios/axios";

function EstadisticasServicios() {
  const [stats, setStats] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [respuestas, setRespuestas] = useState({}); // manejamos respuestas locales

  const trainer = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStatsAndReviews = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const [statsRes, reviewsRes] = await Promise.all([
          api.get(`/stats/trainer/${trainer._id}`, config),
          api.get(`/reviews/${trainer._id}`)
        ]);

        setStats(statsRes.data);
        if (reviewsRes.data.reviews) {
          setReviews(reviewsRes.data.reviews);
        }
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError("No se pudieron obtener las estadísticas o reseñas.");
      }
    };

    fetchStatsAndReviews();
  }, []);

  const handleResponder = async (reviewId) => {
    const respuesta = respuestas[reviewId];
    if (!respuesta || !respuesta.trim()) return;

    try {
      await api.patch(`/reviews/reply/${reviewId}`, {
        reply: respuesta.trim()
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // actualizar review localmente
      setReviews(prev =>
        prev.map(r => r._id === reviewId ? { ...r, reply: respuesta.trim() } : r)
      );

      setRespuestas(prev => ({ ...prev, [reviewId]: "" }));
    } catch (err) {
      console.error("Error al responder reseña:", err);
      alert("No se pudo enviar la respuesta.");
    }
  };

  const conversionRate =
    stats?.totalViews > 0
      ? ((stats.confirmedBookingsCount / stats.totalViews) * 100).toFixed(2)
      : "0.00";

  if (error) return <p className="text-red-500 font-semibold">{error}</p>;
  if (!stats) return <p className="text-gray-500">Cargando estadísticas...</p>;

  return (
    <div className="p-6 font-poppins">
      <h2 className="text-2xl font-bold text-indigo-900 mb-6">
        Estadísticas de tus servicios
      </h2>

      <div className="bg-indigo-100 p-6 rounded-xl shadow-md space-y-3 mb-10 text-gray-800 text-sm">
        <p><strong>Servicios publicados:</strong> {stats.publishedServicesCount}</p>
        <p><strong>Clases confirmadas:</strong> {stats.confirmedBookingsCount}</p>
        <p><strong>Promedio de valoración:</strong> {stats.averageRating} / 5</p>
        <p><strong>Total de vistas:</strong> {stats.totalViews}</p>
        <p><strong>Total de calificaciones:</strong> {stats.ratingsCount}</p>
        <p><strong>Tasa de conversión:</strong> {conversionRate}%</p>
        <div>
          <strong>Distribución de calificaciones:</strong>
          <ul className="ml-4 mt-2 list-disc">
            {[5, 4, 3, 2, 1].map(star => (
              <li key={star}>
                ⭐ {star} estrellas: {stats.ratingDistribution[star] || 0}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-indigo-900">Reseñas de alumnos</h3>

        {reviews.length > 0 ? (
          reviews.map((r, i) => (
            <div key={i} className="bg-white border border-gray-300 rounded-lg p-4 shadow">
              <p className="text-gray-800 font-medium mb-1">
                Valoración: <span className="text-yellow-500">{r.rating} ★</span>
              </p>

              <p className="text-sm text-gray-700 mb-1">
                <strong>Autor:</strong> {r.author?.name} {r.author?.lastName}
              </p>

              <p className="text-gray-600 italic mb-2">"{r.comment}"</p>

              {r.reply ? (
                <div className="bg-indigo-100 border border-indigo-300 p-3 rounded text-sm text-gray-800">
                  <strong>Respuesta del entrenador:</strong>
                  <p className="mt-1 italic text-indigo-800">{r.reply}</p>
                </div>
              ) : (
                <div className="mt-2 space-y-2">
                  <textarea
                    rows={2}
                    className="w-full border border-gray-300 rounded p-2 text-sm"
                    placeholder="Escribe tu respuesta..."
                    value={respuestas[r._id] || ""}
                    onChange={(e) =>
                      setRespuestas(prev => ({ ...prev, [r._id]: e.target.value }))
                    }
                  />
                  <button
                    onClick={() => handleResponder(r._id)}
                    className="bg-indigo-700 hover:bg-indigo-800 text-white text-sm px-4 py-2 rounded shadow"
                  >
                    Enviar respuesta
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">Aún no recibiste reseñas.</p>
        )}
      </div>
    </div>
  );
}

export default EstadisticasServicios;
