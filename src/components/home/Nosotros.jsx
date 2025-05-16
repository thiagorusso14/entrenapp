import React from "react";

const Nosotros = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 md:px-24 text-indigo-900">
      <h1 className="text-4xl font-bold mb-10 text-center">Sobre Nosotros</h1>

      <section className="bg-white rounded-xl shadow-lg p-8 mb-10">
        <h2 className="text-2xl font-semibold mb-4">Misión</h2>
        <p>
          Nuestra misión en <strong>EntrenApp</strong> es transformar vidas mediante el acceso a entrenadores personales certificados, brindando planes adaptados y seguimiento cercano para mejorar la salud, el bienestar y la confianza de cada persona.
        </p>
      </section>

      <section className="bg-white rounded-xl shadow-lg p-8 mb-10">
        <h2 className="text-2xl font-semibold mb-4">Visión</h2>
        <p>
          Ser la plataforma líder en entrenamiento personalizado en el mundo hispano, donde la tecnología y la empatía humana se unen para alcanzar objetivos físicos y mentales sostenibles.
        </p>
      </section>

      <section className="bg-white rounded-xl shadow-lg p-8 mb-10">
        <h2 className="text-2xl font-semibold mb-4">Nuestros Valores</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Compromiso:</strong> con cada usuario y su proceso.</li>
          <li><strong>Empatía:</strong> entendemos las distintas realidades físicas y emocionales.</li>
          <li><strong>Disciplina:</strong> como motor para lograr cambios sostenibles.</li>
          <li><strong>Inclusión:</strong> entrenamos con respeto sin importar edad, género o experiencia.</li>
        </ul>
      </section>

      <section className="bg-white rounded-xl shadow-lg p-8 mb-10">
        <h2 className="text-2xl font-semibold mb-4">Nuestra Historia</h2>
        <p>
          EntrenApp nació en 2025 como una solución a la falta de acompañamiento real en los entrenamientos digitales. Nos propusimos conectar a las personas con entrenadores humanos, profesionales y comprometidos, para que cada sesión tenga un impacto real.
        </p>
      </section>
    </div>
  );
};

export default Nosotros;
