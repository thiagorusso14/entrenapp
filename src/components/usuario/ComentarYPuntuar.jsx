import { useEffect, useState } from "react";
import api from "../../axios/axios";
import { FaStar } from "react-icons/fa";

const ComentarYPuntuar = () => {
  const [clasesConfirmadas, setClasesConfirmadas] = useState([]);
  const [resenas, setResenas] = useState({});
  const [mensaje, setMensaje] = useState({ text: "", type: "" });

  const usuario = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchConfirmadas = async () => {
      try {
        const { data } = await api.get(
          `/booking/user/${usuario._id}/confirmed-trainers`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const clases = Array.isArray(data.clases) ? data.clases : [];

        const inicial = {};
        clases.forEach((clase) => {
          inicial[clase._id] = {
            rating: 0,
            comentario: "",
            enviado: false,
            success: false,
          };
        });

        setClasesConfirmadas(clases);
        setResenas(inicial);
      } catch (error) {
        console.error("Error al cargar clases confirmadas:", error);
        setMensaje({
          text: "No se pudieron cargar tus clases confirmadas.",
          type: "error",
        });
      }
    };

    fetchConfirmadas();
  }, []);

  const handlePuntuar = (id, valor) => {
    setResenas((prev) => ({
      ...prev,
      [id]: { ...prev[id], rating: valor },
    }));
  };

  const handleComentario = (id, texto) => {
    setResenas((prev) => ({
      ...prev,
      [id]: { ...prev[id], comentario: texto },
    }));
  };

  const handleEnviarResena = async (clase) => {
    const { rating, comentario } = resenas[clase._id];

    if (!rating || !comentario.trim()) {
      setMensaje({
        text: "Debes ingresar una puntuación y un comentario.",
        type: "error",
      });
      return;
    }

    try {
      await api.post(
        "/reviews",
        {
          rating,
          comment: comentario.trim(),
          author: usuario._id,
          trainer: clase.trainer._id,
          service: clase.service._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResenas((prev) => ({
        ...prev,
        [clase._id]: {
          ...prev[clase._id],
          enviado: true,
          success: true,
        },
      }));

      setMensaje({ text: "", type: "" });
    } catch (error) {
      console.error("Error al enviar reseña:", error);
      setMensaje({
        text: "Ya enviaste una reseña para esta clase o hubo un error.",
        type: "error",
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-indigo-900 mb-6">
        Comentar y puntuar
      </h1>

      {mensaje.text && (
        <p
          className={`text-center mb-4 text-sm font-medium ${
            mensaje.type === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {mensaje.text}
        </p>
      )}

      {clasesConfirmadas.length === 0 ? (
        <p className="text-center text-gray-600">
          No tenés clases confirmadas para comentar aún.
        </p>
      ) : (
        <div className="space-y-6">
          {clasesConfirmadas.map((clase) => {
            const resena = resenas[clase._id] || {};
            const entrenador = clase.trainer;
            const servicio = clase.service;

            return (
              <div
                key={clase._id}
                className={`p-6 rounded-xl shadow-md border transition-all ${
                  resena.success
                    ? "bg-green-100 border-green-400"
                    : "bg-white border-indigo-200"
                }`}
              >
                <h2 className="text-lg font-bold text-indigo-800 mb-1">
                  {entrenador.name} {entrenador.lastName}
                </h2>
                <p className="text-sm text-gray-700">
                  Clase: <strong>{servicio.name}</strong> | Categoría:{" "}
                  <strong>{servicio.category}</strong>
                </p>
                <p className="text-sm text-gray-700">
                  Fecha: {new Date(servicio.date).toLocaleDateString()} - Hora:{" "}
                  {servicio.time}
                </p>
                <p className="text-sm text-gray-700">
                  Modalidad: {servicio.mode} - Precio: ${servicio.price}
                </p>

                <div className="flex gap-3 items-center mt-3">
                  <label className="text-sm font-semibold text-indigo-700">
                    Puntuar:
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((estrella) => (
                      <FaStar
                        key={estrella}
                        className={`cursor-pointer text-lg ${
                          estrella <= resena.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        onClick={() =>
                          !resena.enviado &&
                          handlePuntuar(clase._id, estrella)
                        }
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-2">
                  <input
                    type="text"
                    className="border rounded p-2 w-full"
                    placeholder="Escribí tu comentario"
                    disabled={resena.enviado}
                    value={resena.comentario}
                    onChange={(e) =>
                      handleComentario(clase._id, e.target.value)
                    }
                  />
                </div>

                <button
                  onClick={() => handleEnviarResena(clase)}
                  disabled={resena.enviado}
                  className={`mt-3 px-4 py-2 text-sm rounded font-semibold ${
                    resena.enviado
                      ? "bg-green-400 text-white cursor-not-allowed"
                      : "bg-indigo-700 hover:bg-indigo-800 text-white"
                  }`}
                >
                  {resena.enviado ? "Reseña enviada" : "Enviar reseña"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ComentarYPuntuar;
