import { useState, useEffect, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { SearchContext } from "../../context/search/searchContext";

function Hero() {
  const { searchServices, services } = useContext(SearchContext);

  useEffect(() => {
    console.log(services);
  }, [services]);

  const [filters, setFilters] = useState({
    zone: "",
    mode: "",
    price: "",
    duration: "",
    calification: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
  await searchServices(filters);
};

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center px-10 text-white"
      style={{ backgroundImage: "url('/gym.jpg')" }}
    >
      <div className="flex-1 flex flex-col justify-start gap-100 pl-12">
        <h1 className="text-6xl font-extrabold leading-tight">Empezá a ponerte</h1>
        <h1 className="text-6xl font-extrabold leading-tight">en forma</h1>
        <p className="text-yellow-400 text-4xl font-bold mt-1">¡Unítenos!</p>
      </div>

      <div className="flex-1 flex flex-col items-center gap-4">
        <div className="flex bg-white/90 backdrop-blur-lg shadow-lg rounded-full w-[1120px] px-4 py-3">
          {[
            {
              name: "zone", label: "Zona", options: ["PALERMO", "BELGRANO", "CABALLITO", "ALMAGRO", "PARQUE_PATRICIOS", "BOEDO", "AVELLANEDA", "ONLINE"]
            },
            { name: "mode", label: "Modalidad", options: ["PRESENCIAL", "ONLINE"] },
            { name: "price", label: "Precio", type: "number" },
            { name: "duration", label: "Duración", options: [30, 45, 60, 90, 120] },
            { name: "calification", label: "Calificación", options: [5, 4, 3, 2, 1] },
            { name: "category", label: "Categoría", options: ["GYM", "BOXEO", "ESTIRAMIENTO", "YOGA", "PILATES", "FUNCIONAL"] },
          ].map((filtro, index) => (
            <div
              key={filtro.name}
              className={`flex flex-col px-4 ${index !== 5 ? "border-r border-gray-400/60" : ""}`}
            >
              {filtro.type === "number" ? (
                <input
                  type="number"
                  name={filtro.name}
                  value={filters[filtro.name]}
                  onChange={handleChange}
                  className="bg-white text-sm text-gray-800 outline-none rounded px-2 py-1 w-32"
                  min={0}
                  placeholder="Máx. precio"
                />
              ) : (
                <select
                  name={filtro.name}
                  value={filters[filtro.name]}
                  onChange={handleChange}
                  className="bg-white text-sm text-gray-800 outline-none rounded"
                >
                  <option value="">{filtro.label}</option>
                  {filtro.options.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
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
