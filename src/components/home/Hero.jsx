import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

function Hero() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [filters, setFilters] = useState({
    zona: "",
    fecha: "",
    modalidad: "",
    precio: "",
    duracion: "",
    calificacion: "",
    categoria: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    console.log("Filtros aplicados:", filters);
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center px-10 text-white"
      style={{ backgroundImage: "url('/gym.jpg')" }}
    >
      {/* TEXTOS A LA IZQUIERDA */}
      <div className="flex-1 flex flex-col justify-start gap-100 pl-12">
        <h1 className="text-6xl font-extrabold leading-tight">Empezá a ponerte</h1>
        <h1 className="text-6xl font-extrabold leading-tight">en forma</h1>
        <p className="text-yellow-400 text-4xl font-bold mt-1">¡Unítenos!</p>
      </div>

      {/* BARRA DE BÚSQUEDA AJUSTADA */}
      <div className="flex-1 flex flex-col items-center gap-4">
        <div className="flex bg-white/90 backdrop-blur-lg shadow-lg rounded-full w-[1120px] px-4 py-3">
          {/* FILTROS DINÁMICOS */}
          {[
            { name: "zona", label: "Zona", options: ["Palermo", "Belgrano", "Lanús"] },
            { name: "modalidad", label: "Modalidad", options: ["Presencial", "Virtual"] },
            { name: "precio", label: "Precio", options: ["5000 a 7000", "7000 a 9000"] },
            { name: "duracion", label: "Duración", options: ["1 mes", "3 meses"] },
            { name: "calificacion", label: "Calificación", options: ["5 estrellas", "4 estrellas"] },
            { name: "categoria", label: "Categoría", options: ["Running", "Yoga", "Fuerza", "Nutrición"] },
          ].map((filtro, index) => (
            <div
              key={filtro.name}
              className={`flex flex-col px-4 ${index !== 5 ? "border-r border-gray-400/60" : ""}`}
            >
              <span className="text-xs font-semibold text-gray-700 mb-1">{filtro.label}</span>
              <select
                name={filtro.name}
                value={filters[filtro.name]}
                onChange={handleChange}
                className="bg-white text-sm text-gray-800 outline-none rounded"
              >
                <option value="">Seleccionar</option>
                {filtro.options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}

          {/* Fecha */}
          <div className="flex flex-col px-4 border-r border-gray-400/60">
            <span className="text-xs font-semibold text-gray-700 mb-1">Fecha</span>
            <input
              type="date"
              name="fecha"
              value={filters.fecha}
              onChange={handleChange}
              className="bg-white text-sm text-gray-800 outline-none rounded"
            />
          </div>

          {/* Botón buscar */}
          <button
            onClick={handleSearch}
            className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-6 ml-4 flex items-center justify-center"
          >
            <FaSearch size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
