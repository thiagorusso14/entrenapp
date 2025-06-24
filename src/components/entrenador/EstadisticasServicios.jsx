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

        const [statsRes, reviewsRes] = await Promise.all([
          api.get(`/reviews/trainer-stats/${trainer._id}`),
          api.get(`/reviews/${trainer._id}`),
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

  if (error) {
    return <p className="text-red-500 font-semibold">{error}</p>;
  }

  if (!stats) {
    return <p className="text-gray-500">Cargando estadísticas...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-indigo-900 mb-6">
        Estadísticas de tus servicios
      </h2>

      <div className="bg-indigo-100 p-6 rounded-xl shadow-md space-y-4 mb-10">
        <p className="text-sm text-gray-700">
          <strong>Servicios publicados:</strong> {stats.publishedServicesCount}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Clases confirmadas:</strong> {stats.confirmedBookingsCount}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Promedio de valoración:</strong> {stats.averageRating}/5
        </p>
        <p className="text-sm text-gray-700">
          <strong>Total de vistas:</strong> {stats.totalViews}
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-indigo-900">Reseñas de alumnos</h3>
        {reviews.length > 0 ? (
          reviews.map((r, i) => (
            <div key={i} className="bg-white border border-gray-300 rounded-lg p-4 shadow">
              <p className="text-gray-800 font-medium mb-2">
                Valoración: <span className="text-yellow-500">{r.rating} ★</span>
              </p>
              <p className="text-gray-600">{r.comment}</p>
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
