import React from "react";

function About() {
  return (
    <section className="relative bg-[#1b1464] text-white py-32 px-8 md:px-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10 z-0">
        <img
          src="/proteina.png"
          alt="Fondo proteína"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-20">
        <div className="flex justify-center lg:justify-start">
          <img
            src="/musculoso.png"
            alt="Hombre musculoso"
            className="w-[260px] md:w-[350px] lg:w-[400px] drop-shadow-2xl"
          />
        </div>

        <div className="text-center lg:text-left max-w-4xl">
          <p className="text-md tracking-wider text-gray-300 uppercase mb-4">
            Acerca de
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            EntrenApp PARA HOMBRES & MUJERES
          </h2>
          <p className="text-yellow-400 font-semibold text-lg md:text-xl leading-relaxed mb-10">
            EntrenApp es un espacio pensado para conectar entrenadores personales con personas que quieren mejorar su salud y transformar su cuerpo. <br />
            Ofrecemos planes de entrenamiento y acondicionamiento personalizados, adaptados a la composición y objetivos de cada persona.
          </p>

          <p className="text-2xl font-semibold mb-6">¿Qué ofrecemos?</p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-8">
            <div className="bg-white rounded-2xl border-[5px] border-indigo-900 shadow-2xl w-48 h-48 flex flex-col justify-center items-center text-[#1b1464] hover:scale-105 transition">
              <p className="text-5xl font-bold">24</p>
              <p className="-mt-1 text-2xl">/7</p>
              <p className="text-base mt-2 font-medium">Chat</p>
            </div>

            <div className="bg-white rounded-2xl border-[5px] border-indigo-900 shadow-2xl w-48 h-48 flex flex-col justify-center items-center text-[#1b1464] hover:scale-105 transition">
              <p className="text-xl font-semibold">Asesoría</p>
              <p className="text-3xl font-bold mt-2">1 a 1</p>
            </div>

            <div className="bg-white rounded-2xl border-[5px] border-indigo-900 shadow-2xl w-48 h-48 flex flex-col justify-center items-center text-[#1b1464] hover:scale-105 transition">
              <div className="w-12 h-12 border-[5px] border-[#1b1464] rounded-full mb-3"></div>
              <p className="text-base font-medium">Plan Nutricional</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
