import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Públicas (desde la nueva carpeta 'home')
import Home from "./components/home/Home";
import Nosotros from "./components/home/Nosotros";
import LayoutPublico from "./components/home/LayoutPublico";

// Auth
import Registro from "./components/auth/Registro";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";

// Entrenador
import LayoutEntrenador from "./components/entrenador/LayoutEntrenador";
import RegistroServicios from "./components/entrenador/RegistroServicios";
import EstadisticasServicios from "./components/entrenador/EstadisticasServicios";
import GestionServicios from "./components/entrenador/GestionServicios";
import MisDatosEntrenador from "./components/entrenador/MisDatosEntrenador";

// Usuario (cliente)
import LayoutUsuario from "./components/usuario/LayoutUsuario";
import MisDatos from "./components/usuario/MisDatos";
import ComentarYPuntuar from "./components/usuario/ComentarYPuntuar";
import MisClases from "./components/usuario/MisClases";
import MisArchivos from "./components/usuario/MisArchivos";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas con Navbar y Footer */}
        <Route
          path="/"
          element={
            <LayoutPublico>
              <Home />
            </LayoutPublico>
          }
        />
        <Route
          path="/nosotros"
          element={
            <LayoutPublico>
              <Nosotros />
            </LayoutPublico>
          }
        />

        {/* Rutas públicas sin Navbar */}
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar" element={<ForgotPassword />} />

        {/* Panel del entrenador */}
        <Route path="/entrenador" element={<LayoutEntrenador />}>
          <Route path="registro" element={<RegistroServicios />} />
          <Route path="estadisticas" element={<EstadisticasServicios />} />
          <Route path="gestion" element={<GestionServicios />} />
          <Route path="mis-datos" element={<MisDatosEntrenador />} />
        </Route>

        {/* Panel del usuario (cliente) */}
        <Route path="/usuario" element={<LayoutUsuario />}>
          <Route path="mis-datos" element={<MisDatos />} />
          <Route path="comentar" element={<ComentarYPuntuar />} />
          <Route path="mis-clases" element={<MisClases />} />
          <Route path="mis-archivos" element={<MisArchivos />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
