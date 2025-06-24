import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Públicas
import Home from "./components/home/Home";
import Nosotros from "./components/home/Nosotros";
import LayoutPublico from "./components/home/LayoutPublico";

// Auth
import Registro from "./components/auth/Registro";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import CreateNewPassword from "./components/auth/CreateNewPassword";

// Entrenador
import LayoutEntrenador from "./components/entrenador/LayoutEntrenador";
import RegistroServicios from "./components/entrenador/RegistroServicios";
import EstadisticasServicios from "./components/entrenador/EstadisticasServicios";
import GestionServicios from "./components/entrenador/GestionServicios";
import MisDatosEntrenador from "./components/entrenador/MisDatosEntrenador";

// Usuario
import LayoutUsuario from "./components/usuario/LayoutUsuario";
import MisDatos from "./components/usuario/MisDatos";
import ComentarYPuntuar from "./components/usuario/ComentarYPuntuar";
import MisClases from "./components/usuario/MisClases";
import MisArchivos from "./components/usuario/MisArchivos";

// Protecciones de rutas
const PrivateRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!token || !user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas con Layout */}
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

        {/* Rutas públicas sin layout */}
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-entrenador" element={<Login tipo="entrenador" />} />
        <Route path="/recuperar" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<CreateNewPassword />} />

        {/* Panel del entrenador (protegido) */}
        <Route
          path="/entrenador"
          element={
            <PrivateRoute role="TRAINER_ROLE">
              <LayoutEntrenador />
            </PrivateRoute>
          }
        >
          <Route path="registro" element={<RegistroServicios />} />
          <Route path="estadisticas" element={<EstadisticasServicios />} />
          <Route path="gestion" element={<GestionServicios />} />
          <Route path="mis-datos" element={<MisDatosEntrenador />} />
        </Route>

        {/* Panel del usuario (protegido) */}
        <Route
          path="/usuario"
          element={
            <PrivateRoute role="USER_ROLE">
              <LayoutUsuario />
            </PrivateRoute>
          }
        >
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
