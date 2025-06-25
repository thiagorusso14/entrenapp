import React, { useEffect, useState } from "react";
import api from "../../axios/axios";

function EstadisticasServicios() {
  const [stats, setStats] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStatsAndReviews = async () => {
      try {
        const trainer = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const [statsRes, reviewsRes] = await Promise.all([
          api.get(`/stats/trainer/${trainer._id}`, config),
          api.get(`/reviews/${trainer._id}`, config),
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

  if (error) return <p className="text-red-500 font-semibold">{error}</p>;
  if (!stats) return <p className="text-gray-500">Cargando estadísticas...</p>;

  const conversionRate =
    stats.totalViews > 0
      ? ((stats.confirmedBookingsCount / stats.totalViews) * 100).toFixed(2)
      : "0.00";

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

              

              <p className="text-gray-600 italic">"{r.comment}"</p>
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
