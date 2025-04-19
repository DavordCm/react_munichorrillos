import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login.js";
import LoginUser from "./components/loginuser.js";
import RegistroUser from './components/RegistroUser';
import Register from "./components/register.js";
import Menu from "./pages/menu/menu.js";
import Municipalidad from "./pages/municipalidad/municipalidad.js";
import Deposito from "./pages/deposito/deposito.js";
import Fiscalizacion from "./pages/fiscalizacion/fiscalizacion.js";
import GenerarMulta from './pages/GenerarMulta/GenerarMulta.js';
import Infractores from "./pages/Infractores/Infractores.js";
import Cajas from "./pages/cajas/cajas.js";
import Sistema from "./pages/sistema/sistema.js";
import Infracciones from "./pages/infracciones/infracciones.js";
import Horario from "./pages/horarios/horario.js";
import Gruas from "./pages/gruas/gruas.js";
import Empleados from "./pages/empleados/empleados.js";
import Documentos from "./pages/tipos-documentos/documentos.js";
import PersonalAdm from "./pages/personalAdm/personalAdm.js";
import Areas from "./pages/area/area.js";

const PrivateRoute = ({ children }) => {
  if (localStorage.getItem("auth") !== "true") {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login_user" element={<LoginUser />} />
        <Route path="/registro" element={<RegistroUser />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<PrivateRoute><Menu /></PrivateRoute>} />
        <Route path="/municipalidad" element={<PrivateRoute><Municipalidad /></PrivateRoute>} />
        <Route path="/horarios" element={<PrivateRoute><Horario /></PrivateRoute>} />
        <Route path="/depositos" element={<PrivateRoute><Deposito /></PrivateRoute>} />
        <Route path="/gruas" element={<PrivateRoute><Gruas /></PrivateRoute>} />
        <Route path="/empleados" element={<PrivateRoute><Empleados /></PrivateRoute>} />
        <Route path="/fiscalizacion" element={<PrivateRoute><Fiscalizacion /></PrivateRoute>} />
        <Route path="/generar" element={<GenerarMulta />} />
        <Route path="/infractores" element={<PrivateRoute><Infractores /></PrivateRoute>} />
        <Route path="/cajas" element={<PrivateRoute><Cajas /></PrivateRoute>} />
        <Route path="/sistema" element={<PrivateRoute><Sistema /></PrivateRoute>} />
        <Route path="/infracciones" element={<PrivateRoute><Infracciones /></PrivateRoute>} />
        <Route path="/areas" element={<PrivateRoute><Areas /></PrivateRoute>} />
        <Route path="/documentos" element={<PrivateRoute><Documentos /></PrivateRoute>} />
        <Route path="/personalAdm" element={<PrivateRoute><PersonalAdm /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
