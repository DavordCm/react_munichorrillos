import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login.js";
import Register from "./components/register.js";
import Menu from "./pages/menu/menu.js";
import Municipalidad from "./pages/municipalidad/municipalidad.js";
import Deposito from "./pages/deposito/deposito.js";
import Fiscalizacion from "./pages/fiscalizacion/fiscalizacion.js";
import Cajas from "./pages/cajas/cajas.js";
import Sistema from "./pages/sistema/sistema.js";
import Infracciones from ".//pages/infracciones/infracciones.js"
import Horario from "./pages/horarios/horario.js";
import Gruas from "./pages/gruas/gruas.js";
import Empleados from "./pages/empleados/empleados.js";
import Documentos from "./pages/tipos-documentos/documentos.js";
import PersonalAdm from "./pages/personalAdm/personalAdm.js";
import Areas from "./pages/area/area.js"

const PrivateRoute = ({ element }) => {
  return localStorage.getItem("auth") === "true" ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<PrivateRoute element={<Menu />} />} />
        <Route path="/municipalidad" element={<PrivateRoute element={<Municipalidad />} />} />
        <Route path="/horarios" element={<PrivateRoute element={<Horario />} />} />
        <Route path="/deposito" element={<PrivateRoute element={<Deposito />} />} />
        <Route path="/gruas" element={<PrivateRoute element={<Gruas />} />} />
        <Route path="/empleados" element={<PrivateRoute element={<Empleados />} />} />
        <Route path="/fiscalizacion" element={<PrivateRoute element={<Fiscalizacion />} />} />
        <Route path="/cajas" element={<PrivateRoute element={<Cajas />} />} />
        <Route path="/sistema" element={<PrivateRoute element={<Sistema />} />} />
        <Route path="/infracciones" element={<PrivateRoute element={<Infracciones />} />} />
        <Route path="/areas" element={<PrivateRoute element={<Areas/>} />} />
        <Route path="/documentos" element={<PrivateRoute element={<Documentos />} />} />
        <Route path="/personalAdm" element={<PrivateRoute element={<PersonalAdm />} />} />
      </Routes>
    </Router>
  );
}

export default App;
