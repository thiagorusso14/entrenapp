import { FaDownload } from "react-icons/fa";

const archivosMock = [
  {
    coach: "Juan",
    archivos: ["RutinaYoga.pdf"],
  },
  {
    coach: "Agustin",
    archivos: ["RutinaPecho.pdf", "RutinaPiernas.pdf", "RutinaEspalda.pdf"],
  },
];

const MisArchivos = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-indigo-900 mb-6">Archivos</h1>

      <div className="space-y-6 max-w-xl">
        {archivosMock.map((grupo, index) => (
          <div key={index} className="bg-indigo-200 rounded-xl shadow-md">
            <details open className="rounded-xl overflow-hidden">
              <summary className="bg-indigo-300 px-4 py-2 font-semibold cursor-pointer text-indigo-900">
                {grupo.coach}
              </summary>

              <ul className="bg-gray-100 divide-y">
                {grupo.archivos.map((archivo, idx) => (
                  <li key={idx} className="flex items-center justify-between px-4 py-2">
                    <span>{archivo}</span>
                    <button className="text-indigo-900 hover:text-indigo-600">
                      <FaDownload />
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MisArchivos;
