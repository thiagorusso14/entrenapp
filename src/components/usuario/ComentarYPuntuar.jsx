import { useState, useEffect } from "react";
import api from "../../axios/axios";

const ComentarYPuntuar = () => {
  const [entrenadores, setEntrenadores] = useState([]);
  const [resenas, setResenas] = useState({});
  const [mensaje, setMensaje] = useState("");

  const usuario = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchEntrenadores = async () => {
      try {
        const { data } = await api.get("/users/trainers");
        setEntrenadores(data);
        const inicial = {};
        data.forEach((e) => {
          inicial[e._id] = { rating: 0, comentario: "" };
        });
        setResenas(inicial);
      } catch (error) {
        console.error("Error al cargar entrenadores", error);
      }
    };

    fetchEntrenadores();
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

  const handleEnviarResena = async (id) => {
    const { rating, comentario } = resenas[id];

    if (!rating || !comentario.trim()) {
      setMensaje("Debes ingresar una puntuación y un comentario.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/reviews",
        {
          rating,
          comment: comentario,
          author: usuario._id,
          trainer: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMensaje("Reseña enviada correctamente");
    } catch (error) {
      console.error("Error al enviar reseña:", error);
      setMensaje("Error al enviar la reseña.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-indigo-900 mb-6">Comentar y puntuar</h1>

      {mensaje && (
        <p className="text-center mb-4 text-sm font-medium text-red-600">{mensaje}</p>
      )}

      <div className="bg-indigo-200 p-6 rounded-xl shadow-md max-w-4xl w-full">
        <div className="grid grid-cols-4 font-semibold text-indigo-900 mb-4">
          <span>Coach</span>
          <span>Puntuar</span>
          <span>Comentar</span>
          <span>Acción</span>
        </div>

        {entrenadores.map((entrenador) => {
          const resena = resenas[entrenador._id] || { rating: 0, comentario: "" };

          return (
            <div
              key={entrenador._id}
              className="grid grid-cols-4 items-center mb-4 gap-2"
            >
              <span className="text-indigo-900 font-medium">
                {entrenador.name} {entrenador.lastName}
              </span>

              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((estrella) => (
                  <span
                    key={estrella}
                    className={`text-xl cursor-pointer ${
                      estrella <= resena.rating ? "text-yellow-400" : "text-gray-400"
                    }`}
                    onClick={() => handlePuntuar(entrenador._id, estrella)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <input
                type="text"
                placeholder="Escribí tu comentario"
                className="p-2 rounded border border-gray-300 w-full"
                value={resena.comentario}
                onChange={(e) =>
                  handleComentario(entrenador._id, e.target.value)
                }
              />

              <button
                onClick={() => handleEnviarResena(entrenador._id)}
                className="bg-indigo-800 text-white text-sm py-1 px-3 rounded hover:bg-indigo-700"
              >
                Enviar
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComentarYPuntuar;
