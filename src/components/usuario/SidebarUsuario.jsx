import React from "react";
import {
  FaUserCircle,
  FaUser,
  FaCommentAlt,
  FaChalkboardTeacher,
  FaPaperclip,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SidebarUsuario = () => {
  return (
    <aside className="bg-[#1b1464] text-white w-28 md:w-64 h-screen p-4 flex flex-col justify-between">
      <div>
        {/* Perfil */}
        <div className="flex flex-col items-center mb-10">
          <FaUserCircle className="text-4xl mb-2" />
          <p className="text-center text-sm font-semibold">Nombre del cliente</p>
        </div>

        {/* Links */}
        <nav className="space-y-6 text-sm md:text-base">
          <NavLink
            to="/usuario/mis-datos"
            className={({ isActive }) =>
              `flex items-center gap-2 ${isActive ? "text-white font-bold" : "text-gray-200"}`
            }
          >
            <FaUser /> Mis Datos
          </NavLink>
          <NavLink
            to="/usuario/comentar"
            className={({ isActive }) =>
              `flex items-center gap-2 ${isActive ? "text-white font-bold" : "text-gray-200"}`
            }
          >
            <FaCommentAlt /> Comentar y puntuar
          </NavLink>
          <NavLink
            to="/usuario/mis-clases"
            className={({ isActive }) =>
              `flex items-center gap-2 ${isActive ? "text-white font-bold" : "text-gray-200"}`
            }
          >
            <FaChalkboardTeacher /> Mis clases
          </NavLink>
          <NavLink
            to="/usuario/mis-archivos"
            className={({ isActive }) =>
              `flex items-center gap-2 ${isActive ? "text-white font-bold" : "text-gray-200"}`
            }
          >
            <FaPaperclip /> Mis archivos
          </NavLink>
        </nav>
      </div>

      {/* Logout */}
      <button className="flex items-center gap-2 text-sm text-white hover:text-gray-300">
        <FaSignOutAlt /> Logout
      </button>
    </aside>
  );
};

export default SidebarUsuario;
