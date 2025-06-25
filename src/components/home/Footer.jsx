import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-lg font-bold mb-4 text-yellow-400">GYM</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li> {/* ✅ actualizado */}
            <li><Link to="/#trainers">Entrenadores</Link></li>
            <li><Link to="/#contacto">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 text-yellow-400">MEMBERS</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/login">Iniciar sesión</Link></li>
            <li><Link to="/registro">Registrarse</Link></li>
            <li><Link to="/login">Mi cuenta</Link></li>
            <li><Link to="/login">Contratar servicio</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 text-yellow-400">COMPANY</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/#terminos">Términos y condiciones</Link></li>
            <li><Link to="/#privacidad">Política de privacidad</Link></li>
            <li><Link to="/#soporte">Soporte</Link></li>
          </ul>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 mt-10">
        © 2025 EntrenApp. Todos los derechos reservados.
      </p>
    </footer>
  );
}

export default Footer;
