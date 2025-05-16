import { useState } from "react";

const entrenadores = [
  { id: 1, nombre: "Juan" },
  { id: 2, nombre: "Roberto" },
  { id: 3, nombre: "Daniel" },
];

const ComentarYPuntuar = () => {
  const [resenas, setResenas] = useState(
    entrenadores.map((e) => ({
      id: e.id,
      rating: 0,
      comentario: "",
    }))
  );

  const handlePuntuar = (id, valor) => {
    setResenas((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, rating: valor } : r
      )
    );
  };

  const handleComentario = (id, texto) => {
    setResenas((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, comentario: texto } : r
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-indigo-900 mb-6">Comenta y puntuar</h1>

      <div className="bg-indigo-200 p-6 rounded-xl shadow-md max-w-4xl w-full">
        <div className="grid grid-cols-3 font-semibold text-indigo-900 mb-4">
          <span>Coach</span>
          <span>Puntuar</span>
          <span>Comentar</span>
        </div>

        {entrenadores.map((entrenador) => {
          const resena = resenas.find((r) => r.id === entrenador.id);
          return (
            <div key={entrenador.id} className="grid grid-cols-3 items-center mb-4">
              <span className="text-indigo-900 font-medium">{entrenador.nombre}</span>
              
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((estrella) => (
                  <span
                    key={estrella}
                    className={`text-xl cursor-pointer ${
                      estrella <= resena.rating ? "text-yellow-400" : "text-gray-400"
                    }`}
                    onClick={() => handlePuntuar(entrenador.id, estrella)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <input
                type="text"
                placeholder="Escribí tu comentario"
                className="p-2 rounded border border-gray-300 w-11/12"
                value={resena.comentario}
                onChange={(e) => handleComentario(entrenador.id, e.target.value)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComentarYPuntuar;
