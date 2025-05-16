import React from "react";

const trainers = [
  {
    name: "Coach Juan",
    role: "Especialista en entrenamiento funcional y pérdida de peso",
    description:
      "Con más de 5 años de experiencia, Juan se enfoca en entrenamientos dinámicos para mejorar la movilidad, fuerza y resistencia. Ideal para quienes buscan transformar su cuerpo y estilo de vida con rutinas intensas y accesibles.",
    image: "/juan.jpg",
  },
  {
    name: "Coach Agustín",
    role: "Entrenador integral en yoga, pilates y movilidad",
    description:
      "Agustín combina lo mejor del entrenamiento consciente con rutinas físicas que mejoran el equilibrio mental y corporal. Perfecto para quienes buscan mejorar postura, flexibilidad y reducir el estrés.",
    image: "/agustin.jpg",
  },
  {
    name: "Coach Ángel",
    role: "Especialista en hipertrofia y fuerza avanzada",
    description:
      "Ángel diseña planes de entrenamiento personalizados para ganar masa muscular y aumentar fuerza de forma progresiva. Ideal para quienes ya entrenan o quieren llevar su físico al siguiente nivel.",
    image: "/angel.jpg",
  },
];

function Trainers() {
  return (
    <div
      className="relative py-16 px-4 md:px-16 text-white"
      style={{
        backgroundImage: "url('/gym.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-white">
          Entrenadores Destacados
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className="bg-violet-200 text-black p-6 rounded-3xl shadow-lg flex flex-col items-center text-center"
            >
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-1">{trainer.name}</h3>
              <p className="text-sm font-medium mb-2">{trainer.role}</p>
              <p className="text-sm">{trainer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Trainers;
