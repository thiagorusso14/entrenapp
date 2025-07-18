import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-white font-poppins shadow-md">
      <h1 className="text-xl font-medium text-[#0A014F]">
        Entren<span className="font-bold">APP</span>
      </h1>

      <ul className="flex items-center gap-8 text-sm font-bold text-[#0A014F]">
        {!user ? (
          <>
            <li>
              <Link to="/nosotros" className="hover:underline">Nosotros</Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline">Iniciar sesión</Link>
            </li>
            <li>
              <Link to="/registro" className="hover:underline">Registrarse</Link>
            </li>
            <li>
              <Link
                to="/login-entrenador"
                className="bg-[#FFE54C] text-[#0A014F] rounded-full px-5 py-2 font-bold hover:bg-[#f5d940] transition"
              >
                Soy Entrenador
              </Link>
            </li>
          </>
        ) : user.role === "USER_ROLE" ? (
          <>
            <li>
              <Link to="/usuario" className="hover:underline">Mi cuenta</Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline"
              >
                Cerrar sesión
              </button>
            </li>
          </>
        ) : user.role === "TRAINER_ROLE" ? (
          <>
            <li>
              <Link to="/entrenador" className="hover:underline">Panel</Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline"
              >
                Cerrar sesión
              </button>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
}

export default Navbar;
