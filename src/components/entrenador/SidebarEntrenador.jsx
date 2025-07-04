import { useContext } from "react";
import {
  FaUserCircle,
  FaClipboardList,
  FaChartBar,
  FaSignOutAlt,
  FaEdit,
  FaIdBadge
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/authContext";

function SidebarEntrenador() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    logout();
    navigate("/");
  };

  return (
    <aside className="bg-[#1b1464] text-white w-28 md:w-64 h-screen p-4 flex flex-col justify-between">
      <div>
        {/* Perfil */}
        <div className="flex flex-col items-center mb-10">
          <FaUserCircle className="text-4xl mb-2" />
          <p className="text-center text-sm font-semibold">
            {user?.name || ""} {user?.lastName || ""}
          </p>
        </div>

        <nav className="space-y-6 text-sm md:text-base">
          <NavLink
            to="/entrenador/mis-datos"
            className={({ isActive }) =>
              `flex items-center gap-2 ${isActive ? "text-white font-bold" : "text-gray-200"}`
            }
          >
            <FaIdBadge /> Mis Datos
          </NavLink>
          <NavLink
            to="/entrenador/registro"
            className={({ isActive }) =>
              `flex items-center gap-2 ${isActive ? "text-white font-bold" : "text-gray-200"}`
            }
          >
            <FaEdit /> Registro de Servicios
          </NavLink>
          <NavLink
            to="/entrenador/estadisticas"
            className={({ isActive }) =>
              `flex items-center gap-2 ${isActive ? "text-white font-bold" : "text-gray-200"}`
            }
          >
            <FaChartBar /> Estadísticas
          </NavLink>
          <NavLink
            to="/entrenador/gestion"
            className={({ isActive }) =>
              `flex items-center gap-2 ${isActive ? "text-white font-bold" : "text-gray-200"}`
            }
          >
            <FaClipboardList /> Gestión de servicios
          </NavLink>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-sm text-white hover:text-gray-300"
      >
        <FaSignOutAlt /> Logout
      </button>
    </aside>
  );
}

export default SidebarEntrenador;
