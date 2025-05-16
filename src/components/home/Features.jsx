function Features() {
    const features = [
      {
        title: "Chat 24/7",
        description: "Consultas personalizadas en cualquier momento del día.",
      },
      {
        title: "Asesoría 1 a 1",
        description: "Acompañamiento personalizado con tu entrenador.",
      },
      {
        title: "Plan Nutricional",
        description: "Planes alimenticios adaptados a tus objetivos.",
      },
    ];
  
    return (
      <section className="py-16 px-6 md:px-20 bg-gray-100">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Beneficios de EntrenApp</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 shadow-md rounded-xl p-6 w-full max-w-sm text-center hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold mb-2 text-indigo-600">{f.title}</h3>
              <p className="text-sm text-gray-700">{f.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  export default Features;
  