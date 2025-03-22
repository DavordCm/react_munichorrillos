import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login.js";
import LoginUser from "./components/LoginUser.js"; // Cambio aquí
import Register from "./components/Register.js";
import Menu from "./pages/menu/Menu.js";
import Municipalidad from "./pages/municipalidad/Municipalidad.js";
import Deposito from "./pages/deposito/Deposito.js";
import Fiscalizacion from "./pages/fiscalizacion/Fiscalizacion.js";
import Cajas from "./pages/cajas/Cajas.js";
import Sistema from "./pages/sistema/Sistema.js";
import Infracciones from "./pages/infracciones/Infracciones.js";
import Horario from "./pages/horarios/Horario.js";
import Gruas from "./pages/gruas/Gruas.js";
import Empleados from "./pages/empleados/Empleados.js";
import Documentos from "./pages/tipos-documentos/Documentos.js";
import PersonalAdm from "./pages/personalAdm/PersonalAdm.js";
import Areas from "./pages/area/Area.js";

const PrivateRoute = ({ element }) => {
  return localStorage.getItem("auth") === "true" ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login_user" element={<LoginUser />} /> {/* Cambio aquí */}
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
        <Route path="/areas" element={<PrivateRoute element={<Areas />} />} />
        <Route path="/documentos" element={<PrivateRoute element={<Documentos />} />} />
        <Route path="/personalAdm" element={<PrivateRoute element={<PersonalAdm />} />} />
      </Routes>
    </Router>
  );
}

export default App;
